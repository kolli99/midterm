import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS

console.log(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });
  console.log(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    // Fetch appointments from the backend service using the service name
    fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error fetching appointments:", err)); // Added error handling
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post new appointment to the backend service using the service name
    fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(newAppointment => setAppointments([...appointments, newAppointment]))
    .catch(err => console.error("Error adding appointment:", err)); // Added error handling
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center text-primary">Doctor's Office Appointments</h1>
      
      {/* Form Section */}
      <Form onSubmit={handleSubmit} className="mb-4 bg-light p-4 rounded shadow-sm">
        <Form.Group controlId="formPatientName" className="mb-3">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Patient Name" 
            value={form.patientName} 
            onChange={(e) => setForm({ ...form, patientName: e.target.value })} 
            required 
          />
        </Form.Group>
        
        <Form.Group controlId="formDoctorName" className="mb-3">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Doctor Name" 
            value={form.doctorName} 
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control 
            type="date" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
            required 
          />
        </Form.Group>
        
        <Button variant="success" type="submit">Book Appointment</Button>
      </Form>

      {/* Appointments Section */}
      <Row>
        {appointments.length>0 && appointments.map((appt) => (
          <Col md={4} key={appt._id} className="mb-4">
            <Card className="shadow-sm custom-bg-color">
              <Card.Body>
                <Card.Title>{appt.patientName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Dr. {appt.doctorName}</Card.Subtitle>
                <Card.Text>
                  Appointment Date: {new Date(appt.date).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
