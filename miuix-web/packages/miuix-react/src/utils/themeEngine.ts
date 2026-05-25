import { Transforms, RGBA, rgbaToCssString } from './colorUtils';

export interface MiuixColors {
  primary: string;
  onPrimary: string;
  primaryVariant: string;
  onPrimaryVariant: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  disabledPrimary: string;
  disabledOnPrimary: string;
  disabledPrimaryButton: string;
  disabledOnPrimaryButton: string;
  disabledPrimarySlider: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryVariant: string;
  onSecondaryVariant: string;
  disabledSecondary: string;
  disabledOnSecondary: string;
  disabledSecondaryVariant: string;
  disabledOnSecondaryVariant: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  secondaryContainerVariant: string;
  onSecondaryContainerVariant: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  tertiaryContainerVariant: string;
  background: string;
  onBackground: string;
  onBackgroundVariant: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceSecondary: string;
  onSurfaceVariantSummary: string;
  onSurfaceVariantActions: string;
  disabledOnSurface: string;
  surfaceContainer: string;
  onSurfaceContainer: string;
  onSurfaceContainerVariant: string;
  surfaceContainerHigh: string;
  onSurfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurfaceContainerHighest: string;
  outline: string;
  dividerLine: string;
  windowDimming: string;
  sliderKeyPoint: string;
  sliderKeyPointForeground: string;
  sliderBackground: string;
}

export type ThemeColorSpec = 'Spec2021' | 'Spec2025';
export type ThemePaletteStyle = 'TonalSpot' | 'Neutral' | 'Vibrant' | 'Expressive' | 'Rainbow' | 'FruitSalad' | 'Monochrome' | 'Fidelity' | 'Content';

// Static base themes (used as baseline)
export const lightBaseColors: MiuixColors = {
  primary: '#3482FF',
  onPrimary: '#FFFFFF',
  primaryVariant: '#3482FF',
  onPrimaryVariant: '#AECDFF',
  error: '#E94634',
  onError: '#FFFFFF',
  errorContainer: '#FDF6F4',
  onErrorContainer: '#410002',
  disabledPrimary: '#C2D9FF',
  disabledOnPrimary: '#F3F8FF',
  disabledPrimaryButton: '#C2D9FF',
  disabledOnPrimaryButton: '#FFFFFF',
  disabledPrimarySlider: '#B8CFF5',
  primaryContainer: '#5D9BFF',
  onPrimaryContainer: '#FFFFFF',
  secondary: '#E6E6E6',
  onSecondary: '#FFFFFF',
  secondaryVariant: '#F0F0F0',
  onSecondaryVariant: '#303030',
  disabledSecondary: '#F0F0F0',
  disabledOnSecondary: '#FCFCFC',
  disabledSecondaryVariant: '#F2F2F2',
  disabledOnSecondaryVariant: '#B2B2B2',
  secondaryContainer: '#F0F0F0',
  onSecondaryContainer: '#A9A9A9',
  secondaryContainerVariant: '#F0F0F0',
  onSecondaryContainerVariant: '#A8A8A8',
  tertiaryContainer: '#EAF2FF',
  onTertiaryContainer: '#3482FF',
  tertiaryContainerVariant: '#EAF2FF',
  background: '#FFFFFF',
  onBackground: '#000000',
  onBackgroundVariant: '#8C93B0',
  surface: '#F7F7F7',
  onSurface: '#000000',
  surfaceVariant: '#FFFFFF',
  onSurfaceSecondary: 'rgba(0, 0, 0, 0.8)',
  onSurfaceVariantSummary: 'rgba(0, 0, 0, 0.6)',
  onSurfaceVariantActions: 'rgba(0, 0, 0, 0.4)',
  disabledOnSurface: '#B2B2B2',
  surfaceContainer: '#FFFFFF',
  onSurfaceContainer: '#000000',
  onSurfaceContainerVariant: '#959595',
  surfaceContainerHigh: '#E8E8E8',
  onSurfaceContainerHigh: '#A2A2A2',
  surfaceContainerHighest: '#E8E8E8',
  onSurfaceContainerHighest: '#000000',
  outline: '#D9D9D9',
  dividerLine: '#E0E0E0',
  windowDimming: 'rgba(0, 0, 0, 0.3)',
  sliderKeyPoint: 'rgba(163, 179, 205, 0.302)',
  sliderKeyPointForeground: '#6EB5FF',
  sliderBackground: 'rgba(0, 0, 0, 0.059)'
};

