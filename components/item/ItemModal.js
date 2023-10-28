import { useContext, useState } from "react"
import Modal from "../elements/Modal"
import LocationContext from "@/context/LocationContext"
import ItemContext from "@/context/ItemContext"
import classNames from "classnames"

const ItemModal = ({ modal, setModal, item }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const { locations } = useContext(LocationContext);
    const { moveItem, moveItems, selectedItems } = useContext(ItemContext);

    const saveChanges = () => {
        if (selectedLocation) {
            if (selectedItems.length) {
                moveItems(selectedItems, selectedLocation);
            } else {
                moveItem(item._id, selectedLocation);
            }

            setSelectedLocation(null);
            setModal(false);
        }
    }

    const getClasses = locationID => classNames('mb-4 text cursor-pointer rounded-md px-3', {
        'hover:bg-slate-50': selectedLocation !== locationID,
        'bg-slate-200': selectedLocation === locationID
    });

    const onClose = () => {
        setSelectedLocation(null);
    }

    return (
        <Modal title={selectedItems.length ? `Move ${selectedItems.length} Items` : 'Move Item'} modal={modal} setModal={setModal} data={item} onSave={saveChanges} onClose={onClose}>
            <div className="flex items-center flex-col">
                {
                    locations && locations.map(location => (
                        <div onClick={() => setSelectedLocation(location._id)} className={getClasses(location._id)}>
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
