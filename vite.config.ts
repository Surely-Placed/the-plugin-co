import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { routeMetaPlugin } from "./scripts/route-meta";
import { contactApiDevPlugin } from "./scripts/vite-plugin-contact-api.mjs";

export default defineConfig({
  plugins: [react(), routeMetaPlugin(), contactApiDevPlugin()],
  appType: "spa",
});
