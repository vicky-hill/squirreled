import Page from '../layout/Page'
import Button from '../elements/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'
import ItemContext from '@/context/ItemContext'
import getLocation from '@/utils/getLocation'

const Home = ({ }) => {
  const router = useRouter();
  const { items, search } = useContext(ItemContext);

  if (!items) {
    return <Page>
      <div className='container text-center mt-24 pt-10 px-10 lg:px-20 flex justify-between flex-wrap'>
        loading
      </div>
    </Page>
  }

  return (
    <Page>
      <div className='container text-center mt-24 pt-10 px-10 lg:px-20 flex space-x-3 flex-wrap'>
        {
          search ? search.map(item => (
            <div id="item-card" className='mb-10  w-44 text-left' key={item._id}>
              <div id="item-card__image" className='h-44 w-44 relative rounded-md overflow-hidden'>
                <Image fill style={{ objectFit: 'contain' }} src={item.image} />
              </div>
              <p className='mt-2 font-medium'>{item.name}</p>
              <p className='text-xs text-zinc-500'>{getLocation(item.location)}</p>
            </div>
          )) : items ? items.map(item => (
            <div id="item-card" className='mb-10  w-44 text-left' key={item._id}>
              <div id="item-card__image" className='h-44 w-44 relative rounded-md overflow-hidden'>
                <Image fill style={{ objectFit: 'contain' }} src={item.image} />
              </div>
              <p className='mt-2 font-medium'>{item.name}</p>
              <p className='text-xs text-zinc-500'>{getLocation(item.location)}</p>
            </div>
          )) : <p>No items found</p>
        }
      </div>

      <Button onClick={() => router.push('/add')} floating><i className="fas fa-plus"></i></Button>
    </Page>
  )
}

export default Home;
