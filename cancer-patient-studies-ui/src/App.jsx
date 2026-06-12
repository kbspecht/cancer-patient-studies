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
        <Route path="/" element={<MainPage />} />
        <Route path="/patient/:id" element={<PatientDetailWrapper />} />
        <Route path='/patients' element={<PatientsList />} />
        <Route path="*" element={
          <main className="app-shell">
            <header className="page-header">
              <div>
                <h1>Invalid URL</h1>
                <Link className="button button-secondary" to="/">Back to Main Page</Link>
              </div>
            </header>
          </main>
        } /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
