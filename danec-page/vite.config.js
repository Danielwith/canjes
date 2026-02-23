import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    webUpdateNotice({
      logVersion: true,
      checkInterval: 60 * 1000, // Revisa cada minuto
      hiddenDefaultNotification: true, // No mostrar la UI por defecto
    }),
  ],
  base: "/",
})
