import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // IMPORTANT for GitHub Pages: this must match your repo name exactly.
  // Example: if your repo is github.com/uri/domingo-app, base must be '/domingo-app/'
  // If you deploy to a *user/org* page (username.github.io), set base to '/'
  base: '/domingo-app/',
})
