import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "マウスカーソルに円を表示",
  description: "マウスカーソルに円を表示します。",
  version: "1.0.1",
  icons: {
    16: "img/icon16.png",
    48: "img/icon48.png",
    128: "img/icon128.png",
  },
  content_scripts: [
    {
      js: ["src/content/main.ts"],
      matches: ["http://*/*", "https://*/*"],
    },
  ],
  action: {
    default_popup: "src/popup/index.html",
    default_icon: "img/icon16.png",
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  permissions: ["storage"],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
