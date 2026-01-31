# SpeakPro Academy

SpeakPro Academy is a modern, responsive language learning platform designed to connect students with native certified teachers. This application enables users to book classes, take placement tests, and explore various courses for adults and kids.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (Mobile, Tablet, Desktop).
- **Interactive UI**: Built with React and Framer Motion for smooth animations.
- **Multi-language Support**: i18n integration for English, Spanish, and Italian.
- **Placement Tests**: Interactive level tests for students.
- **Teacher/Course Showcase**: engaging sections to display course offerings and teacher profiles.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Iconify](https://iconify.design/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Internationalization**: [i18next](https://www.i18next.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository (or download source):
    ```bash
    git clone <repository-url>
    cd SpeakPro/SpeakProApp
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready for deployment to providers like Vercel, Netlify, or AWS (S3/CloudFront).

## 📂 Project Structure

```
SpeakProApp/
├── public/              # Static assets (images, icons)
├── src/
│   ├── assets/          # Local assets (videos, images)
│   ├── components/
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   ├── ui/          # Reusable UI sections (Hero, Features, etc.)
│   ├── data/            # Static data files (courses, testimonials)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles & Tailwind directives
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🌍 Deployment

### Option 1: Cloudflare Pages (Recommended)
Cloudflare Pages offers excellent performance and global caching for static sites like this.

1.  Log in to the **Cloudflare Dashboard** > **Workers & Pages**.
2.  Click **Create Application** > **Pages** > **Connect to Git**.
3.  Select your repository (`PacoCastle/SpeakPro`).
4.  **Build Settings**:
    *   **Framework Preset**: `Vite`
    *   **Build Command**: `npm run build`
    *   **Build Output Directory**: `dist`
5.  Click **Save and Deploy**.

### Option 2: Vercel or Netlify
1.  Import the repository.
2.  The framework (Vite) should be detected automatically.
3.  Deploy.
