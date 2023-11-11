import { useContext, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'
import Page from '@/components/layout/Page'
import LocationContext from '@/context/LocationContext'
import Container from '@/components/layout/Container'
import LocationColumn from '@/components/locations/LocationColumn'


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

    const { locations } = useContext(LocationContext);

    useEffect(() => {
        if (locations) {
            setMainLocations({
                locations
            })
        }
    }, [locations]);

    /**
     * Activate a location
     * @param {number} level - 1, 2 3
     * @param {number} index
     * @param {string} id - _id of selected location
     */
    const handleLocationClick = (level, id, storageAreas) => {
        const setState = {
            [1]: setMainLocations,
            [2]: setStorageAreas1,
            [3]: setStorageAreas2
        }

        setState[level](state => ({
            ...state,
            active: id
        }));

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

        if (level === 2) {
            setState[3](state => ({
                ...state,
                locations: storageAreas
            }))
        }
    }

    const onDragEnd = (results) => {
        console.log(results)
    }

    const onDragUpdate = (results) => {
        console.log(results)
        setHover(results?.destination?.droppableId)
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
                        handleLocationClick={(id, storage) => handleLocationClick(1, id, storage)}
                        active={mainLocations.active}
                        hover={mainLocations.hover}
                    />

                    {/* Storage Areas 1 */}
                    { storageAreas1.locations.length ? (
                        <LocationColumn
                            locations={storageAreas1.locations}
                            handleLocationClick={(id, storage) => handleLocationClick(2, id, storage)}
                            active={storageAreas1.active}
                            hover={storageAreas1.hover}
                        />
                    ) : null }

                    {/* Storage Areas 2 */}
                    { storageAreas2.locations.length ? (
                        <LocationColumn
                            locations={storageAreas2.locations}
                            handleLocationClick={(index, id) => handleLocationClick(3, index, id)}
                            active={storageAreas2.active}
                            hover={storageAreas2.hover}
                        />
                    ) : null }




                    {/* <Droppable droppableId="ROOT2">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} id="items" className="bg-yellow-200 w-96 h-28 ml-10">

                                    {items.map((item, i) => (
                                        <Draggable draggableId={item.id} index={i} key={i}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {item.name}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable> */}

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
