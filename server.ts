import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for security check
  app.post("/api/check", (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required",
      });
    }

    // Demo logic: Always return secured
    // Masking phone number for the response
    const maskedPhone = phoneNumber.length > 4 
      ? `XXXXXX${phoneNumber.slice(-4)}` 
      : phoneNumber;

    res.json({
      status: "success",
      message: `Phone ${maskedPhone} is Secured ✅`,
      details: "No clickjacking vulnerabilities detected on this device."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
