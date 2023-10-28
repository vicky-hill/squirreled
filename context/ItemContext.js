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
  const [selectedItems, setSelectedItems] = useState([]);

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

  /** @param {array} ids */
  /** @param {string} locationID */
  const moveItems = async (ids, locationID) => {
    try {
      const updatedItems = await api.put(`items/move`, { location: locationID, ids });
      const updatedItemIDs = updatedItems.map(item => item._id);

      setItems(items => (
        items.map(item =>
          updatedItemIDs.includes(item._id) ?
            updatedItems.find(updatedItem => updatedItem._id === item._id) :
            item
        )
      ));

      search && setSearch(items => (
        items.filter(item => (
          !updatedItemIDs.includes(item._id)
        ))
      ));

      setSelectedItems([]);
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

  /** @param {string} itemID */
  const selectItem = (itemID) => {
    selectedItems.includes(itemID) ? (
      setSelectedItems(items => items.filter(item => item !== itemID))
    ) : (
      setSelectedItems(items => [...items, itemID])
    )
  }

  const cancelSelection = () => {
    setSelectedItems([]);
  }

  const value = {
    items,
    search,
    setSearch,
    openModal,
    closeModal,
    moveItem,
    moveItems,
    trashItem,
    selectItem,
    selectedItems,
    cancelSelection
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