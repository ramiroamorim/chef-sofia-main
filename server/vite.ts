import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import "dotenv/config";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip API routes - let them be handled by the API middleware
    if (url.startsWith('/api/')) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // In production, the built server is in dist/index.js
  // So we need to look for dist/public relative to the server file
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    // Try alternative path for development
    const altPath = path.resolve(__dirname, "..", "dist", "public");
    if (!fs.existsSync(altPath)) {
      throw new Error(
        `Could not find the build directory: ${distPath} or ${altPath}, make sure to build the client first`,
      );
    }
    log(`Using alternative dist path: ${altPath}`);
    app.use(express.static(altPath, {
      setHeaders: (res) => {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }));
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(altPath, "index.html"));
    });
    return;
  }

  log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath, {
    setHeaders: (res) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
