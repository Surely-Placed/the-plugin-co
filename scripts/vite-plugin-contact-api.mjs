import { config as loadEnv } from "dotenv";
import { handleContactRequest } from "../api/lib/contact-handler.mjs";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

/** Runs the Vercel serverless handler locally inside Vite dev. */
export function contactApiDevPlugin() {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      loadEnv();

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/contact") return next();

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          return res.end();
        }

        if (req.method !== "POST") {
          return sendJson(res, 405, { error: "Method not allowed" });
        }

        try {
          const body = await readJsonBody(req);
          const result = await handleContactRequest(body);
          sendJson(res, result.status, result.body);
        } catch (err) {
          console.error("[contact-api-dev]", err);
          sendJson(res, 500, { error: "Server error" });
        }
      });
    },
  };
}
