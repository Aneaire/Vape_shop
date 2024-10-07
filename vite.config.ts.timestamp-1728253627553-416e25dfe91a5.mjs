// vite.config.ts
import { TanStackRouterVite } from "file:///C:/Users/Gel/Desktop/Projects/others/vapeshop/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///C:/Users/Gel/Desktop/Projects/others/vapeshop/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { config } from "file:///C:/Users/Gel/Desktop/Projects/others/vapeshop/node_modules/dotenv/lib/main.js";
import path from "path";
import { defineConfig } from "file:///C:/Users/Gel/Desktop/Projects/others/vapeshop/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Gel\\Desktop\\Projects\\others\\vapeshop";
config();
var vite_config_default = defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    "process.env": process.env
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHZWxcXFxcRGVza3RvcFxcXFxQcm9qZWN0c1xcXFxvdGhlcnNcXFxcdmFwZXNob3BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEdlbFxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXG90aGVyc1xcXFx2YXBlc2hvcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvR2VsL0Rlc2t0b3AvUHJvamVjdHMvb3RoZXJzL3ZhcGVzaG9wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCJkb3RlbnZcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5jb25maWcoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtUYW5TdGFja1JvdXRlclZpdGUoe30pLCByZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52XCI6IHByb2Nlc3MuZW52LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVVLFNBQVMsMEJBQTBCO0FBQzFXLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWM7QUFDdkIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBSjdCLElBQU0sbUNBQW1DO0FBTXpDLE9BQU87QUFHUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUFBLEVBQ3pDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBLEVBQ3pCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
