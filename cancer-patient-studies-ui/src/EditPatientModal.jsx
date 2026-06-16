import Modal from "react-modal"
import {useState} from "react"

function EditPatientModal(props) {
    const [editedPatient, setEditedPatient] = useState(props.patient);

  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} appElement={document.getElementById("root")}>
      <div className="modal-content">
        <h2>Edit Patient {props.patient?.patient_id}</h2>
        <form>
          <div>
            <label>
                First Name:
                <input type="text" name="firstName" value={editedPatient?.first_name} onChange={(e) => setEditedPatient({...editedPatient, first_name: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
                Last Name:
                <input type="text" name="lastName" value={editedPatient?.last_name} onChange={(e) => setEditedPatient({...editedPatient, last_name: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
                Gender:
                <input type="text" name="gender" value={editedPatient?.gender} onChange={(e) => setEditedPatient({...editedPatient, gender: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Street Address:
              <input type="text" name="streetAddress" value={editedPatient?.street_address} onChange={(e) => setEditedPatient({...editedPatient, street_address: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              City:
              <input type="text" name="city" value={editedPatient?.city} onChange={(e) => setEditedPatient({...editedPatient, city: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              State:
              <input type="text" name="state" value={editedPatient?.state} onChange={(e) => setEditedPatient({...editedPatient, state: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Zip Code:
              <input type="text" name="zipCode" value={editedPatient?.zip_code} onChange={(e) => setEditedPatient({...editedPatient, zip_code: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input type="text" name="phone" value={editedPatient?.phone} onChange={(e) => setEditedPatient({...editedPatient, phone: e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Comment:
              <textarea name="comment" value={editedPatient?.comment || ''} onChange={(e) => setEditedPatient({...editedPatient, comment: e.target.value})}></textarea>
            </label>
          </div>
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            props.onSave(editedPatient);
          }}>Save</button>
          <button type="button" onClick={props.onClose}>Cancel</button>
        </form>
      </div>
    </Modal>
  );
}

export default EditPatientModal;
