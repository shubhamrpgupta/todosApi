require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./database/database");
const User = require("./model/User");
const Task = require("./model/Task");

const app = express();
const PORT = process.env.PORT;


User.hasMany(Task, { foreignKey: "user_id", as: "usersTask" });
Task.belongsTo(User, { foreignKey: "user_id", as: "taskOfUser" });


sequelize.authenticate()
    .then(() => console.log("DB open successfully"))
    .catch((err) => {
        console.log("Error While opening DB");
        console.log(err);
    });

sequelize.sync({ force: true })
    .then((result) => console.log("Working"))
    .catch((err) => console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);


app.listen(PORT, () => {
    console.log(`Listening on PORT :${PORT}`);
})