const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

async function readJson(fileName) {
  const filePath = path.join(__dirname, fileName);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

// Endpoint per Angular
router.get("/servers", async (req, res) => {
  res.json(await readJson("servers.json"));
});

router.get("/backups", async (req, res) => {
  res.json(await readJson("duplicati-backups.normalized.json"));
});

router.get("/summary", async (req, res) => {
  res.json(await readJson("summary.json"));
});

// Endpoint che emulano Duplicati
router.get("/mock/duplicati/serverstate", async (req, res) => {
  res.json(await readJson("duplicati-serverstate.json"));
});

router.get("/mock/duplicati/backups", async (req, res) => {
  res.json(await readJson("duplicati-backups.raw.json"));
});

router.get("/mock/duplicati/backup/:id/log", async (req, res) => {
  res.json(await readJson("duplicati-backup-1-logs.json"));
});

router.post("/mock/duplicati/backup/:id/run", async (req, res) => {
  res.status(202).json({
    message: "Backup avviato",
    backupId: req.params.id,
    status: "QUEUED",
    queuedAt: new Date().toISOString()
  });
});

module.exports = router;
