import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { apiLimiter } from "./middleware/rateLimiter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// ======================================================
// GLOBAL MIDDLEWARES
// ======================================================

app.use(cors());

// Parse JSON request body
app.use(express.json());

// Parse URL encoded request body
app.use(express.urlencoded({ extended: true }));

// API Rate Limiter
app.use(apiLimiter);


// ======================================================
// SWAGGER DOCUMENTATION
// ======================================================

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        test: "HARSHA_BACKEND_TEST_123",
    });
});


// ======================================================
// API ROUTES
// ======================================================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Item Routes
app.use("/api/items", itemRoutes);

// Claim Routes
app.use("/api/claims", claimRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// User Routes
app.use("/api/users", userRoutes);


// ======================================================
// 404 ROUTE
// ======================================================

app.use((req, res) => {
    console.log("❌ ROUTE NOT FOUND:", req.method, req.originalUrl);

    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});


// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use(errorMiddleware);
export default app;