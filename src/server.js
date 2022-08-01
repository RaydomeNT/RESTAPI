require("./db/connection"); //runs db connection imediately
const express = require("express");
const userRouter = require("./user/routes");
const app = express();

//add relevant routes and controllers to app before listen runs, like CRUD
app.use(express.json()); //tell entire server that it will aslways recieve json and always send back json, parsed automatically
app.use(userRouter);

app.listen(5000, () => {
    console.log("listening on 5000")
});