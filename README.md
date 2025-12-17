# Compact Inspector

A browser extension designed to help developers quickly inspect browser compatibility for web technologies directly within their workflow. It leverages MDN Browser Compatibility Data to provide accurate and up-to-date information.

## Features

- **In-Page Inspection**: Simply select text on any webpage to instantly check its browser compatibility.
- **Context Menu Integration**: Right-click on selected text and choose "检查兼容性" (Check Compatibility) to view details.
- **Detailed Compatibility Data**: Displays comprehensive support information from MDN, including version support for major browsers.
- **Visual Status Indicators**: Clearly marks features as **Deprecated**, **Experimental**, or **Standard Track**.
- **Support Tables**: Detailed breakdown of support across different browsers and versions.

## Tech Stack

Built with modern web technologies for performance and developer experience:

- **[WXT](https://wxt.dev/)**: Next-gen Web Extension Framework.
- **React**: UI library for building the interface.
- **TypeScript**: Static typing for better code quality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Unstyled, accessible UI primitives.
- **Jotai**: Atomic state management.
- **Minisearch**: For efficient client-side search functionality.

## Development

This project uses [pnpm](https://pnpm.io/) for package management.

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

### Running in Development Mode

Start the extension in development mode with HMR support:

```bash
# Default (Chrome)
pnpm dev

# Firefox
pnpm dev:firefox
```

### Building for Production

Build the extension for production:

```bash
# Default (Chrome)
pnpm build

# Firefox
pnpm build:firefox
```

### Packaging

Create a zip file for distribution:

```bash
pnpm zip
```

## License

ISC
