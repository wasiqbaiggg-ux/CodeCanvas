/**
 * Validators for CodeCanvas
 */

import { SUPPORTED_FORMATS } from './constants';

export function isValidImagePath(path: string): boolean {
  if (!path || typeof path !== 'string') {
    return false;
  }

  const extension = path.toLowerCase().substring(path.lastIndexOf('.'));
  return SUPPORTED_FORMATS.includes(extension as any);
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidImageURL(url: string): boolean {
  if (!isValidURL(url)) {
    return false;
  }

  const extension = url.toLowerCase().substring(url.lastIndexOf('.'));
  return SUPPORTED_FORMATS.includes(extension as any);
}

export function isValidOpacity(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 1;
}

export function isValidBlur(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 30;
}

export function isValidBrightness(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 200;
}

export function isValidContrast(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 200;
}

export function isValidSaturation(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 200;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function roundTo(value: number, decimals: number): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}
