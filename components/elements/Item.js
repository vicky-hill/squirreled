import { useContext } from 'react'
import Image from 'next/image'
import { ArrowRightCircle } from 'react-feather'
import ItemContext from '@/context/ItemContext'


const Item = ({ item }) => {

    const { openItemModal } = useContext(ItemContext);

    return (
        <>
            <div id="item-card" className='mb-10  w-44 text-left relative' key={item._id}>
                <div id="item-card__image" className='group h-44 w-44 relative rounded-md overflow-hidden'>
                    <Image fill style={{ objectFit: 'cover' }} src={item.image} />
                    <ArrowRightCircle
                        className='hidden group-hover:block transition-all absolute bottom-2 right-2 cursor-pointer'
                        color="white"
                        onClick={() => openItemModal(item)}
                    />
                </div>
                <p className='mt-2 font-medium text-sm'>{item.name}</p>
                <p className='text-xs text-zinc-500'>{item.location?.description}</p>
            </div>
        </>
    )
}

export default Item;
