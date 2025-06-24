# SketchFlow

> A modern, collaborative note-taking platform with integrated drawing capabilities powered by Excalidraw.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-SketchFlow-blue?style=for-the-badge&logo=vercel)](https://sketch-flow-mongo.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

## 🚀 Live Demo

**Experience SketchFlow in action:** [https://sketch-flow-mongo.vercel.app/](https://sketch-flow-mongo.vercel.app/)

## 📖 Overview

SketchFlow is a comprehensive note-taking application that combines the power of text-based notes with advanced drawing capabilities. Built with modern web technologies, it provides an intuitive interface for creating, organizing, and collaborating on visual content.

### ✨ Key Highlights

- **🎨 Integrated Drawing Tools**: Full Excalidraw integration for professional diagrams and sketches
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🔐 Secure Authentication**: NextAuth.js with GitHub OAuth and credential-based login
- **💾 Real-time Persistence**: MongoDB Atlas with automatic saving and data synchronization
- **🌙 Dark Mode Support**: Beautiful light and dark themes with system preference detection

## 🛠️ Features

### 🎨 Drawing & Sketching

- **Professional Drawing Tools**: Complete Excalidraw integration with shapes, text, and freehand drawing
- **Real-time Auto-save**: Automatic saving every 30 seconds to prevent data loss
- **Manual Save Controls**: User-initiated save with visual feedback
- **Export Capabilities**: Save drawings in multiple formats (.excalidraw, PNG, SVG)
- **Fullscreen Mode**: Distraction-free drawing environment
- **Collaborative Features**: Real-time collaboration capabilities (coming soon)

### 📝 Note Management

- **Instant Note Creation**: One-click note creation with automatic workspace redirection
- **Smart Organization**: Star important notes, archive completed work
- **Advanced Search**: Find notes by title with real-time filtering
- **Category Filtering**: Organize by All, Starred, or Archived notes
- **Inline Title Editing**: Click-to-edit note titles with keyboard shortcuts
- **Bulk Operations**: Multi-select and batch actions (planned)

### 👤 User Experience

- **Modern Authentication**: Secure login with GitHub OAuth and email/password
- **Responsive Interface**: Optimized for all screen sizes and devices
- **Theme System**: Light, dark, and system theme preferences
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: WCAG compliant design with keyboard navigation
- **Performance**: Optimized loading and rendering for large note collections

### 🔧 Technical Excellence

- **Next.js 14 App Router**: Latest React framework with server-side rendering
- **TypeScript**: Full type safety and enhanced developer experience
- **MongoDB Atlas**: Scalable cloud database with automatic backups
- **Server Actions**: Efficient data mutations with optimistic updates
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vercel Deployment**: Global CDN with automatic scaling

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│                 │    │                 │    │                 │
│ • Next.js 14    │◄──►│ • API Routes    │◄──►│ • MongoDB Atlas │
│ • React 18      │    │ • Server Actions│    │ • Mongoose ODM  │
│ • TypeScript    │    │ • NextAuth.js   │    │ • Indexes       │
│ • Tailwind CSS  │    │ • Middleware    │    │ • Aggregations  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier available)
- **GitHub OAuth App** (for social login)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sketch-flow.git
   cd sketch-flow
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sketchflow

   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-here

   # GitHub OAuth (optional)
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Deployment

1. **Deploy to Vercel**

   ```bash
   npm run build
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Add all `.env.local` variables to Vercel dashboard
   - Update `NEXTAUTH_URL` to your production domain
   - Configure GitHub OAuth callback URLs

## 📁 Project Structure

```
sketch-flow/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── (landing)/               # Landing page route
│   ├── api/                     # API endpoints
│   │   ├── auth/                # NextAuth.js routes
│   │   └── register/            # User registration
│   ├── dashboard/               # Main dashboard
│   └── workspace/               # Drawing workspace
├── components/                   # Reusable components
│   ├── base/                    # Core components
│   │   ├── Logo.tsx            # Application logo
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer component
│   ├── provider/                # Context providers
│   │   ├── session-provider.tsx # NextAuth session
│   │   ├── theme-provider.tsx   # Theme management
│   │   └── theme-toggle.tsx     # Theme switcher
│   └── ui/                      # UI components
│       ├── button.tsx           # Button component
│       └── dropdown-menu.tsx    # Dropdown component
├── lib/                         # Utility libraries
│   ├── auth.ts                  # NextAuth configuration
│   ├── db.ts                    # Database connection
│   └── utils.ts                 # Helper functions
├── models/                      # MongoDB models
│   ├── Drawing.ts               # Drawing schema
│   └── User.ts                  # User schema
├── action/                      # Server actions
│   └── notes.ts                 # Note CRUD operations
├── public/                      # Static assets
│   └── favicon.svg              # Application favicon
└── types.d.ts                   # TypeScript definitions
```

## 🎯 Usage Guide

### Creating Your First Note

1. **Sign up or log in** to your account
2. **Click "New Note"** on the dashboard
3. **Start drawing** with Excalidraw tools
4. **Your work auto-saves** every 30 seconds
5. **Export or share** your completed drawing

### Managing Your Notes

| Action           | How to Do It                        |
| ---------------- | ----------------------------------- |
| **Create Note**  | Click "New Note" button             |
| **Star Note**    | Click "Star" button on note card    |
| **Archive Note** | Click "Archive" button on note card |
| **Edit Title**   | Click on note title to edit inline  |
| **Search Notes** | Use the search bar in dashboard     |
| **Delete Note**  | Archive first, then click "Delete"  |

### Drawing Features

- **Shapes & Tools**: Rectangle, circle, arrow, text, freehand
- **Styling**: Colors, stroke width, fill options
- **Layers**: Organize elements with layering
- **Export**: PNG, SVG, or .excalidraw formats
- **Fullscreen**: Toggle immersive drawing mode

## 🔧 Configuration

### Environment Variables

| Variable          | Description                | Required | Example                       |
| ----------------- | -------------------------- | -------- | ----------------------------- |
| `MONGODB_URI`     | MongoDB connection string  | Yes      | `mongodb+srv://...`           |
| `NEXTAUTH_URL`    | Application URL            | Yes      | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | JWT encryption secret      | Yes      | `generated-secret`            |
| `GITHUB_ID`       | GitHub OAuth client ID     | No       | `your-github-client-id`       |
| `GITHUB_SECRET`   | GitHub OAuth client secret | No       | `your-github-client-secret`   |

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Homepage URL: `https://your-app.vercel.app`
4. Set Authorization callback URL: `https://your-app.vercel.app/api/auth/callback/github`
5. Copy Client ID and Client Secret to environment variables

## 🛡️ Security

- **Authentication**: NextAuth.js with JWT tokens
- **Database**: MongoDB Atlas with connection encryption
- **Environment**: Secure environment variable management
- **CORS**: Proper cross-origin resource sharing
- **Validation**: Input sanitization and validation

## 🚀 Performance

- **SSR/SSG**: Server-side rendering for better SEO
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Intelligent caching strategies
- **CDN**: Global content delivery network

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Excalidraw** for the powerful drawing engine
- **Next.js** team for the amazing framework
- **Vercel** for seamless deployment
- **MongoDB** for reliable database hosting
- **Tailwind CSS** for the utility-first styling

## 📞 Support

- **Documentation**: [https://sketch-flow-mongo.vercel.app/](https://sketch-flow-mongo.vercel.app/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/sketch-flow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sketch-flow/discussions)
- **Email**: support@sketchflow.com

---

**Made with ❤️ by [Harsh](https://github.com/yourusername)**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/sketch-flow?style=social)](https://github.com/yourusername/sketch-flow)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/sketch-flow?style=social)](https://github.com/yourusername/sketch-flow)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/sketch-flow)](https://github.com/yourusername/sketch-flow/issues)
