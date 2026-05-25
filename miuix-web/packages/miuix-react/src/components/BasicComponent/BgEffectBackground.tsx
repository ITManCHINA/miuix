import React, { useEffect, useRef } from 'react';

export type DeviceType = 'PHONE' | 'PAD';

export interface BgEffectBackgroundProps {
  dynamicBackground?: boolean;
  isOs3Effect?: boolean;
  isDarkTheme?: boolean;
  deviceType?: DeviceType;
  alpha?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ── WebGL Shaders ───────────────────────────────────────────────────────────
const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uAnimTime;
  uniform vec4 uBound;
  uniform float uTranslateY;
  uniform vec3 uPoints[4];
  uniform vec2 uPointsAnim[4];
  uniform vec4 uColors[4];
  uniform float uAlphaMulti;
  uniform float uNoiseScale;
  uniform float uPointRadiusMulti;
  uniform float uSaturateOffset;
  uniform float uLightOffset;

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.13);
    p3 += dot(p3, p3.yzx + 3.333);
    return fract((p3.x + p3.y) * p3.z);
  }

  float perlin(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float gradientNoise(in vec2 uv) {
    return fract(52.9829189 * fract(dot(uv, vec2(0.06711056, 0.00583715))));
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 vUv = fragCoord / uResolution;
    vec2 uv = vUv;
    uv -= vec2(0.0, uTranslateY);
    uv.xy -= uBound.xy;
    uv.xy /= uBound.zw;

    vec4 color = vec4(0.0);
    float noiseValue = perlin(vUv * uNoiseScale + vec2(-uAnimTime, -uAnimTime));

    for (int i = 0; i < 4; i++) {
      vec4 pointColor = uColors[i];
      pointColor.rgb *= pointColor.a;
      vec2 point = uPointsAnim[i];
      float rad = uPoints[i].z * uPointRadiusMulti;

      float d = distance(uv, point);
      float pct = smoothstep(rad, 0.0, d);
      color.rgb = mix(color.rgb, pointColor.rgb, pct);
      color.a = mix(color.a, pointColor.a, pct);
    }

    float oppositeNoise = smoothstep(0.0, 1.0, noiseValue);
    color.rgb /= (color.a + 1.0e-5);
    vec3 hsv = rgb2hsv(color.rgb);
    hsv.y = mix(hsv.y, 0.0, oppositeNoise * uSaturateOffset);
    color.rgb = hsv2rgb(hsv);
    color.rgb += oppositeNoise * uLightOffset;

    color.a = clamp(color.a, 0.0, 1.0);
    color.a *= uAlphaMulti;

    color += (10.0 / 255.0) * gradientNoise(fragCoord.xy) - (5.0 / 255.0);
    gl_FragColor = vec4(color.rgb * color.a, color.a);
  }
`;

// ── Color and Points Config Constants (KMP 1:1) ──────────────────────────────
interface ShaderConfig {
  points: number[];
  colors1: number[];
  colors2: number[];
  colors3: number[];
  colorInterpPeriod: number;
  lightOffset: number;
  saturateOffset: number;
  pointOffset: number;
}

const OS2_PHONE_LIGHT_COLORS = [
  0.57, 0.76, 0.98, 1.0, 0.98, 0.85, 0.68, 1.0, 0.98, 0.75, 0.93, 1.0, 0.73, 0.70, 0.98, 1.0,
];
const OS2_PHONE_DARK_COLORS = [
  0.0, 0.31, 0.58, 1.0, 0.53, 0.29, 0.15, 1.0, 0.46, 0.06, 0.27, 1.0, 0.16, 0.12, 0.45, 1.0,
];
const OS2_PAD_LIGHT_COLORS = [
  0.57, 0.76, 0.98, 1.0, 0.98, 0.85, 0.68, 1.0, 0.98, 0.75, 0.93, 0.95, 0.73, 0.70, 0.98, 0.90,
];

const PRESETS: Record<string, ShaderConfig> = {
  OS2_PHONE_LIGHT: {
    points: [0.67, 0.42, 1.0, 0.69, 0.75, 1.0, 0.14, 0.71, 0.95, 0.14, 0.27, 0.8],
    colors1: OS2_PHONE_LIGHT_COLORS,
    colors2: OS2_PHONE_LIGHT_COLORS,
    colors3: OS2_PHONE_LIGHT_COLORS,
    colorInterpPeriod: 100,
    lightOffset: 0.1,
    saturateOffset: 0.2,
    pointOffset: 0.1,
  },
  OS2_PHONE_DARK: {
    points: [0.63, 0.50, 0.88, 0.69, 0.75, 0.80, 0.17, 0.66, 0.81, 0.14, 0.24, 0.72],
    colors1: OS2_PHONE_DARK_COLORS,
    colors2: OS2_PHONE_DARK_COLORS,
    colors3: OS2_PHONE_DARK_COLORS,
    colorInterpPeriod: 100,
    lightOffset: -0.1,
    saturateOffset: 0.2,
    pointOffset: 0.1,
  },
  OS2_PAD_LIGHT: {
    points: [0.67, 0.37, 0.88, 0.54, 0.66, 1.0, 0.37, 0.71, 0.68, 0.28, 0.26, 0.62],
    colors1: OS2_PAD_LIGHT_COLORS,
    colors2: OS2_PAD_LIGHT_COLORS,
    colors3: OS2_PAD_LIGHT_COLORS,
    colorInterpPeriod: 100,
    lightOffset: 0.1,
    saturateOffset: 0.0,
    pointOffset: 0.1,
  },
  OS2_PAD_DARK: {
    points: [0.55, 0.42, 1.0, 0.56, 0.75, 1.0, 0.40, 0.59, 0.71, 0.43, 0.09, 0.75],
    colors1: OS2_PHONE_DARK_COLORS,
    colors2: OS2_PHONE_DARK_COLORS,
    colors3: OS2_PHONE_DARK_COLORS,
    colorInterpPeriod: 100,
    lightOffset: -0.1,
    saturateOffset: 0.2,
    pointOffset: 0.1,
  },
  OS3_PHONE_LIGHT: {
    points: [0.8, 0.2, 1.0, 0.8, 0.9, 1.0, 0.2, 0.9, 1.0, 0.2, 0.2, 1.0],
    colors1: [1.0, 0.9, 0.94, 1.0, 1.0, 0.84, 0.89, 1.0, 0.97, 0.73, 0.82, 1.0, 0.64, 0.65, 0.98, 1.0],
    colors2: [0.58, 0.74, 1.0, 1.0, 1.0, 0.9, 0.93, 1.0, 0.74, 0.76, 1.0, 1.0, 0.97, 0.77, 0.84, 1.0],
    colors3: [0.98, 0.86, 0.9, 1.0, 0.6, 0.73, 0.98, 1.0, 0.92, 0.93, 1.0, 1.0, 0.56, 0.69, 1.0, 1.0],
    colorInterpPeriod: 5.0,
    lightOffset: 0.1,
    saturateOffset: 0.2,
    pointOffset: 0.2,
  },
  OS3_PHONE_DARK: {
    points: [0.8, 0.2, 1.0, 0.8, 0.9, 1.0, 0.2, 0.9, 1.0, 0.2, 0.2, 1.0],
    colors1: [0.2, 0.06, 0.88, 0.4, 0.3, 0.14, 0.55, 0.5, 0.0, 0.64, 0.96, 0.5, 0.11, 0.16, 0.83, 0.4],
    colors2: [0.07, 0.15, 0.79, 0.5, 0.11, 0.16, 0.83, 0.5, 0.06, 0.25, 0.84, 0.5, 0.0, 0.2, 0.78, 0.5],
    colors3: [0.58, 0.3, 0.74, 0.4, 0.27, 0.18, 0.6, 0.5, 0.66, 0.26, 0.62, 0.5, 0.12, 0.16, 0.7, 0.6],
    colorInterpPeriod: 8.0,
    lightOffset: 0.0,
    saturateOffset: 0.17,
    pointOffset: 0.4,
  },
  OS3_PAD_LIGHT: {
    points: [0.8, 0.2, 1.0, 0.8, 0.9, 1.0, 0.2, 0.9, 1.0, 0.2, 0.2, 1.0],
    colors1: [0.99, 0.77, 0.86, 1.0, 0.74, 0.76, 1.0, 1.0, 0.72, 0.74, 1.0, 1.0, 0.98, 0.76, 0.8, 1.0],
    colors2: [0.66, 0.75, 1.0, 1.0, 1.0, 0.86, 0.91, 1.0, 0.74, 0.76, 1.0, 1.0, 0.97, 0.77, 0.84, 1.0],
    colors3: [0.97, 0.79, 0.85, 1.0, 0.65, 0.68, 0.98, 1.0, 0.66, 0.77, 1.0, 1.0, 0.72, 0.73, 0.98, 1.0],
    colorInterpPeriod: 7.0,
    lightOffset: 0.1,
    saturateOffset: 0.2,
    pointOffset: 0.2,
  },
  OS3_PAD_DARK: {
    points: [0.8, 0.2, 1.0, 0.8, 0.9, 1.0, 0.2, 0.9, 1.0, 0.2, 0.2, 1.0],
    colors1: [0.66, 0.26, 0.62, 0.4, 0.06, 0.25, 0.84, 0.5, 0.0, 0.64, 0.96, 0.5, 0.14, 0.18, 0.55, 0.5],
    colors2: [0.07, 0.15, 0.79, 0.5, 0.11, 0.16, 0.83, 0.5, 0.06, 0.25, 0.84, 0.5, 0.66, 0.26, 0.62, 0.5],
    colors3: [0.58, 0.3, 0.74, 0.5, 0.11, 0.16, 0.83, 0.5, 0.66, 0.26, 0.62, 0.5, 0.27, 0.18, 0.6, 0.6],
    colorInterpPeriod: 7.0,
    lightOffset: 0.0,
    saturateOffset: 0.0,
    pointOffset: 0.2,
  },
};

export const BgEffectBackground: React.FC<BgEffectBackgroundProps> = ({
  dynamicBackground = true,
  isOs3Effect = true,
  isDarkTheme = false,
  deviceType = 'PHONE',
  alpha = 1.0,
  className = '',
  style,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL is not supported by this browser.');
      return;
    }

    // Helper: compile shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Geometry buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uAnimTime = gl.getUniformLocation(program, 'uAnimTime');
    const uBound = gl.getUniformLocation(program, 'uBound');
    const uTranslateY = gl.getUniformLocation(program, 'uTranslateY');
    const uPoints = gl.getUniformLocation(program, 'uPoints');
    const uPointsAnim = gl.getUniformLocation(program, 'uPointsAnim');
    const uColors = gl.getUniformLocation(program, 'uColors');
    const uAlphaMulti = gl.getUniformLocation(program, 'uAlphaMulti');
    const uNoiseScale = gl.getUniformLocation(program, 'uNoiseScale');
    const uPointRadiusMulti = gl.getUniformLocation(program, 'uPointRadiusMulti');
    const uSaturateOffset = gl.getUniformLocation(program, 'uSaturateOffset');
    const uLightOffset = gl.getUniformLocation(program, 'uLightOffset');

    let animationFrameId: number;
    let startTime = Date.now();
    let colorStageValue = 0.0;

    const getColorsPreset = () => {
      const key = `${isOs3Effect ? 'OS3' : 'OS2'}_${deviceType}_${isDarkTheme ? 'DARK' : 'LIGHT'}`;
      return PRESETS[key] || PRESETS.OS3_PHONE_LIGHT;
    };

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const w = rect?.width || window.innerWidth;
      const h = rect?.height || window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const totalWidth = rect?.width || window.innerWidth;
      const totalHeight = rect?.height || window.innerHeight;
      const logoHeight = 240.0; // Fixed visual logo boundary matching KMP

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uAlphaMulti, alpha);
      gl.uniform1f(uTranslateY, 0.0);
      gl.uniform1f(uNoiseScale, 1.5);
      gl.uniform1f(uPointRadiusMulti, 1.0);

      // Compute visual boundary bounds
      const heightRatio = logoHeight / totalHeight;
      const bound = new Float32Array(4);
      if (totalWidth <= totalHeight) {
        bound[0] = 0.0;
        bound[1] = 1.0 - heightRatio;
        bound[2] = 1.0;
        bound[3] = heightRatio;
      } else {
        const aspectRatio = totalWidth / totalHeight;
        const contentCenterY = 1.0 - heightRatio / 2.0;
        bound[0] = 0.0;
        bound[1] = contentCenterY - aspectRatio / 2.0;
        bound[2] = 1.0;
        bound[3] = aspectRatio;
      }
      gl.uniform4fv(uBound, bound);

      const preset = getColorsPreset();
      gl.uniform1f(uLightOffset, preset.lightOffset);
      gl.uniform1f(uSaturateOffset, preset.saturateOffset);

      // Animation calculations
      const now = Date.now();
      const elapsed = (now - startTime) / 1000.0;
      const animTimeValue = dynamicBackground ? elapsed * 0.45 : 0.0;
      gl.uniform1f(uAnimTime, animTimeValue);

      // Dynamic color interpolation
      if (dynamicBackground) {
        colorStageValue += 0.0035; // Fine color cycle delta speed
      }
      const base = Math.floor(colorStageValue);
      const fraction = colorStageValue - base;
      const cycleColors = (index: number) => {
        const mod = index % 4;
        if (mod === 1) return preset.colors1;
        if (mod === 3) return preset.colors3;
        return preset.colors2;
      };
      const startColors = cycleColors(base);
      const endColors = cycleColors(base + 1);

      const interpolatedColors = new Float32Array(16);
      for (let i = 0; i < 16; i++) {
        interpolatedColors[i] = startColors[i] + (endColors[i] - startColors[i]) * fraction;
      }
      gl.uniform4fv(uColors, interpolatedColors);

      // Points static & dynamic math animations
      const pointsData = new Float32Array(12);
      const pointsAnimData = new Float32Array(8);
      for (let i = 0; i < 4; i++) {
        const srcX = preset.points[i * 3];
        const srcY = preset.points[i * 3 + 1];
        const radius = preset.points[i * 3 + 2];
        pointsData[i * 3] = srcX;
        pointsData[i * 3 + 1] = srcY;
        pointsData[i * 3 + 2] = radius;

        const pointsAnimTime = dynamicBackground ? elapsed * 0.25 : 0.0;
        const animX = srcX + Math.sin(pointsAnimTime + srcY) * preset.pointOffset;
        const animY = srcY + Math.cos(pointsAnimTime + animX) * preset.pointOffset;
        pointsAnimData[i * 2] = animX;
        pointsAnimData[i * 2 + 1] = animY;
      }
      gl.uniform3fv(uPoints, pointsData);
      gl.uniform2fv(uPointsAnim, pointsAnimData);

      // Draw
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (dynamicBackground) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [dynamicBackground, isOs3Effect, isDarkTheme, deviceType, alpha]);

  return (
    <div
      ref={containerRef}
      className={`miuix-bg-effect-background ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};
