import Modal from 'react-modal';
import { useState } from 'react';

function AddPatientModal(props) {
    const [newPatient, setNewPatient] = useState({
        patient_id: '',
        first_name: '',
        last_name: '',
        gender: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        phone: ''
    });

    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onClose} appElement={document.getElementById('root')}>
            <div className="modal-content">
                <h2>Add Patient</h2>
                <form>
                    <div>
                        <label>Patient ID:</label>
                        <input
                            type="text"
                            placeholder="Patient ID"
                            value={newPatient.patient_id}
                            onChange={(e) => setNewPatient({...newPatient, patient_id: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={newPatient.first_name}
                            onChange={(e) => setNewPatient({...newPatient, first_name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={newPatient.last_name}
                            onChange={(e) => setNewPatient({...newPatient, last_name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <input
                            type="text"
                            placeholder="Gender"
                            value={newPatient.gender}
                            onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Street Address:</label>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={newPatient.street_address}
                            onChange={(e) => setNewPatient({...newPatient, street_address: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input
                            type="text"
                            placeholder="City"
                            value={newPatient.city}
                            onChange={(e) => setNewPatient({...newPatient, city: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>State:</label>
                        <input
                            type="text"
                            placeholder="State"
                            value={newPatient.state}
                            onChange={(e) => setNewPatient({...newPatient, state: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Zip Code:</label>
                        <input
                            type="text"
                            placeholder="Zip Code"
                            value={newPatient.zip_code}
                            onChange={(e) => setNewPatient({...newPatient, zip_code: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={newPatient.phone}
                            onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                        />
                    </div>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault();
                        props.onSave(newPatient);
                    }}>Add Patient</button>
                    <button type="button" onClick={props.onClose}>Cancel</button>
                </form>
            </div>
        </Modal>
    );
}

export default AddPatientModal;
