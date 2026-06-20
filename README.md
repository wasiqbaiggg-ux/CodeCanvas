# CodeCanvas

**CodeCanvas** is a professional-grade Visual Studio Code extension that transforms your editor by allowing you to set any image as the background with extensive customization options.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![VS Code](https://img.shields.io/badge/VSCode-1.85.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)

## Features

### Core Features

✨ **Set Background Images**
- Import images from your local computer
- Use images from URLs
- Drag & drop support
- Recently used images history

📐 **Image Customization**
- **Opacity Control**: 0-100% with real-time preview
- **Blur Effects**: 0-30px adjustable blur
- **Brightness**: 0-200% adjustment
- **Contrast**: 0-200% adjustment
- **Saturation**: 0-200% adjustment

🎯 **Positioning & Sizing**
- 9 position options (center, top, bottom, left, right, corners)
- 5 sizing modes (cover, contain, original, stretch, tile)
- Multiple repeat modes (no-repeat, repeat, repeat-x, repeat-y)

🎨 **Theme Support**
- Dark theme support
- Light theme support
- High contrast mode
- Theme-aware opacity adjustment

���� **Persistent Settings**
- Global configuration
- Workspace-specific settings
- Settings survive VS Code restart

⚡ **Performance**
- Minimal RAM usage
- Optimized image loading
- Image caching
- No editor lag

### Advanced Features

- Multiple wallpapers support
- Slideshow mode with customizable intervals
- Random wallpaper selection
- Animated GIF support
- Settings export/import
- Workspace profiles/presets

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "CodeCanvas"
4. Click Install

### Manual Installation
1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Package as `.vsix` using `vsce package`
5. Install via `code --install-extension codecanvas-0.1.0.vsix`

## Quick Start

1. **Set Background**:
   - Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "CodeCanvas: Set Background Image"
   - Select an image file

2. **Customize**:
   - Open Command Palette
   - Type "CodeCanvas: Open Settings"
   - Adjust opacity, blur, brightness, etc.

3. **Toggle On/Off**:
   - Open Command Palette
   - Type "CodeCanvas: Toggle Background"

## Commands

| Command | Description |
|---------|-------------|
| `codecanvas.setBackground` | Set a new background image |
| `codecanvas.removeBackground` | Remove the current background |
| `codecanvas.toggleBackground` | Toggle background on/off |
| `codecanvas.openSettings` | Open settings webview |
| `codecanvas.increaseOpacity` | Increase opacity by 5% |
| `codecanvas.decreaseOpacity` | Decrease opacity by 5% |
| `codecanvas.increaseBlur` | Increase blur by 2px |
| `codecanvas.decreaseBlur` | Decrease blur by 2px |
| `codecanvas.resetSettings` | Reset all settings to default |
| `codecanvas.nextWallpaper` | Switch to next wallpaper |
| `codecanvas.previousWallpaper` | Switch to previous wallpaper |
| `codecanvas.openWallpaperFolder` | Open wallpaper folder in explorer |

## Configuration

Configure CodeCanvas in VS Code settings:

```json
{
  "codecanvas.enabled": true,
  "codecanvas.imagePath": "/path/to/image.jpg",
  "codecanvas.opacity": 0.12,
  "codecanvas.blur": 8,
  "codecanvas.brightness": 100,
  "codecanvas.contrast": 100,
  "codecanvas.saturation": 100,
  "codecanvas.position": "center",
  "codecanvas.size": "cover",
  "codecanvas.repeat": "no-repeat",
  "codecanvas.workspaceSpecific": false,
  "codecanvas.themeAware": true,
  "codecanvas.darkThemeOpacity": 0.12,
  "codecanvas.lightThemeOpacity": 0.08
}
```

## Supported Image Formats

- PNG
- JPG/JPEG
- WEBP
- GIF (first frame)
- SVG

## Project Structure

```
CodeCanvas/
├── src/
│   ├── extension.ts              # Main extension entry point
│   ├── commands/
│   │   ├── backgroundCommands.ts
│   │   └── settingsCommands.ts
│   ├── services/
│   │   ├── BackgroundService.ts
│   │   ├── ConfigurationService.ts
│   │   ├── ImageService.ts
│   │   └── ThemeService.ts
│   ├── webview/
│   │   ├── SettingsPanel.ts
│   │   ├── html/
│   │   │   └── settings.html
│   │   ├── css/
│   │   │   └── settings.css
│   │   └── js/
│   │       └── settings.js
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
├── dist/                         # Compiled output
├── media/                        # Images and icons
├── images/
│   └── icon.png
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

## Development

### Setup
```bash
clone the repo
npm install
npm run watch
```

### Build
```bash
npm run build        # Production build
npm run build:watch  # Watch mode
```

### Lint
```bash
npm run lint
```

### Run Extension
1. Press `F5` in VS Code to launch extension in debug mode
2. Open Command Palette and run CodeCanvas commands

## FAQ

**Q: Does CodeCanvas slow down VS Code?**
A: No. CodeCanvas uses efficient image rendering and caching to minimize performance impact.

**Q: Can I use different backgrounds for different workspaces?**
A: Yes! Enable workspace-specific settings to configure per-workspace backgrounds.

**Q: Does it support animated GIFs?**
A: Yes, CodeCanvas supports animated GIFs, though performance depends on GIF complexity.

**Q: How do I backup my settings?**
A: Use "Export Settings" to save as JSON, and "Import Settings" to restore.

## Troubleshooting

### Background not showing
- Ensure extension is enabled: `codecanvas.enabled: true`
- Check image path is correct
- Try toggling background off and on
- Restart VS Code

### Image appears distorted
- Try different `codecanvas.size` options
- Adjust `codecanvas.position`
- Check image dimensions

### Performance issues
- Reduce blur effect
- Try smaller image file
- Disable other visual extensions

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## Support

For issues, questions, or suggestions:
- [GitHub Issues](https://github.com/wasiqbaiggg-ux/CodeCanvas/issues)
- [GitHub Discussions](https://github.com/wasiqbaiggg-ux/CodeCanvas/discussions)

---

**Made with ❤️ by the CodeCanvas team**
