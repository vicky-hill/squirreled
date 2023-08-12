import { createContext, useState, useEffect } from "react"
import api from "@/utils/api"

const ItemContext = createContext()

export const ItemContextProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const [search, setSearch] = useState(null);

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
    

    const value = {
        items,
        search,
        setSearch
    }

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContext;