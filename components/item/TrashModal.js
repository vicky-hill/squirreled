import { useContext } from "react"
import Modal from "../elements/Modal"
import ItemContext from "@/context/ItemContext"

const TrashModal = ({ modal, setModal, item }) => {
    const { trashItem } = useContext(ItemContext);

    return item && (
        <Modal title="Trash Item" modal={modal} setModal={setModal} data={item} yes={() => trashItem(item._id)}>
            <div className="flex items-center flex-col">
                { `Put ${item.name} in trash?` }
            </div>
        </Modal>
    )
}

export default TrashModal;
