const errorMiddleware = (err, req, res, next) => {

    console.error("========== ERROR ==========");
    console.error(err);
    console.error("Stack:", err.stack);
    console.error("===========================");

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        timestamp: new Date().toISOString(),
    });

};

export default errorMiddleware;