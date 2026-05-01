const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Schema locally if not using a separate file
const registrationSchema = new mongoose.Schema({
    barangay: String,
    address: String,
    name: String,
    age: Number,
    contact: String,
    height: Number,
    weight: Number,
    medicalConditions: String,
    competitionLevel: String,
    position: String,
    createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", registrationSchema);

router.post("/", async (req, res) => {
    try {
        const newEntry = new Registration(req.body);
        await newEntry.save();
        console.log("🏀 Registration Saved to DB:", newEntry.name);
        res.status(200).json({ message: "Form Submitted Successfully" });
    } catch (err) {
        console.error("❌ DB Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
