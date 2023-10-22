import { createContext, useState, useEffect } from "react"
import api from "@/utils/api"
import ItemModal from "@/components/item/ItemModal"
import TrashModal from "@/components/item/TrashModal"

const ItemContext = createContext()

export const ItemContextProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState(null);
  const [modal, setModal] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      const items = await api.get('items');
      setItems(items);
    } catch (err) {
      console.log(err);
    }
  }

  /** @param {string} itemID */
  /** @param {string} locationID */
  const moveItem = async (itemID, locationID) => {
    try {
      const updatedItem = await api.put(`items/${itemID}/move`, { location: locationID });

      setItems(items => (
        items.map(item => item._id === itemID ? updatedItem : item)
      ))
    } catch (err) {
      console.log(err);
    }
  }

  /** @param {string} itemID */
  const trashItem = async (itemID) => {
    try {
      await api.put(`items/${itemID}/trash`);

      setItems(items => (
        items.filter(item => item._id !== itemID)
      ))
    } catch (err) {
      console.log(err);
    }
  }

  /** @param {object} item */
  /** @param {string} type - move || trash */
  const openModal = (item, type) => {
    setModal(type ? type : 'move');
    setItem(item);
  }

  const closeModal = () => {
    setModal(false);
    setItem(null);
  }


  const value = {
    items,
    search,
    setSearch,
    openModal,
    closeModal,
    moveItem,
    trashItem
  }

  return (
    <>
      <ItemContext.Provider value={value}>
        {children}

        <ItemModal
          modal={modal === 'move'}
          setModal={setModal}
          item={item}
        />

        <TrashModal
          modal={modal === 'trash'}
          setModal={setModal}
          item={item}
        />

      </ItemContext.Provider>
    </>
  )
}

export default ItemContext;