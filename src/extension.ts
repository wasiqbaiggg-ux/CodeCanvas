/**
 * CodeCanvas - VS Code Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { logger } from './utils/logger';
import { ConfigurationService } from './services/ConfigurationService';
import { BackgroundService } from './services/BackgroundService';
import { ImageService } from './services/ImageService';
import { registerCommands } from './commands/backgroundCommands';

let configService: ConfigurationService;
let backgroundService: BackgroundService;
let imageService: ImageService;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  try {
    logger.initialize(context);
    logger.info('Activating CodeCanvas extension...');

    // Initialize services
    configService = new ConfigurationService();
    imageService = new ImageService();
    backgroundService = new BackgroundService(configService, imageService);

    // Register commands
    registerCommands(context, configService, backgroundService, imageService);

    // Load and apply background on activation
    await backgroundService.initialize();

    // Listen to configuration changes
    const configChangeSubscription = vscode.workspace.onDidChangeConfiguration(
      (event) => {
        if (event.affectsConfiguration('codecanvas')) {
          logger.info('Configuration changed');
          backgroundService.refresh();
        }
      }
    );
    context.subscriptions.push(configChangeSubscription);

    // Listen to theme changes
    const themeChangeSubscription = vscode.window.onDidChangeActiveColorTheme(
      () => {
        logger.info('Theme changed');
        backgroundService.refresh();
      }
    );
    context.subscriptions.push(themeChangeSubscription);

    logger.info('CodeCanvas extension activated successfully');
  } catch (error) {
    logger.error('Failed to activate CodeCanvas extension', error);
    vscode.window.showErrorMessage(
      'Failed to activate CodeCanvas. Check the output channel for details.'
    );
  }
}

export function deactivate(): void {
  logger.info('Deactivating CodeCanvas extension');
  if (backgroundService) {
    backgroundService.dispose();
  }
}
