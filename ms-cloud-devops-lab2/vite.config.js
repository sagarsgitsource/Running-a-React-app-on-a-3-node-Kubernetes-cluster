import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In `npm run dev`, forward /whoami to a local nginx container (docker run -p 8080:80 ...)
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/whoami": "http://localhost:8080" } },
});
