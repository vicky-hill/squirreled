import { useContext } from 'react'
import Image from 'next/image'
import { ArrowRightCircle, Trash, Circle, CheckCircle } from 'react-feather'
import ItemContext from '@/context/ItemContext'


const Item = ({ item }) => {

    const { openModal, selectItem, selectedItems } = useContext(ItemContext);

    return (
        <>
            <div id="item-card" className='mb-10  w-44 text-left relative' key={item._id}>
                <div id="item-card__image" className='group h-44 w-44 relative rounded-md overflow-hidden'>
                    <Image
                        alt="item image"
                        fill
                        style={{ objectFit: 'cover' }}
                        src={item.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {
                        selectedItems.includes(item._id) ? (
                            <CheckCircle
                                className={`${!selectedItems.length ? 'hidden' : ''} group-hover:block transition-all absolute top-2 left-2 cursor-pointer`}
                                size={20}
                                color="white"
                                onClick={() => selectItem(item._id)}
                            />
                        ) : (
                            <Circle
                                className={`${!selectedItems.length ? 'hidden' : ''} group-hover:block transition-all absolute top-2 left-2 cursor-pointer`}
                                size={20}
                                color="white"
                                onClick={() => selectItem(item._id)}
                            />
                        )
                    }

                    <ArrowRightCircle
                        className='hidden group-hover:block transition-all absolute bottom-2 right-2 cursor-pointer'
                        size={20}
                        color="white"
                        onClick={() => openModal(item, 'move')}
                        title="Move item to different location"
                    />
                    <Trash
                        className='hidden group-hover:block transition-all absolute bottom-2 right-9 cursor-pointer'
                        size={20}
                        color="white"
                        onClick={() => openModal(item, 'trash')}
                        title="Throw item in trash"
                    />
                </div>
                <p className='mt-2 font-medium text-sm'>{item.name}</p>
                <p className='text-xs text-zinc-500'>{item.location?.path}</p>
            </div>
        </>
    )
}

export default Item;
