import {useState} from 'react'

// Main page component for the Cancer Patient Studies front end application
function MainPage() {
  const [patientId, setPatientId] = useState('')

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Cancer Patient Studies</h1>
          <h3>Welcome to the Cancer Patient Studies app! Here you can view patient data to determine which patients may be eligible for clinical study.</h3>
          <h2>Choose a patient view:</h2>
        </div>
      </header>

      <section className="panel">
        <div className="action-row">
          <a className="button button-primary" href="/patients">View Full Patient Data</a>
        </div>

        <div className="action-row">
          <label htmlFor="patient-id">Select a specific patient by patient ID:</label>
          <input
            id="patient-id"
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <a className="button button-primary" href={`/patient/${patientId}`}>View Patient</a>
        </div>
      </section>
    </main>
  )
}

export default MainPage