export const darkBaseColors: MiuixColors = {
  primary: '#277AF7',
  onPrimary: '#FFFFFF',
  primaryVariant: '#0073DD',
  onPrimaryVariant: '#99C7F1',
  error: '#F12522',
  onError: '#FFFFFF',
  errorContainer: '#2E0603',
  onErrorContainer: '#FFDAD6',
  disabledPrimary: '#253E64',
  disabledOnPrimary: '#677993',
  disabledPrimaryButton: '#253E64',
  disabledOnPrimaryButton: '#677893',
  disabledPrimarySlider: '#44587C',
  primaryContainer: '#338FE4',
  onPrimaryContainer: '#FFFFFF',
  secondary: '#505050',
  onSecondary: '#FFFFFF',
  secondaryVariant: '#434343',
  onSecondaryVariant: '#D9D9D9',
  disabledSecondary: '#3F3F3F',
  disabledOnSecondary: '#797979',
  disabledSecondaryVariant: '#404040',
  disabledOnSecondaryVariant: '#707170',
  secondaryContainer: '#434343',
  onSecondaryContainer: '#7C7C7C',
  secondaryContainerVariant: '#4F4F4F',
  onSecondaryContainerVariant: '#959595',
  tertiaryContainer: '#2B3B54',
  onTertiaryContainer: '#4788FF',
  tertiaryContainerVariant: '#505050',
  background: '#242424',
  onBackground: 'rgba(255, 255, 255, 0.902)',
  onBackgroundVariant: '#787E96',
  surface: '#000000',
  onSurface: '#F2F2F2',
  surfaceVariant: '#242424',
  onSurfaceSecondary: 'rgba(255, 255, 255, 0.8)',
  onSurfaceVariantSummary: 'rgba(255, 255, 255, 0.502)',
  onSurfaceVariantActions: 'rgba(255, 255, 255, 0.4)',
  disabledOnSurface: '#666666',
  surfaceContainer: '#242424',
  onSurfaceContainer: 'rgba(255, 255, 255, 0.902)',
  onSurfaceContainerVariant: '#737373',
  surfaceContainerHigh: '#242424',
  onSurfaceContainerHigh: '#666666',
  surfaceContainerHighest: '#2D2D2D',
  onSurfaceContainerHighest: '#E9E9E9',
  outline: '#404040',
  dividerLine: '#393939',
  windowDimming: 'rgba(0, 0, 0, 0.6)',
  sliderKeyPoint: 'rgba(122, 138, 166, 0.302)',
  sliderKeyPointForeground: '#5DAAFF',
  sliderBackground: 'rgba(255, 255, 255, 0.149)'
};

// Converts hex string to RGBA object
function hexToRgba(hex: string): RGBA {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
    a: 1.0
  };
}

