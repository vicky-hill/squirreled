import { useContext, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'
import Page from '@/components/layout/Page'
import LocationContext from '@/context/LocationContext'
import Container from '@/components/layout/Container'
import LocationColumn from '@/components/locations/LocationCol'
import LocationItems from '@/components/locations/LocationItems'

const locations = ({ }) => {
    const [mainLocations, setMainLocations] = useState({
        locations: [],
        active: null,
        hover: null
    });

    const [storageAreas1, setStorageAreas1] = useState({
        locations: [],
        active: null,
        hover: null
    });

    const [storageAreas2, setStorageAreas2] = useState({
        locations: [],
        active: null,
        hover: null
    });

    const [locationItems, setLocationItems] = useState(null);
    const [locationPath, setLocationPath] = useState(null);

    const { locations } = useContext(LocationContext);

    useEffect(() => {
        setLocationsAndStorageAreas(locations);
    }, [locations]);

    const setLocationsAndStorageAreas = (locations) => {
        if (locations) {
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
                        setLocationItems(locations[0].storage_areas[0].storage_areas[0].items);
                        setLocationPath(locations[0].storage_areas[0].storage_areas[0].path);
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
    const handleLocationClick = (level, id, storageAreas, items, path) => {
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

        // Set storage areas 1
        if (level === 1) {
            setState[2](state => ({
                ...state,
                locations: storageAreas
            }));

            setState[3]({
                locations: [],
                active: null,
                hover: null
            });
        }

        // Set storage areas 2
        if (level === 2) {
            setState[3](state => ({
                ...state,
                locations: storageAreas
            }))
        }

        // Set Location items 
        if (items) {
            setLocationItems(items);
            setLocationPath(path);
        } else {
            setLocationItems(null);
            setLocationPath(null);
        }
    }

    const onDragEnd = (results) => {
        console.log(results)
    }

    const onDragUpdate = (results) => {
        console.log(results)
        // setHover(results?.destination?.droppableId)
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
            <Container className='flex'>
                <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>

                    {/* Main Locations */}
                    <LocationColumn
                        locations={mainLocations.locations}
                        handleLocationClick={(id, storage, items, path) => handleLocationClick(1, id, storage, items, path)}
                        active={mainLocations.active}
                        hover={mainLocations.hover}
                    />

                    {/* Storage Areas 1 */}
                    {storageAreas1.locations.length ? (
                        <LocationColumn
                            locations={storageAreas1.locations}
                            handleLocationClick={(id, storage, items, path) => handleLocationClick(2, id, storage, items, path)}
                            active={storageAreas1.active}
                            hover={storageAreas1.hover}
                        />
                    ) : null}

                    {/* Storage Areas 2 */}
                    {storageAreas2.locations.length ? (
                        <LocationColumn
                            locations={storageAreas2.locations}
                            handleLocationClick={(id, storage, items, path) => handleLocationClick(3, id, storage, items, path)}
                            active={storageAreas2.active}
                            hover={storageAreas2.hover}
                        />
                    ) : null}

                    {
                        locationItems && <LocationItems path={locationPath} items={locationItems} />
                    }
                </DragDropContext>
            </Container>
        </Page>
    )
}

export const getServerSideProps = async ({ query }) => {
    resetServerContext()
    return { props: {} }
}

export default locations;
