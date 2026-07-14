import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Lost & Found Portal API",
            version: "1.0.0",
            description: "API Documentation for Lost & Found Portal",
        },

        servers: [
            {
                url: "http://localhost:5000",
            },
        ],

        // ==========================
        // JWT Authentication
        // ==========================
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },

    apis: [
        "./routes/*.js",
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;