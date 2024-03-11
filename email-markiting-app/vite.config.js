import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Set the main output directory to "dist"
    assetsDir: "build", // Set the assets (e.g., images, styles) directory to "build"
  },
});
