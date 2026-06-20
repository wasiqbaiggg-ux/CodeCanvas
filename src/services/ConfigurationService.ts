/**
 * Configuration Service - Manages extension settings
 */

import * as vscode from 'vscode';
import { CodeCanvasConfig } from '../types';
import { CONFIG_KEYS, DEFAULT_CONFIG } from '../utils/constants';
import { logger } from '../utils/logger';

export class ConfigurationService {
  private config: vscode.WorkspaceConfiguration;
  private scope: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global;

  constructor() {
    this.config = vscode.workspace.getConfiguration();
  }

  getConfig(): CodeCanvasConfig {
    try {
      return {
        enabled: this.config.get(CONFIG_KEYS.ENABLED, DEFAULT_CONFIG.enabled),
        imagePath: this.config.get(CONFIG_KEYS.IMAGE_PATH, DEFAULT_CONFIG.imagePath),
        opacity: this.config.get(CONFIG_KEYS.OPACITY, DEFAULT_CONFIG.opacity),
        blur: this.config.get(CONFIG_KEYS.BLUR, DEFAULT_CONFIG.blur),
        brightness: this.config.get(CONFIG_KEYS.BRIGHTNESS, DEFAULT_CONFIG.brightness),
        contrast: this.config.get(CONFIG_KEYS.CONTRAST, DEFAULT_CONFIG.contrast),
        saturation: this.config.get(CONFIG_KEYS.SATURATION, DEFAULT_CONFIG.saturation),
        position: this.config.get(CONFIG_KEYS.POSITION, DEFAULT_CONFIG.position),
        size: this.config.get(CONFIG_KEYS.SIZE, DEFAULT_CONFIG.size),
        repeat: this.config.get(CONFIG_KEYS.REPEAT, DEFAULT_CONFIG.repeat),
        workspaceSpecific: this.config.get(
          CONFIG_KEYS.WORKSPACE_SPECIFIC,
          DEFAULT_CONFIG.workspaceSpecific
        ),
        themeAware: this.config.get(CONFIG_KEYS.THEME_AWARE, DEFAULT_CONFIG.themeAware),
        darkThemeOpacity: this.config.get(
          CONFIG_KEYS.DARK_THEME_OPACITY,
          DEFAULT_CONFIG.darkThemeOpacity
        ),
        lightThemeOpacity: this.config.get(
          CONFIG_KEYS.LIGHT_THEME_OPACITY,
          DEFAULT_CONFIG.lightThemeOpacity
        ),
      };
    } catch (error) {
      logger.error('Error reading configuration', error);
      return DEFAULT_CONFIG;
    }
  }

  async updateConfig(key: string, value: unknown): Promise<void> {
    try {
      await this.config.update(key, value, this.scope);
      this.config = vscode.workspace.getConfiguration();
      logger.debug(`Configuration updated: ${key}`, value);
    } catch (error) {
      logger.error(`Failed to update configuration: ${key}`, error);
      throw error;
    }
  }

  async updateMultiple(updates: Record<string, unknown>): Promise<void> {
    try {
      for (const [key, value] of Object.entries(updates)) {
        await this.config.update(key, value, this.scope);
      }
      this.config = vscode.workspace.getConfiguration();
      logger.debug('Multiple configuration updates completed', updates);
    } catch (error) {
      logger.error('Failed to update multiple configurations', error);
      throw error;
    }
  }

  async resetToDefault(): Promise<void> {
    try {
      const updates = Object.entries(CONFIG_KEYS).reduce(
        (acc, [, key]) => {
          const configKey = key as keyof typeof DEFAULT_CONFIG;
          if (configKey in DEFAULT_CONFIG) {
            acc[key] = DEFAULT_CONFIG[configKey];
          }
          return acc;
        },
        {} as Record<string, unknown>
      );
      await this.updateMultiple(updates);
      logger.info('Configuration reset to defaults');
    } catch (error) {
      logger.error('Failed to reset configuration', error);
      throw error;
    }
  }

  setScope(scope: vscode.ConfigurationTarget): void {
    this.scope = scope;
  }
}
