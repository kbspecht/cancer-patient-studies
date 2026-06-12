import './App.css';
import {BrowserRouter, Routes, Route, Link, useParams} from 'react-router-dom'
import MainPage from './MainPage'
import PatientDetail from './PatientDetail'
import PatientsList from './PatientsList'

// Wrapper component for the PatientDetail component to extract the patient ID from the URL
function PatientDetailWrapper() {
  const { id } = useParams();
  return <PatientDetail patientId={id} />;
}

// Main App component for the Cancer Patient Studies front end application
function App() {
  return (
    // React Router setup for the Cancer Patient Studies front end application
    <BrowserRouter>
      <Routes>
        // main page route
        <Route path="/" element={<MainPage />} />

        // route for displaying a specific patient's details
        <Route path="/patient/:id" element={<PatientDetailWrapper />} />

        // route for displaying the list of all patients
        <Route path='/patients' element={<PatientsList />} />

        // route for handling invalid URLs
        <Route path="*" element={
          <div>
            <h1>Invalid URL</h1>
            <Link className="button button-secondary" to="/">Back to Main Page</Link>
          </div>
        } /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
