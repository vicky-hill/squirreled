import { Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image';

const LocationItems = ({ items }) => {

    if (!items.length) {
        return
    }

    return (
        <div className='ml-10'>
            <h1 className='text-xl font-semibold mb-1'>{items[0].location.path}</h1>
            <p className='mb-7 text-zinc-400'>{items[0].location._id}</p>
            <Droppable droppableId="items">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} id="items" className='h-[60vh] overflow-scroll pr-32'>
                        {items.map((item, i) => (
                            <Draggable draggableId={item._id} index={i} key={i}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='flex items-center mb-3 bg-white rounded-sm'>
                                        <div id="item-card__image" className='group h-10 w-10 relative rounded-md overflow-hidden mr-3 border border-zinc-500'>
                                            <Image
                                                alt="item image"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                src={item.image}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div>
                                            <p className='text-sm'>{item.name}</p>
                                            <p className='text-zinc-400 text-xs font-[300]'>{item._id}</p>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default LocationItems;
