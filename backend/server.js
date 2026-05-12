// Fix for DNS / querySrv error
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// ================== YOUR CONNECTION STRING ==================
const MONGO_URI = "mongodb+srv://radhakrishna:MyPassword123@cluster0.vegjo6c.mongodb.net/?retryWrites=true&w=majority";
// ===========================================================

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Successfully Connected to MongoDB Atlas"))
    .catch(err => console.log("❌ MongoDB Error:", err.message));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Backend is working with MongoDB!');
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        await new Contact({ name, email, message }).save();

        console.log("=== New Message Saved in Database ===");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        console.log("===========================");

        res.json({ success: true, message: "Thank you! Message saved in database." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving message" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

