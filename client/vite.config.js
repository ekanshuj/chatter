import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true,
  //   port: 5100,
  //   proxy: {
  //     '/api/v1/users': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       // secure: false 
  //     }
  //   }

  // },
})
