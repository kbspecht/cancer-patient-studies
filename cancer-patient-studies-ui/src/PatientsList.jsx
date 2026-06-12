import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";

// Initial filter values for the patients list
const initialFilters = {
  firstName: '',
  lastName: '',
  state: '',
  diagnoses: '',
  genes: '',
}

// Component for displaying a list of patients
function PatientsList() {
  const [patients, setPatients] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [filters, setFilters] = useState(initialFilters)

  // Function to update the current filter values
  const updateFilter = (event) => {
    const { name, value } = event.target
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  // Function to clear all filter values
  const clearFilters = () => {
    setFilters(initialFilters)
  }

  // Function to filter the list of patients based on the current filter values
  const filteredPatients = useMemo(() => {

    // Helper function to check if a value matches a search term
    const matches = (value, search) =>
      String(value ?? '').toLowerCase().includes(search.trim().toLowerCase())

    return patients.filter((patient) => (
      matches(patient.first_name, filters.firstName) &&
      matches(patient.last_name, filters.lastName) &&
      matches(patient.state, filters.state) &&
      matches(patient.diagnoses, filters.diagnoses) &&
      matches(patient.genes, filters.genes)
    ))
  }, [filters, patients])
  // Memo prevents unnecessary re-computation of the filtered list on every render

  // Check if any filters are currently active
  const hasFilters = Object.values(filters).some((value) => value.trim() !== '')

  // Function to load the list of patients from the API
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

  // Load the list of patients when the component mounts
  useEffect(() => {
    loadPatients()
  }, [])

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Cancer Patient Studies</h1>
          <h2>Full Patient Data</h2>
        </div>
      </header>

      <div className="summary">
        <span className="summary-value">{patients.length}</span>
        <span className="summary-label">patients loaded</span>
      </div>

      <div className="action-row">
        <Link className="button button-secondary" to="/">Back to Main Page</Link>
      </div>

      {status === 'loading' && <p className="status">Loading patient records...</p>}
      {status === 'error' && (
        <p className="status error">
          Unable to load patients from Flask: {error}
        </p>
      )}
      {status === 'ready' && (
        <section className="table-wrap">
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
              <tr className="filter-row">
                <th><button type="button" onClick={clearFilters} disabled={!hasFilters}>Clear</button></th>
                <th><input
                  name="firstName"
                  type="search"
                  value={filters.firstName}
                  onChange={updateFilter}
                  placeholder="Filter..."
                /></th>
                <th><input
                  name="lastName"
                  type="search"
                  value={filters.lastName}
                  onChange={updateFilter}
                  placeholder="Filter..."
                /></th>
                <th></th>
                <th></th>
                <th></th>
                <th><input
                  name="state"
                  type="search"
                  value={filters.state}
                  onChange={updateFilter}
                  placeholder="Filter..."
                /></th>
                <th></th>
                <th></th>
                <th><input
                  name="diagnoses"
                  type="search"
                  value={filters.diagnoses}
                  onChange={updateFilter}
                  placeholder="Filter..."
                /></th>
                <th><input
                  name="genes"
                  type="search"
                  value={filters.genes}
                  onChange={updateFilter}
                  placeholder="Filter..."
                /></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
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
                  <td>{patient.diagnoses}</td>
                  <td>{patient.genes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <p className="empty-results">No patients match the current filters.</p>
          )}
        </section>
      )}
    </main>
  )
}

export default PatientsList
