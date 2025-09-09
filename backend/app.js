require('dotenv').config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const authRoutes = require("./routes/authentication");
const inviteRoutes = require("./routes/invitation");
const userRoutes = require("./routes/user");
const passwordRoutes = require("./routes/password");
const orgRoutes = require("./routes/organization");
const userPromotionRoutes = require("./routes/userPromotion");
const imageRoutes = require("./routes/image");
const examplesRoutes = require("./routes/examples");
const debugRoutes = require("./routes/debug");
const tagRoutes = require("./routes/tag");
const categoryRoutes = require("./routes/category");
const resourceRoutes = require("./routes/resource");
const profileRoutes = require("./routes/profile");
const videoRoutes = require("./routes/video");

const programRoutes = require("./routes/program");
const skillRoutes = require("./routes/skill");
const eventRoutes = require("./routes/event");
const eventDayRoutes = require("./routes/event_day");
const requirementsRoutes = require("./routes/requirements");

const app = express();

// Allow multiple dev origins (localhost and 127.0.0.1) for convenience
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const defaultOrigins = [FRONTEND_URL, 'http://127.0.0.1:5173'];
// Support comma-separated env list as well
const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the BXDP server application!");
});

// Health check for interview setup
app.get('/health', (req, res) => {
  res.json({ ok: true, safeMode: process.env.SAFE_MODE === 'true', storage: process.env.STORAGE_PROVIDER || 'mock' });
});

app.use("/api", authRoutes);
app.use("/api", inviteRoutes);
app.use("/api", userRoutes);
app.use("/api", passwordRoutes);
app.use("/api", orgRoutes);
app.use("/api", userPromotionRoutes);
app.use("/api", imageRoutes);
app.use("/api", tagRoutes);
app.use("/api", programRoutes);
app.use("/api", skillRoutes);
app.use("/api", eventRoutes);
app.use("/api", eventDayRoutes);
app.use("/api", requirementsRoutes);
app.use("/api", profileRoutes);
app.use("/api", videoRoutes);
app.use("/api", resourceRoutes);
app.use("/api", categoryRoutes);
app.use("/api", examplesRoutes);
app.use("/api", debugRoutes);
// Serve mock uploads in SAFE_MODE or when using mock storage
if ((process.env.SAFE_MODE === 'true') || (String(process.env.STORAGE_PROVIDER || '').toLowerCase() === 'mock')) {
  const path = require('path');
  app.use('/mock', express.static(path.join(__dirname, '.mock_uploads')));
}

module.exports = app;
