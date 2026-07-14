import dotenv from "dotenv";

// Load .env FIRST
dotenv.config();

// Import after loading environment variables
const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

// Connect Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});