import { createContext, useState, useEffect } from "react"
import api from "@/utils/api"
import ItemModal from "@/components/item/ItemModal"

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

  const openItemModal = (item) => {
    setModal(true);
    setItem(item);
  }

  const closeItemModal = () => {
    setModal(false);
    setItem(null);
  }


  const value = {
    items,
    search,
    setSearch,
    openItemModal,
    closeItemModal
  }

  return (
    <>
      <ItemContext.Provider value={value}>
        {children}
      </ItemContext.Provider>

      <ItemModal
        modal={modal}
        setModal={setModal}
        item={item}
      />
    </>
  )
}

export default ItemContext;