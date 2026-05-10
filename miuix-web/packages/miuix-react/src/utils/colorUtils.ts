export interface RGBA {
  r: number; // 0..1
  g: number; // 0..1
  b: number; // 0..1
  a: number; // 0..1
}

export const rgbaToCssString = (color: RGBA): string => {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`;
};

const toDegrees = (rad: number): number => (rad * 180.0) / Math.PI;
const toRadians = (deg: number): number => (deg * Math.PI) / 180.0;
const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);

export const Transforms = {
  rgbToOkLab: (r: number, g: number, b: number): [number, number, number] => {
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

    return [
      0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
    ];
  },

  okLabToRgb: (l: number, a: number, b: number): [number, number, number] => {
    const l1 = l + 0.3963377774 * a + 0.2158037573 * b;
    const m1 = l - 0.1055613458 * a - 0.0638541728 * b;
    const s1 = l - 0.0894841775 * a - 1.2914855480 * b;

    const l_cubed = l1 * l1 * l1;
    const m_cubed = m1 * m1 * m1;
    const s_cubed = s1 * s1 * s1;

    return [
      clamp(+4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed, 0, 1),
      clamp(-1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed, 0, 1),
      clamp(-0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.7076147010 * s_cubed, 0, 1),
    ];
  },

  okLabToOklch: (l: number, a: number, b: number): [number, number, number] => {
    const c = Math.sqrt(a * a + b * b);
    let h = toDegrees(Math.atan2(b, a));
    if (h < 0) h += 360;
    return [l, c, h];
  },

  oklchToOkLab: (l: number, c: number, hDeg: number): [number, number, number] => {
    const hRad = toRadians(hDeg);
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    return [l, a, b];
  },

  okLabToColor: (l: number, a: number, b: number, alpha: number = 1): RGBA => {
    const rgb = Transforms.okLabToRgb(l, a, b);
    return { r: rgb[0], g: rgb[1], b: rgb[2], a: alpha };
  },

  oklchToColor: (l: number, c: number, h: number, alpha: number = 1): RGBA => {
    const norm = Transforms.normalizeOklch(l, c, h);
    const lab = Transforms.oklchToOkLab(norm[0], norm[1], norm[2]);
    return Transforms.okLabToColor(lab[0], lab[1], lab[2], alpha);
  },

  colorToOklch: (color: RGBA): [number, number, number] => {
    const lab = Transforms.rgbToOkLab(color.r, color.g, color.b);
    const lch = Transforms.okLabToOklch(lab[0], lab[1], lab[2]);
    const c = clamp(lch[1], 0, 0.4);
    let h = lch[2] % 360;
    if (h < 0) h += 360;
    return [clamp(lch[0], 0, 1), c, h];
  },

  rgbToHsv: (rInt: number, gInt: number, bInt: number): [number, number, number] => {
    const r = rInt / 255;
    const g = gInt / 255;
    const b = bInt / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
      if (max === r) hue = (60 * ((g - b) / delta) + 360) % 360;
      else if (max === g) hue = (60 * ((b - r) / delta) + 120) % 360;
      else hue = (60 * ((r - g) / delta) + 240) % 360;
    }

    const s = max > 0 ? delta / max : 0;
    return [clamp(hue, 0, 360), clamp(s, 0, 1), clamp(max, 0, 1)];
  },

  colorToHsv: (color: RGBA): [number, number, number] => {
    return Transforms.rgbToHsv(color.r * 255, color.g * 255, color.b * 255);
  },

  hsvToColor: (h: number, s: number, v: number, alpha: number = 1): RGBA => {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

    return { r: r + m, g: g + m, b: b + m, a: alpha };
  },

  normalizeOklch: (l: number, c: number, h: number): [number, number, number] => {
    const ln = clamp(l, 0, 1);
    const cn = clamp(c, 0, 0.4);
    let hn = h % 360;
    if (hn < 0) hn += 360;
    return [ln, cn, hn];
  },

  generateHsvHueColors: (steps: number = 36): RGBA[] => {
    const colors: RGBA[] = [];
    for (let i = 0; i < steps; i++) {
      const hue = (i / steps) * 360;
      colors.push(Transforms.hsvToColor(hue, 1, 1));
    }
    return colors;
  },

  generateOkLchHueColors: (l: number, c: number, steps: number = 36): RGBA[] => {
    const lClamped = clamp(l, 0, 1);
    const cClamped = clamp(c, 0, 1);
    const cInternal = cClamped * 0.4;
    const colors: RGBA[] = [];
    for (let i = 0; i < steps; i++) {
      const hDeg = (i / steps) * 360;
      colors.push(Transforms.oklchToColor(lClamped, cInternal, hDeg));
    }
    return colors;
  }
};
