const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const sequelize = require("./config/db");

// Models
const User = require("./models/User");

// Routes
const authRoutes = require("./routes/auth");
const purchaseRoutes = require("./routes/purchases");
const transferRoutes = require("./routes/transfers");
const assignmentRoutes = require("./routes/assignments");
const dashboardRoutes = require("./routes/dashboard");
const logRoutes = require("./routes/logs");

const app = express();

/* ===========================
   🔧 MIDDLEWARE
=========================== */
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

/* ===========================
   🔍 TEST ROUTE
=========================== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===========================
   🚀 ROUTES
=========================== */
app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/logs", logRoutes);

/* ===========================
   ❌ GLOBAL ERROR HANDLER
=========================== */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ===========================
   🗄️ DB + SERVER START
=========================== */
const startServer = async () => {
  try {
    // Connect DB
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync tables
    await sequelize.sync();
    console.log("✅ Database synced");

    // Create default admin
    const hash = await bcrypt.hash("1234", 10);

    await User.findOrCreate({
      where: { email: "admin@test.com" },
      defaults: {
        password: hash,
        role: "Admin",
        base: "HQ"
      }
    });

    console.log("✅ Default Admin Ready");

    // Start server
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();