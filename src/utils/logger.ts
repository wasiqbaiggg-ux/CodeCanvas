/**
 * Logger utility for CodeCanvas
 */

import * as vscode from 'vscode';
import { LOG_LEVEL } from './constants';

type LogLevel = typeof LOG_LEVEL[keyof typeof LOG_LEVEL];

class Logger {
  private outputChannel: vscode.OutputChannel | null = null;
  private logLevel: LogLevel = LOG_LEVEL.INFO;

  initialize(context: vscode.ExtensionContext): void {
    this.outputChannel = vscode.window.createOutputChannel('CodeCanvas');
    context.subscriptions.push(this.outputChannel);
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  debug(message: string, data?: unknown): void {
    this.log(LOG_LEVEL.DEBUG, message, data);
  }

  info(message: string, data?: unknown): void {
    this.log(LOG_LEVEL.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LOG_LEVEL.WARN, message, data);
  }

  error(message: string, error?: unknown): void {
    const errorData = error instanceof Error ? error.message : String(error);
    this.log(LOG_LEVEL.ERROR, message, errorData);
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;

    if (this.shouldLog(level)) {
      console.log(logMessage, data);

      if (this.outputChannel) {
        if (data) {
          this.outputChannel.appendLine(`${logMessage} ${JSON.stringify(data)}`);
        } else {
          this.outputChannel.appendLine(logMessage);
        }
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LOG_LEVEL.DEBUG, LOG_LEVEL.INFO, LOG_LEVEL.WARN, LOG_LEVEL.ERROR];
    const currentIndex = levels.indexOf(this.logLevel);
    const messageIndex = levels.indexOf(level);
    return messageIndex >= currentIndex;
  }

  show(): void {
    this.outputChannel?.show();
  }
}

export const logger = new Logger();
