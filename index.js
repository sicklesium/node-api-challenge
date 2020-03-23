const express = require("express");
const server = express();

const projRouter = require("./data/routes/projectRoutes.js");
const actionRouter = require("./data/routes/actionRoutes.js");

server.use(express.json());

server.use("/api/projects", projRouter)
server.use("/api/actions", actionRouter)

server.listen(5000, () => {
    console.log("\n*** Server running on Port 5000! ***\n");
});

server.get("/", (req, res) => {
    res.send(`<h2>Let's get funky!</h2>`);
});

module.exports = server;