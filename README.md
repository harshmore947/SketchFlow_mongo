# Sketch Flow

A modern note-taking application with integrated drawing capabilities using Excalidraw. Create, manage, and collaborate on visual notes with a beautiful, intuitive interface.

## Features

### 🎨 Drawing & Sketching

- **Excalidraw Integration**: Powerful drawing tools for creating diagrams, sketches, and visual notes
- **Real-time Saving**: Auto-save every 30 seconds and manual save options
- **Export Functionality**: Save your drawings in various formats
- **Fullscreen Mode**: Immersive drawing experience

### 📝 Note Management

- **Create Notes**: Start new drawing sessions with a single click
- **Organize**: Star important notes, archive completed ones
- **Search**: Find notes quickly with search functionality
- **Categories**: Filter notes by All, Starred, or Archived
- **Editable Titles**: Click to edit note titles inline

### 👤 User Experience

- **Authentication**: Secure login and registration with NextAuth.js
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Clean, intuitive interface with smooth animations

### 🔧 Technical Features

- **Next.js 14**: Built with the latest Next.js App Router
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Persistent storage for notes and user data
- **Server Actions**: Efficient data mutations with Next.js server actions
- **Tailwind CSS**: Modern styling with utility-first approach

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- NextAuth.js configuration

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sketch_flow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sketch_flow/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (landing)/         # Landing page
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard
│   └── workspace/         # Drawing workspace
├── components/            # Reusable UI components
│   ├── base/             # Base components (Navbar, Footer)
│   ├── provider/         # Context providers
│   └── ui/               # UI components (Button, etc.)
├── lib/                  # Utility libraries
├── models/               # MongoDB models
├── action/               # Server actions
└── types.d.ts            # TypeScript type definitions
```

## Usage

### Creating Notes

1. Click "New Note" on the dashboard
2. You'll be redirected to the drawing workspace
3. Start sketching with Excalidraw tools
4. Your work is automatically saved

### Managing Notes

- **Star**: Click the "Star" button to mark important notes
- **Archive**: Click "Archive" to move notes to archived section
- **Edit Title**: Click on any note title to edit it inline
- **Delete**: Archived notes can be permanently deleted

### Drawing Features

- Use Excalidraw's comprehensive drawing tools
- Export your drawings in various formats
- Toggle fullscreen mode for distraction-free drawing
- Real-time auto-save ensures you never lose your work

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Drawing**: Excalidraw
- **Deployment**: Vercel (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.
