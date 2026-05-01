const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const app = express(); 
const server = http.createServer(app); // Fixed line 6

// --- MIDDLEWARE ---
app.use(cors({
    origin: "https://volleyball-league-frontend.onrender.com"
})); 

// Regex literal to bypass Express 5 string parsing errors
app.options(/.* / , (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://volleyball-league-frontend.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
}); 

app.use(express.json()); 

// --- DATABASE CONNECTION ---
const dbURI = "mongodb://elijahzb:elijahzb@ac-xhkwgwq-shard-00-00.86rp3oj.mongodb.net:27017,ac-xhkwgwq-shard-00-01.86rp3oj.mongodb.net:27017,ac-xhkwgwq-shard-00-02.86rp3oj.mongodb.net:27017/?ssl=true&replicaSet=atlas-fyhs8f-shard-0&authSource=admin&appName=elijahzb";

mongoose 
    .connect(dbURI) 
    .then(() => console.log("✅ Santa Rosa Volleyball DB Connected"))
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); 
    });

// --- ROUTES ---
app.get('/', (req, res) => {
    res.send("Santa Rosa Volleyball League API is online.");
});

const submitForm = require('./API/submit'); 
app.use("/submit", submitForm); 

// Force the port to 10000 if process.env.PORT is missing
const PORT = process.env.PORT || 10000; 

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Santa Rosa Backend forced to port ${PORT}`);
});
