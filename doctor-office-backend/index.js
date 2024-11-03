const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config(); // Import dotenv to load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/appointments', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Define Appointment schema
const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

// Endpoint to get all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to create a new appointment
app.post('/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment); // Send a 201 Created response
  } catch (err) {
    console.error("Error adding appointment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001; // Use PORT from environment variable or default to 3001
  app.listen(PORT, () => {
//app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

