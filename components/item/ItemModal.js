import Modal from "../elements/Modal";

const ItemModal = ({ modal, setModal, item }) => {

    return (
        <Modal title="Move Item" modal={modal} setModal={setModal} data={item}>
      
        </Modal>
    )
}

export default ItemModal;
