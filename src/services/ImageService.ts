/**
 * Image Service - Handles image loading and validation
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { isValidImagePath, isValidImageURL } from '../utils/validators';
import { logger } from '../utils/logger';
import { ImageCache } from '../types';

export class ImageService {
  private imageCache: Map<string, ImageCache> = new Map();
  private readonly maxCacheSize = 10 * 1024 * 1024; // 10MB

  async selectImageFile(): Promise<string | undefined> {
    try {
      const result = await vscode.window.showOpenDialog({
        title: 'Select Background Image',
        filters: {
          Images: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'],
        },
      });

      return result?.[0].fsPath;
    } catch (error) {
      logger.error('Failed to select image file', error);
      vscode.window.showErrorMessage('Failed to select image file');
      return undefined;
    }
  }

  async loadImage(imagePath: string): Promise<string | undefined> {
    try {
      if (!imagePath) {
        return undefined;
      }

      // Check cache
      const cached = this.imageCache.get(imagePath);
      if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
        return cached.data;
      }

      // Load from file or URL
      let imageData: string;
      if (isValidImageURL(imagePath)) {
        imageData = await this.loadFromURL(imagePath);
      } else if (isValidImagePath(imagePath)) {
        imageData = await this.loadFromFile(imagePath);
      } else {
        throw new Error('Invalid image path or URL');
      }

      // Cache the image
      this.cacheImage(imagePath, imageData);

      return imageData;
    } catch (error) {
      logger.error('Failed to load image', error);
      vscode.window.showErrorMessage('Failed to load image');
      return undefined;
    }
  }

  private async loadFromFile(filePath: string): Promise<string> {
    try {
      const data = fs.readFileSync(filePath);
      const base64 = data.toString('base64');
      const ext = path.extname(filePath).toLowerCase();
      const mimeType = this.getMimeType(ext);
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      logger.error('Failed to load image from file', error);
      throw error;
    }
  }

  private async loadFromURL(url: string): Promise<string> {
    try {
      // This would require making HTTP requests
      // For now, return the URL as-is
      // In production, you'd fetch and convert to base64
      return url;
    } catch (error) {
      logger.error('Failed to load image from URL', error);
      throw error;
    }
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    };
    return mimeTypes[extension] || 'image/png';
  }

  private cacheImage(path: string, data: string): void {
    const size = data.length;
    if (size > this.maxCacheSize) {
      logger.warn('Image too large to cache', { path, size });
      return;
    }
    this.imageCache.set(path, {
      path,
      data,
      timestamp: Date.now(),
    });
  }

  clearCache(): void {
    this.imageCache.clear();
    logger.info('Image cache cleared');
  }
}
