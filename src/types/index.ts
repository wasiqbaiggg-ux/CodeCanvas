/**
 * Type definitions for CodeCanvas extension
 */

export interface CodeCanvasConfig {
  enabled: boolean;
  imagePath: string;
  opacity: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  position: Position;
  size: SizeMode;
  repeat: RepeatMode;
  workspaceSpecific: boolean;
  themeAware: boolean;
  darkThemeOpacity: number;
  lightThemeOpacity: number;
}

export type Position =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export type SizeMode = 'cover' | 'contain' | 'original' | 'stretch' | 'tile';

export type RepeatMode = 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';

export type ThemeKind = 'light' | 'dark' | 'highContrast';

export interface ImageCache {
  path: string;
  data: string; // base64 or URI
  timestamp: number;
}

export interface WallpaperProfile {
  name: string;
  config: CodeCanvasConfig;
  createdAt: number;
}

export interface WebviewMessage {
  command: string;
  value?: unknown;
}
