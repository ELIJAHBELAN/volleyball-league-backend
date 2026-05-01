const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require('http');
const server = HTMLOutputElement.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send("server is running");
});
const dbURI = "mongodb://elijahzb:elijahzb@ac-xhkwgwq-shard-00-00.86rp3oj.mongodb.net:27017,ac-xhkwgwq-shard-00-01.86rp3oj.mongodb.net:27017,ac-xhkwgwq-shard-00-02.86rp3oj.mongodb.net:27017/?ssl=true&replicaSet=atlas-fyhs8f-shard-0&authSource=admin&appName=elijahzb";
mongoose 
    .connect(dbURI) 
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        // Note: Check your IP Whitelist in MongoDB Atlas if this still fails!
        process.exit(1);
    });

    app.use(cors());
    app.use(express.json());

    const submitForm = require('./API/submit')

    app.use("/submit", submitForm);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
