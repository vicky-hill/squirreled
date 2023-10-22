import { createContext, useState, useEffect } from "react"
import api from "@/utils/api"

const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
  const [locations, setLocations] = useState(null);
  
  useEffect(() => {
    fetchLocations();
  }, [])

  const fetchLocations = async () => {
    try {
      const locations = await api.get('locations');
      setLocations(locations);
    } catch (err) {
      console.log(err);
    }
  }


  const value = {
    locations
  }

  return (
    <>
      <LocationContext.Provider value={value}>
        {children}
      </LocationContext.Provider>
    </>
  )
}

export default LocationContext;