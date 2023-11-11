import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import UserContext from "./UserContext";

const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
  const [locations, setLocations] = useState(null);

  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    currentUser && fetchLocations();
  }, [currentUser])

  const fetchLocations = async () => {
    try {
      const locations = await api.get('locations');
      setLocations(locations);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(locations)

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