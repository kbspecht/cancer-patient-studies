import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [patients, setPatients] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  const loadPatients = async() => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/patients')
        setPatients(response.data)
        setStatus('ready')
      } catch (err) {
        setError(err.message)
        setStatus('error')
      }
  }
  useEffect(() => {
    loadPatients()
  }, [])

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Cancer Patient Studies</h1>
        </div>
        <div className="summary">
          <span className="summary-value">{patients.length}</span>
          <span className="summary-label">patients loaded</span>
        </div>
      </header>

      {status === 'loading' && <p className="status">Loading patient records...</p>}

      {status === 'error' && (
        <p className="status error">
          Unable to load patients from Flask: {error}
        </p>
      )}

      {status === 'ready' && (
        <section className="table-wrap" aria-label="Patient records">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Phone</th>
                <th>Cancer Diagnosis</th>
                <th>Relevant Genes</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.street_address}</td>
                  <td>{patient.city}</td> 
                  <td>{patient.state}</td>
                  <td>{patient.zip_code}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.diagnosis ?? 'None'}</td>
                  <td>{patient.genes ?? 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  )
}

export default App
