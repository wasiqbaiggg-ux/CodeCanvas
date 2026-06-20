/**
 * Constants for CodeCanvas extension
 */

export const EXTENSION_NAME = 'CodeCanvas';
export const EXTENSION_ID = 'codecanvas';

export const COMMAND_IDS = {
  SET_BACKGROUND: 'codecanvas.setBackground',
  REMOVE_BACKGROUND: 'codecanvas.removeBackground',
  TOGGLE_BACKGROUND: 'codecanvas.toggleBackground',
  OPEN_SETTINGS: 'codecanvas.openSettings',
  INCREASE_OPACITY: 'codecanvas.increaseOpacity',
  DECREASE_OPACITY: 'codecanvas.decreaseOpacity',
  INCREASE_BLUR: 'codecanvas.increaseBlur',
  DECREASE_BLUR: 'codecanvas.decreaseBlur',
  RESET_SETTINGS: 'codecanvas.resetSettings',
  NEXT_WALLPAPER: 'codecanvas.nextWallpaper',
  PREVIOUS_WALLPAPER: 'codecanvas.previousWallpaper',
  OPEN_WALLPAPER_FOLDER: 'codecanvas.openWallpaperFolder',
} as const;

export const CONFIG_KEYS = {
  ENABLED: 'codecanvas.enabled',
  IMAGE_PATH: 'codecanvas.imagePath',
  OPACITY: 'codecanvas.opacity',
  BLUR: 'codecanvas.blur',
  BRIGHTNESS: 'codecanvas.brightness',
  CONTRAST: 'codecanvas.contrast',
  SATURATION: 'codecanvas.saturation',
  POSITION: 'codecanvas.position',
  SIZE: 'codecanvas.size',
  REPEAT: 'codecanvas.repeat',
  WORKSPACE_SPECIFIC: 'codecanvas.workspaceSpecific',
  THEME_AWARE: 'codecanvas.themeAware',
  DARK_THEME_OPACITY: 'codecanvas.darkThemeOpacity',
  LIGHT_THEME_OPACITY: 'codecanvas.lightThemeOpacity',
} as const;

export const DEFAULT_CONFIG = {
  enabled: true,
  imagePath: '',
  opacity: 0.12,
  blur: 8,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  position: 'center' as const,
  size: 'cover' as const,
  repeat: 'no-repeat' as const,
  workspaceSpecific: false,
  themeAware: true,
  darkThemeOpacity: 0.12,
  lightThemeOpacity: 0.08,
} as const;

export const LIMITS = {
  MIN_OPACITY: 0,
  MAX_OPACITY: 1,
  MIN_BLUR: 0,
  MAX_BLUR: 30,
  MIN_BRIGHTNESS: 0,
  MAX_BRIGHTNESS: 200,
  MIN_CONTRAST: 0,
  MAX_CONTRAST: 200,
  MIN_SATURATION: 0,
  MAX_SATURATION: 200,
  OPACITY_STEP: 0.05,
  BLUR_STEP: 2,
  FILTER_STEP: 5,
} as const;

export const SUPPORTED_FORMATS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.svg',
] as const;

export const CACHE_SIZE = 10 * 1024 * 1024; // 10MB
export const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const;
