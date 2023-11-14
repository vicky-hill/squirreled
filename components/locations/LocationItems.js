import { Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image';

const LocationItems = ({ path, items }) => {

    return (
        <div className='ml-10'>
            <h1 className='text-xl font-black mb-1'>{path}</h1>
            <p className='mb-7 text-zinc-400'>{items[0].location}</p>
            <Droppable droppableId="items">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} id="items" className='h-[65vh] overflow-scroll pr-16'>
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
                                            <p className='text-zinc-400 text-xs'>{item._id}</p>
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
