/**
 * Background Commands - Command handlers for CodeCanvas
 */

import * as vscode from 'vscode';
import { ConfigurationService } from '../services/ConfigurationService';
import { BackgroundService } from '../services/BackgroundService';
import { ImageService } from '../services/ImageService';
import { COMMAND_IDS, LIMITS } from '../utils/constants';
import { logger } from '../utils/logger';
import { clamp } from '../utils/validators';

export function registerCommands(
  context: vscode.ExtensionContext,
  configService: ConfigurationService,
  backgroundService: BackgroundService,
  imageService: ImageService
): void {
  // Set Background
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.SET_BACKGROUND, async () => {
      try {
        const imagePath = await imageService.selectImageFile();
        if (imagePath) {
          await configService.updateConfig('codecanvas.imagePath', imagePath);
          vscode.window.showInformationMessage('Background image set successfully!');
        }
      } catch (error) {
        logger.error('Error setting background', error);
      }
    })
  );

  // Remove Background
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.REMOVE_BACKGROUND, async () => {
      try {
        await configService.updateConfig('codecanvas.imagePath', '');
        await backgroundService.removeBackground();
        vscode.window.showInformationMessage('Background removed successfully!');
      } catch (error) {
        logger.error('Error removing background', error);
      }
    })
  );

  // Toggle Background
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.TOGGLE_BACKGROUND, async () => {
      try {
        const config = configService.getConfig();
        await configService.updateConfig('codecanvas.enabled', !config.enabled);
        const status = !config.enabled ? 'enabled' : 'disabled';
        vscode.window.showInformationMessage(`Background ${status}!`);
      } catch (error) {
        logger.error('Error toggling background', error);
      }
    })
  );

  // Open Settings
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.OPEN_SETTINGS, () => {
      vscode.commands.executeCommand('workbench.action.openSettings', 'codecanvas');
    })
  );

  // Increase Opacity
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.INCREASE_OPACITY, async () => {
      try {
        const config = configService.getConfig();
        const newOpacity = clamp(
          config.opacity + LIMITS.OPACITY_STEP,
          LIMITS.MIN_OPACITY,
          LIMITS.MAX_OPACITY
        );
        await configService.updateConfig('codecanvas.opacity', newOpacity);
      } catch (error) {
        logger.error('Error increasing opacity', error);
      }
    })
  );

  // Decrease Opacity
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.DECREASE_OPACITY, async () => {
      try {
        const config = configService.getConfig();
        const newOpacity = clamp(
          config.opacity - LIMITS.OPACITY_STEP,
          LIMITS.MIN_OPACITY,
          LIMITS.MAX_OPACITY
        );
        await configService.updateConfig('codecanvas.opacity', newOpacity);
      } catch (error) {
        logger.error('Error decreasing opacity', error);
      }
    })
  );

  // Increase Blur
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.INCREASE_BLUR, async () => {
      try {
        const config = configService.getConfig();
        const newBlur = clamp(
          config.blur + LIMITS.BLUR_STEP,
          LIMITS.MIN_BLUR,
          LIMITS.MAX_BLUR
        );
        await configService.updateConfig('codecanvas.blur', newBlur);
      } catch (error) {
        logger.error('Error increasing blur', error);
      }
    })
  );

  // Decrease Blur
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.DECREASE_BLUR, async () => {
      try {
        const config = configService.getConfig();
        const newBlur = clamp(
          config.blur - LIMITS.BLUR_STEP,
          LIMITS.MIN_BLUR,
          LIMITS.MAX_BLUR
        );
        await configService.updateConfig('codecanvas.blur', newBlur);
      } catch (error) {
        logger.error('Error decreasing blur', error);
      }
    })
  );

  // Reset Settings
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.RESET_SETTINGS, async () => {
      try {
        const confirmed = await vscode.window.showWarningMessage(
          'Reset all CodeCanvas settings to default?',
          { modal: true },
          'Yes',
          'No'
        );
        if (confirmed === 'Yes') {
          await configService.resetToDefault();
          vscode.window.showInformationMessage('Settings reset to defaults!');
        }
      } catch (error) {
        logger.error('Error resetting settings', error);
      }
    })
  );

  // Next Wallpaper (placeholder)
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.NEXT_WALLPAPER, () => {
      vscode.window.showInformationMessage('Next wallpaper feature coming soon!');
    })
  );

  // Previous Wallpaper (placeholder)
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.PREVIOUS_WALLPAPER, () => {
      vscode.window.showInformationMessage('Previous wallpaper feature coming soon!');
    })
  );

  // Open Wallpaper Folder
  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_IDS.OPEN_WALLPAPER_FOLDER, async () => {
      try {
        const folders = vscode.workspace.workspaceFolders;
        if (folders && folders.length > 0) {
          const wallpaperFolder = vscode.Uri.joinPath(folders[0].uri, '.codecanvas');
          vscode.commands.executeCommand('revealFileInOS', wallpaperFolder);
        } else {
          vscode.window.showWarningMessage('No workspace folder open');
        }
      } catch (error) {
        logger.error('Error opening wallpaper folder', error);
      }
    })
  );
}
