import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import ItemModal from "@/components/item/ItemModal"
import TrashModal from "@/components/item/TrashModal"
import UserContext from "./UserContext"

const ItemContext = createContext()

export const ItemContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const [modal, setModal] = useState(null);
  const [item, setItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [locationItems, setLocationItems] = useState(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    currentUser && fetchItems();
  }, [currentUser])

  const fetchItems = async () => {
    try {
      const items = await api.get('items');
      setItems(items);
      setLoading(false);
    } catch (err) {
      setError('Failed to load squirreled items');
    }
  }

  /** @param {string} name */
  /** @param {string} description */
  /** @param {string} category */
  /** @param {string} image */
  /** @param {string} location */
  const addItem = async (payload) => {
    try {
      const item = await api.post(`items`, payload);

      setItems(items => (
        [item, ...items]
      ));
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
      ));

      setLocationItems(items => (
        items.filter(item => item._id !== itemID)
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

  const getLocationItems = (locationID) => {
    if (!locationID || !items) return;

    setLocationItems(items.filter(item =>
      item.location && item.location._id.toString() === locationID.toString()
    ))
  }

  const value = {
    items,
    search,
    setSearch,
    openModal,
    closeModal,
    addItem,
    moveItem,
    moveItems,
    trashItem,
    selectItem,
    selectedItems,
    cancelSelection,
    locationItems,
    getLocationItems,
    setLocationItems,
    error,
    loading
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