import { useContext, useState } from "react"
import Modal from "../elements/Modal"
import LocationContext from "@/context/LocationContext"
import ItemContext from "@/context/ItemContext"
import classNames from "classnames"

const ItemModal = ({ modal, setModal, item }) => {
    const [selected, setSelected] = useState(null);

    const { locations } = useContext(LocationContext);
    const { moveItem } = useContext(ItemContext);

    const saveChanges = () => {
        selected && moveItem(item._id, selected);
        setSelected(null);
    }

    const getClasses = locationID => classNames('mb-4 text cursor-pointer rounded-md px-3', {
        'hover:bg-slate-50': selected !== locationID,
        'bg-slate-200': selected === locationID
    });

    return (
        <Modal title="Move Item" modal={modal} setModal={setModal} data={item} saveChanges={saveChanges}>
            <div className="flex items-center flex-col">
                {
                    locations && locations.map(location => (
                        <div onClick={() => setSelected(location._id)} className={getClasses(location._id)}>
                            <span className="mr-3 font-semibold">{location.name}</span>
                            <span className="text-sm text-gray-500">{location.description}</span>
                        </div>
                    ))
                }
            </div>
        </Modal>
    )
}

export default ItemModal;
