# Dolce Vita Pushkar - Luxury Villas

A modern, responsive website for Dolce Vita Pushkar, a luxury villa resort in Pushkar, Rajasthan. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚀 **Next.js 13** with App Router for optimal performance
- 🎨 **Tailwind CSS** for utility-first styling
- 🏗 **TypeScript** for type safety
- 📱 **Fully responsive** design for all devices
- ⚡ **Optimized performance** with code splitting and lazy loading
- 🔍 **SEO-optimized** with Next.js Metadata API
- 🌐 **Internationalization (i18n)** ready
- 📝 **Contact form** with validation and submission handling
- 📅 **Booking system** with date selection and availability checking
- 🖼 **Image optimization** with Next.js Image component
- 🌟 **Modern UI/UX** with smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 (LTS recommended)
- npm (v9+), yarn (v1.22+), or pnpm (v7+)
- Git 2.25.0 or later
- Code editor (VS Code recommended)

## 🛠 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/dolce-vita-pushkar.git
   cd dolce-vita-pushkar
   ```

   > **Note**: If you're using nvm, run `nvm use` to switch to the correct Node.js version.

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using Yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Update the values in `.env.local` with your configuration.

4. **Run the development server**

   ```bash
   # Using npm
   npm run dev

   # Using Yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## 🔧 Development Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `type-check` - Check TypeScript types
- `test` - Run tests
- `storybook` - Start Storybook

## 🌐 Environment Variables

Create a `.env.local` file with required variables. See `.env.local.example` for reference.

## Project Structure

```
dolce-vita-next/
├── public/                  # Static files
│   ├── images/              # Image assets
│   ├── videos/              # Video assets
│   └── favicon.ico          # Favicon
├── src/
│   ├── app/                 # App router pages
│   │   ├── (main)/         # Main layout and pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   ├── villas/
│   │   │   └── page.tsx
│   │   ├── api/            # API routes
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (buttons, cards, etc.)
│   │   └── sections/        # Page sections
│   ├── config/             # Configuration files
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── styles/             # Global styles and Tailwind config
│   └── types/              # TypeScript type definitions
├── .env.local.example      # Example environment variables
├── next.config.js          # Next.js configuration
├── package.json
├── postcss.config.js
├── README.md
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Deployment

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js) from the creators of Next.js.

### Deploy on Vercel

1. Push your code to a Git repository
2. Import your project on Vercel
3. Set up environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to `.env.local.example` for the required variables.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to use Tailwind CSS.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn TypeScript.

## Contact

For any questions or feedback, please contact us at [info@dolcevitapushkar.com](mailto:info@dolcevitapushkar.com).

---

<div align="center">
  <p>Made with ❤️ by Dolce Vita Pushkar</p>
  <p>© {new Date().getFullYear()} Dolce Vita Pushkar. All rights reserved.</p>
</div>
