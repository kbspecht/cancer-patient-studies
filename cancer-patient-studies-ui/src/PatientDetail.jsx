import axios from "axios"
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

// Component for displaying the details of a specific patient
function PatientDetail(props) {
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  // Function to load a patient's details from the API
  const loadPatient = async() => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/patient/${props.patientId}`)
        setPatient(response.data)
        setStatus('ready')
      } catch (err) {
        setError(err.response?.data?.error || err.message)
        setStatus('error')
      }
  }

  // Load the patient's details when the component mounts
  useEffect(() => {
    loadPatient()
  }, [])

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Cancer Patient Studies</h1>
          <h2>Patient Summary</h2>
        </div>
      </header>

      <div className="summary">
        <span className="summary-label">Patient</span>
        <span className="summary-value">{props.patientId}</span>
      </div>

      <div className="action-row">
        <Link className="button button-secondary" to="/">Back to Main Page</Link>
      </div>

      {status === 'loading' && <p className="status">Loading patient record...</p>}
      {status === 'error' && <p className="status error">Unable to load patient: {error}</p>}
      {status === 'ready' && (
        <section className="detail-panel">
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span>{patient?.first_name} {patient?.last_name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Gender</span>
            <span>{patient?.gender}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address</span>
            <span>{patient?.street_address}, {patient?.city}, {patient?.state} {patient?.zip_code}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span>{patient?.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Cancer Diagnoses</span>
            <span>{patient?.diagnoses}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Relevant Genes</span>
            <span>{patient?.genes}</span>
          </div>
        </section>
      )}
    </main>
  )
}

export default PatientDetail
