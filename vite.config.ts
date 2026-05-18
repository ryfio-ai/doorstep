import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://www.thiranoli.com',
      dynamicRoutes: [
        '/',
        '/about',
        '/learning-paths',
        '/auth',
        '/student',
        '/trainer'
      ],
      generateRobotsTxt: true,
      robots: [{
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/trainer/dashboard', '/student/dashboard']
      }]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "src": path.resolve(__dirname, "./src"),
    },
  },
})
