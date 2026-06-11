import './App.css';
import {BrowserRouter, Routes, Route, Link, useParams} from 'react-router-dom'
import MainPage from './MainPage'
import PatientDetail from './PatientDetail'
import PatientsList from './PatientsList'

function PatientDetailWrapper() {
  const { id } = useParams();
  return <PatientDetail patientId={id} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/patient/:id" element={<PatientDetailWrapper />} />
        <Route path='/patients' element={<PatientsList />} />
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
