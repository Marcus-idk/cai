const loginService = require("../services/login");

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const result = await loginService.loginUser(email, password);

        if (result.recordset.length > 0) {
            // Successful login
            const user = result.recordset[0];
            res.status(200).json({ role: user.role });
        } else {
            // Failed login
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log("Error", err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    loginUser
};
