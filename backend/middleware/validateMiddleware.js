// ===============================
// Validate Register
// ===============================

export const validateRegister = (req, res, next) => {

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters",
        });
    }

    next();
};

// ===============================
// Validate Login
// ===============================

export const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password",
        });
    }

    next();
};

// ===============================
// Validate Item
// ===============================

export const validateItem = (req, res, next) => {

    const {
        title,
        description,
        category,
        type,
        location,
        date,
    } = req.body;

    if (
        !title ||
        !description ||
        !category ||
        !type ||
        !location ||
        !date
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all item fields",
        });
    }

    if (type !== "Lost" && type !== "Found") {
        return res.status(400).json({
            success: false,
            message: "Type must be either Lost or Found",
        });
    }

    next();
};