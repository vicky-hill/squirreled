import { useContext, useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'
import Page from '@/components/layout/Page'
import LocationContext from '@/context/LocationContext'
import LocationColumn from '@/components/locations/LocationCol'
import LocationItems from '@/components/locations/LocationItems'
import ItemContext from '@/context/ItemContext'

const locations = ({ }) => {
    const [mainLocations, setMainLocations] = useState({
        locations: [],
        active: null
    });

    const [storageAreas1, setStorageAreas1] = useState({
        locations: [],
        active: null
    });

    const [storageAreas2, setStorageAreas2] = useState({
        locations: [],
        active: null
    });

    const [locationID, setLocationID] = useState(null);
    const [hover, setHover] = useState(null);

    const { locations } = useContext(LocationContext);
    const { items, locationItems, getLocationItems, setLocationItems, moveItem, loading: itemsLoading } = useContext(ItemContext);

    useEffect(() => {
        !itemsLoading && setLocationsAndStorageAreas(locations);
    }, [locations, itemsLoading]);

    const setLocationsAndStorageAreas = (locations) => {
        if (locations && items) {
            setMainLocations({
                locations,
                active: locations[0]._id
            });

            if (locations[0].storage_areas.length) {
                setStorageAreas1({
                    locations: locations[0].storage_areas,
                    active: locations[0].storage_areas[0]._id
                });

                if (locations[0].storage_areas[0].storage_areas.length) {
                    setStorageAreas2({
                        locations: locations[0].storage_areas[0].storage_areas,
                        active: locations[0].storage_areas[0].storage_areas[0]._id
                    });

                    if (locations[0].storage_areas[0].storage_areas[0].items.length) {
                        getLocationItems(locations[0].storage_areas[0].storage_areas[0]._id)
                        setLocationID(locations[0].storage_areas[0].storage_areas[0]._id);
                    }
                }
            }
        }

    }

    /**
     * Activate a location
     * @param {number} level - 1, 2 3
     * @param {number} index
     * @param {string} id - _id of selected location
     */
    const handleLocationClick = (level, id, storage_areas) => {
        const setState = {
            [1]: setMainLocations,
            [2]: setStorageAreas1,
            [3]: setStorageAreas2
        }

        // Set active location
        setState[level](state => ({
            ...state,
            active: id
        }));

        // Main location was set, then set storage areas 1 and 2
        if (level === 1) {
            const storage1Locations = storage_areas;
            const activeStorage1ID = storage_areas[0]._id;

            const storage2Locations = storage_areas[0].storage_areas;
            const activeStorage2ID = storage_areas[0].storage_areas[0]?._id;

            setState[2](state => ({
                ...state,
                locations: storage1Locations,
                active: activeStorage1ID
            }));

            if (storage2Locations.length) {
                setState[3]({
                    locations: storage2Locations,
                    active: activeStorage2ID
                });

                getLocationItems(storage2Locations[0]._id);
                setLocationID(storage2Locations[0]._id);

            } else {
                setState[3]({
                    locations: [],
                    active: null
                });
            }
        }

        // Set storage areas 2
        if (level === 2) {
            setState[3](state => ({
                ...state,
                locations: storage_areas
            }));
        }

        if (level === 3) {
            setLocationID(id);
            getLocationItems(id);
        }
    }

    const onDragEnd = async (results) => {
        const { draggableId, destination } = results;

        if (destination) {
            moveItem(draggableId, destination.droppableId);
            setLocationItems (items => items.filter(item => item._id !== draggableId));
            setHover(null);
        }
    }

    const onDragUpdate = (results) => {
        if (results?.destination?.droppableId !== locationID) {
            setHover(results?.destination?.droppableId)
        }
    }

    if (!locations) {
        return <Page protect>
            <div className='container text-center mt-24 pt-10 px-10 lg:px-20 flex justify-between flex-wrap'>
                loading
            </div>
        </Page>
    }

    return (
        <Page>
            <div className='flex'>
                <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>

                    {/* Main Locations */}
                    <LocationColumn
                        locations={mainLocations.locations}
                        handleLocationClick={(id, storage) => handleLocationClick(1, id, storage)}
                        active={mainLocations.active}
                        hover={hover}
                    />

                    {/* Storage Areas 1 */}
                    <LocationColumn
                        locations={storageAreas1.locations}
                        handleLocationClick={(id, storage) => handleLocationClick(2, id, storage)}
                        active={storageAreas1.active}
                        hover={hover}
                    />

                    {/* Storage Areas 2 */}
                    <LocationColumn
                        locations={storageAreas2.locations}
                        handleLocationClick={(id, storage) => handleLocationClick(3, id, storage)}
                        active={storageAreas2.active}
                        hover={hover}
                    />

                    {
                        locationItems && <LocationItems items={locationItems} />
                    }
                </DragDropContext>
            </div>
        </Page>
    )
}

export const getServerSideProps = async ({ query }) => {
    resetServerContext()
    return { props: {} }
}

export default locations;
