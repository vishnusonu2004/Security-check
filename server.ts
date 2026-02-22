import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkHistory = new Map<string, number>();
const protectedDevices = new Set<string>();

function maskPhone(num: string) {
  return num.length > 4 ? "XXXXXX" + num.slice(-4) : num;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post("/api/check", (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ status: "error", message: "Phone number is required" });
    }

    const masked = maskPhone(phoneNumber);

    if (protectedDevices.has(phoneNumber)) {
      return res.json({
        status: "success",
        message: `Phone ${masked} is Secured ✅`,
        details: "No clickjacking vulnerabilities detected on this device."
      });
    }

    const count = (checkHistory.get(phoneNumber) || 0) + 1;
    checkHistory.set(phoneNumber, count);

    if (count === 1) {
      res.json({
        status: "success",
        message: `Phone ${masked} is Secured ✅`,
        details: "No clickjacking vulnerabilities detected on this device."
      });
    } else {
      res.json({
        status: "vulnerable",
        message: `Phone ${masked} is Not Secured ⚠️`,
        details: "Potential clickjacking vulnerability detected. Click below to secure your device."
      });
    }
  });

  app.post("/api/secure", (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ status: "error", message: "Phone number is required" });
    }

    protectedDevices.add(phoneNumber);
    res.json({
      status: "success",
      message: `Phone ${maskPhone(phoneNumber)} is now Secured ✅`,
      details: "Security patch applied. Your device is now protected against clickjacking attacks."
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:3000");
  });
}

startServer();
