import Modal from 'react-modal'

function DeletePatientModal(props) {
  return (
    <Modal id={props.id} isOpen={props.isOpen} onRequestClose={props.onClose} appElement={document.getElementById('root')}>
      <div className="modal">
        <h2>Delete Patient {props.id}</h2>
        <p>Are you sure you want to delete this patient?</p>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          props.onSave(props.id);
        }}>Delete</button>
        <button type="button" onClick={props.onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default DeletePatientModal