// Alpha blend overlay calculation
function compositeOver(fg: RGBA, bg: RGBA): RGBA {
  const fa = fg.a;
  const ba = bg.a;
  const outA = fa + ba * (1 - fa);
  if (outA === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const r = (fg.r * fa + bg.r * ba * (1 - fa)) / outA;
  const g = (fg.g * fa + bg.g * ba * (1 - fa)) / outA;
  const b = (fg.b * fa + bg.b * ba * (1 - fa)) / outA;
  return { r, g, b, a: outA };
}

function ensureOpaqueOver(fg: RGBA, bg: RGBA): string {
  const res = fg.a >= 1.0 ? fg : compositeOver(fg, bg);
  return rgbaToCssString({ r: res.r, g: res.g, b: res.b, a: 1.0 });
}

export function generateColorsFromSeed(
  seedHex: string,
  paletteStyle: ThemePaletteStyle,
  colorSpec: ThemeColorSpec,
  dark: boolean
): MiuixColors {
  const seedRgba = hexToRgba(seedHex);
  const [seedL, seedC, seedH] = Transforms.colorToOklch(seedRgba);

  // Determine chroma and hue shifts based on theme palette styles
  let primaryChroma = 0.18;
  let secondaryHue = seedH;
  let tertiaryHue = (seedH + 60) % 360;
  let neutralChroma = 0.01;

  switch (paletteStyle) {
    case 'Neutral':
      primaryChroma = 0.02;
      neutralChroma = 0.005;
      break;
    case 'Vibrant':
      primaryChroma = 0.25;
      tertiaryHue = (seedH + 120) % 360;
      break;
    case 'Expressive':
      primaryChroma = 0.22;
      secondaryHue = (seedH + 120) % 360;
      tertiaryHue = (seedH + 240) % 360;
      break;
    case 'Monochrome':
      primaryChroma = 0.0;
      neutralChroma = 0.0;
      secondaryHue = 0;
      tertiaryHue = 0;
      break;
    case 'Content':
      primaryChroma = seedC;
      break;
    case 'Fidelity':
      primaryChroma = seedC;
      secondaryHue = seedH;
      tertiaryHue = seedH;
      break;
    case 'TonalSpot':
    default:
      primaryChroma = 0.16;
      break;
  }

  // Calculate L (Lightness) and C (Chroma) mapping for specific roles
  // Standard tones: Primary (Light 55, Dark 75), On Primary (Light 100, Dark 20)
  const lPrimary = dark ? 0.76 : 0.55;
  const cPrimary = primaryChroma;
  const primaryRgba = Transforms.oklchToColor(lPrimary, cPrimary, seedH);
  const primaryStr = rgbaToCssString(primaryRgba);

  const onPrimaryStr = dark ? '#000000' : '#FFFFFF';

  // Primary Variant (MD3 primaryFixed: Light 85, Dark 90)
  const lPrimaryVariant = dark ? 0.90 : 0.85;
  const primaryVariantRgba = Transforms.oklchToColor(lPrimaryVariant, cPrimary, seedH);
  const primaryVariantStr = rgbaToCssString(primaryVariantRgba);

  const lOnPrimaryVariant = dark ? 0.20 : 0.40;
  const onPrimaryVariantRgba = Transforms.oklchToColor(lOnPrimaryVariant, cPrimary, seedH);
  const onPrimaryVariantStr = rgbaToCssString(onPrimaryVariantRgba);

  // Background and Surfaces
  const baseBgRgba = dark ? hexToRgba('#242424') : hexToRgba('#FFFFFF');
  const baseSurfaceRgba = dark ? hexToRgba('#000000') : hexToRgba('#F7F7F7');
  const surfaceContainerRgba = dark ? hexToRgba('#242424') : hexToRgba('#FFFFFF');
  const surfaceContainerHighRgba = dark ? hexToRgba('#242424') : hexToRgba('#E8E8E8');
  const surfaceContainerHighestRgba = dark ? hexToRgba('#2D2D2D') : hexToRgba('#E8E8E8');

  // Monet secondary mapping:outlineVariant (Light L=85 C=Neutral, Dark L=30 C=Neutral)
  const lSecondary = dark ? 0.45 : 0.90;
  const secondaryRgba = Transforms.oklchToColor(lSecondary, neutralChroma, secondaryHue);
  const secondaryStr = rgbaToCssString(secondaryRgba);

  const lOnSecondary = dark ? 0.92 : 0.35;
  const onSecondaryRgba = Transforms.oklchToColor(lOnSecondary, neutralChroma, secondaryHue);
  const onSecondaryStr = rgbaToCssString(onSecondaryRgba);

  // Secondary Variant (surfaceContainerHigh)
  const secondaryVariantStr = rgbaToCssString(surfaceContainerHighRgba);
  const onSecondaryVariantStr = dark ? 'rgba(255, 255, 255, 0.902)' : '#000000';

  // Primary Container / Tertiary Container
  const lPrimaryContainer = dark ? 0.35 : 0.88;
  const primaryContainerRgba = Transforms.oklchToColor(lPrimaryContainer, cPrimary * 0.7, seedH);
  const primaryContainerStr = rgbaToCssString(primaryContainerRgba);
  const onPrimaryContainerStr = dark ? '#FFFFFF' : rgbaToCssString(Transforms.oklchToColor(0.25, cPrimary, seedH));

  // Tertiary Container mapping
  const lTertiary = dark ? 0.35 : 0.92;
  const tertiaryRgba = Transforms.oklchToColor(lTertiary, cPrimary * 0.6, tertiaryHue);
  const tertiaryContainerStr = rgbaToCssString(tertiaryRgba);
  const onTertiaryContainerStr = dark ? '#4788FF' : rgbaToCssString(Transforms.oklchToColor(0.40, cPrimary, tertiaryHue));

  // Error mappings
  const errorStr = dark ? '#F12522' : '#E94634';
  const onErrorStr = '#FFFFFF';
  const errorContainerStr = dark ? '#2E0603' : '#FDF6F4';
  const onErrorContainerStr = dark ? '#FFDAD6' : '#410002';

  // Disabled and overlays (opaque mappings mapped in MonetMapping.kt)
  const disabledPrimaryStr = ensureOpaqueOver({ ...primaryRgba, a: 0.38 }, baseBgRgba);
  const disabledOnPrimaryStr = ensureOpaqueOver({ r: dark ? 0 : 1, g: dark ? 0 : 1, b: dark ? 0 : 1, a: 0.38 }, hexToRgba(disabledPrimaryStr));
  const disabledPrimaryButtonStr = ensureOpaqueOver({ ...primaryRgba, a: 0.38 }, baseBgRgba);
  const disabledOnPrimaryButtonStr = ensureOpaqueOver({ r: 1, g: 1, b: 1, a: dark ? 0.6 : 0.38 }, hexToRgba(disabledPrimaryButtonStr));
  const disabledPrimarySliderStr = ensureOpaqueOver({ ...primaryRgba, a: 0.38 }, baseBgRgba);

  const disabledSecondaryStr = ensureOpaqueOver({ ...secondaryRgba, a: 0.5 }, baseBgRgba);
  const disabledOnSecondaryStr = ensureOpaqueOver({ r: dark ? 1 : 0, g: dark ? 1 : 0, b: dark ? 1 : 0, a: 0.38 }, hexToRgba(disabledSecondaryStr));
  const disabledSecondaryVariantStr = ensureOpaqueOver({ ...surfaceContainerHighRgba, a: 0.6 }, baseBgRgba);
  const disabledOnSecondaryVariantStr = ensureOpaqueOver({ r: dark ? 1 : 0, g: dark ? 1 : 0, b: dark ? 1 : 0, a: 0.38 }, hexToRgba(disabledSecondaryVariantStr));

  const onSurfaceSecondaryStr = ensureOpaqueOver({ r: dark ? 1 : 0, g: dark ? 1 : 0, b: dark ? 1 : 0, a: 0.8 }, baseSurfaceRgba);
  const onSurfaceContainerHighStr = ensureOpaqueOver({ r: dark ? 1 : 0, g: dark ? 1 : 0, b: dark ? 1 : 0, a: 0.8 }, surfaceContainerHighRgba);

  return {
    primary: primaryStr,
    onPrimary: onPrimaryStr,
    primaryVariant: primaryVariantStr,
    onPrimaryVariant: onPrimaryVariantStr,
    error: errorStr,
    onError: onErrorStr,
    errorContainer: errorContainerStr,
    onErrorContainer: onErrorContainerStr,
    disabledPrimary: disabledPrimaryStr,
    disabledOnPrimary: disabledOnPrimaryStr,
    disabledPrimaryButton: disabledPrimaryButtonStr,
    disabledOnPrimaryButton: disabledOnPrimaryButtonStr,
    disabledPrimarySlider: disabledPrimarySliderStr,
    primaryContainer: primaryContainerStr,
    onPrimaryContainer: onPrimaryContainerStr,
    secondary: secondaryStr,
    onSecondary: onSecondaryStr,
    secondaryVariant: secondaryVariantStr,
    onSecondaryVariant: onSecondaryVariantStr,
    disabledSecondary: disabledSecondaryStr,
    disabledOnSecondary: disabledOnSecondaryStr,
    disabledSecondaryVariant: disabledSecondaryVariantStr,
    disabledOnSecondaryVariant: disabledOnSecondaryVariantStr,
    secondaryContainer: secondaryStr, // secondaryContainer matches outlineVariant
    onSecondaryContainer: onSecondaryStr,
    secondaryContainerVariant: rgbaToCssString(surfaceContainerHighestRgba),
    onSecondaryContainerVariant: dark ? '#737373' : '#959595',
    tertiaryContainer: tertiaryContainerStr,
    onTertiaryContainer: onTertiaryContainerStr,
    tertiaryContainerVariant: onTertiaryContainerStr,
    background: rgbaToCssString(baseBgRgba),
    onBackground: dark ? 'rgba(255, 255, 255, 0.902)' : '#000000',
    onBackgroundVariant: primaryStr,
    surface: rgbaToCssString(baseSurfaceRgba),
    onSurface: dark ? '#F2F2F2' : '#000000',
    surfaceVariant: dark ? '#242424' : '#FFFFFF',
    onSurfaceSecondary: onSurfaceSecondaryStr,
    onSurfaceVariantSummary: dark ? 'rgba(255, 255, 255, 0.502)' : 'rgba(0, 0, 0, 0.6)',
    onSurfaceVariantActions: dark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    disabledOnSurface: dark ? '#666666' : '#B2B2B2',
    surfaceContainer: rgbaToCssString(surfaceContainerRgba),
    onSurfaceContainer: dark ? 'rgba(255, 255, 255, 0.902)' : '#000000',
    onSurfaceContainerVariant: dark ? '#737373' : '#959595',
    surfaceContainerHigh: rgbaToCssString(surfaceContainerHighRgba),
    onSurfaceContainerHigh: onSurfaceContainerHighStr,
    surfaceContainerHighest: rgbaToCssString(surfaceContainerHighestRgba),
    onSurfaceContainerHighest: dark ? '#E9E9E9' : '#000000',
    outline: dark ? '#404040' : '#D9D9D9',
    dividerLine: secondaryStr,
    windowDimming: dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)',
    sliderKeyPoint: primaryStr,
    sliderKeyPointForeground: rgbaToCssString(surfaceContainerHighRgba),
    sliderBackground: ensureOpaqueOver({ ...primaryRgba, a: 0.2 }, baseSurfaceRgba)
  };
}
