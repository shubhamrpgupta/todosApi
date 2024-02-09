const Task = require("../model/Task");
const User = require("../model/User");



module.exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.json({ status: 400, message: "Please Give the required information" })
        }
        await User.create(req.body)
            .then((result) => {
                res.json({ status: 200, newUser: result })
            })
            .catch((err) => {
                res.json({ status: 400, message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}


//here user is getting logged in with primary key ie id-
module.exports.loginUser = async (req, res) => {
    try {
        const { id } = req.body;
        await User.findByPk(id)
            .then((result) => {
                if (!result) {
                    res.json({ status: 200, message: "Invalid Login Credential" })
                } else { res.json({ status: 200, user: result }) }
            })
            .catch((err) => {
                res.json({ status: 400, message: err.message })
            });
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
}
