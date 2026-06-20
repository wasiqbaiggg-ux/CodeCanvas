/**
 * Background Service - Manages background rendering
 */

import * as vscode from 'vscode';
import { ConfigurationService } from './ConfigurationService';
import { ImageService } from './ImageService';
import { CodeCanvasConfig } from '../types';
import { logger } from '../utils/logger';

export class BackgroundService {
  private configService: ConfigurationService;
  private imageService: ImageService;
  private statusBarItem: vscode.StatusBarItem | null = null;

  constructor(configService: ConfigurationService, imageService: ImageService) {
    this.configService = configService;
    this.imageService = imageService;
  }

  async initialize(): Promise<void> {
    try {
      const config = this.configService.getConfig();
      this.createStatusBar();
      await this.applyBackground(config);
      logger.info('Background service initialized');
    } catch (error) {
      logger.error('Failed to initialize background service', error);
    }
  }

  private createStatusBar(): void {
    if (!this.statusBarItem) {
      this.statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
      );
      this.statusBarItem.command = 'codecanvas.openSettings';
      this.statusBarItem.tooltip = 'Click to open CodeCanvas settings';
      this.updateStatusBar();
      this.statusBarItem.show();
    }
  }

  private updateStatusBar(): void {
    const config = this.configService.getConfig();
    if (this.statusBarItem) {
      if (config.enabled && config.imagePath) {
        const fileName = config.imagePath.split('/').pop() || 'Background';
        this.statusBarItem.text = `🎨 ${fileName}`;
      } else {
        this.statusBarItem.text = '🎨 CodeCanvas (off)';
      }
    }
  }

  async applyBackground(config: CodeCanvasConfig): Promise<void> {
    try {
      if (!config.enabled || !config.imagePath) {
        await this.removeBackground();
        return;
      }

      // Background rendering would be implemented here
      // This is a placeholder for the actual rendering logic
      logger.info('Background applied', config);
      this.updateStatusBar();
    } catch (error) {
      logger.error('Failed to apply background', error);
      vscode.window.showErrorMessage('Failed to apply background');
    }
  }

  async removeBackground(): Promise<void> {
    try {
      // Remove background rendering
      logger.info('Background removed');
      this.updateStatusBar();
    } catch (error) {
      logger.error('Failed to remove background', error);
    }
  }

  refresh(): void {
    const config = this.configService.getConfig();
    this.applyBackground(config);
  }

  dispose(): void {
    if (this.statusBarItem) {
      this.statusBarItem.dispose();
    }
  }
}
