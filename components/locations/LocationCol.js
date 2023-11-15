import { Droppable } from 'react-beautiful-dnd'
import classNames from 'classnames'


const LocationColumn = ({ locations, handleLocationClick, active, hover }) => {

    const getClasses = id => classNames('locations__item', {
        'locations__item--active': active === id,
        'locations__item--hover': hover === id
    });
    
    return (
        <div className="locations__col">
            {
                locations.length ? locations.map(({ _id, name, storage_areas, path }) => (
                    <Droppable droppableId={_id}  key={_id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                id="locations"
                                className={getClasses(_id)}
                                onClick={() => handleLocationClick(_id, storage_areas, path)}
                            >
                                {name}
                            </div>
                        )}
                    </Droppable>
                )) : <p>No storage areas here yet</p>
            }
        </div>
    )
}

export default LocationColumn;
