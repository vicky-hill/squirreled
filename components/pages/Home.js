import { useState, useEffect } from 'react'
import Page from '../layout/Page'
import Button from '../elements/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import api from '@/utils/api'

const Home = ({ products }) => {
  const [result, setResult] = useState(null);
  const [items, setItems] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
          const items = await api.get('items');
          setItems(items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Page>
      <div className='container text-center mt-24 pt-10 px-10 lg:px-20 flex justify-between flex-wrap'>
        {
          items && items.map(item => (
            <div id="item-card" className='mb-10  w-44 text-left' key={item._id}>
              <div id="item-card__image" className='h-44 w-44 relative rounded-md overflow-hidden'>
                <Image fill style={{ objectFit: 'contain'}} src={item.image} />
              </div>
              <p className='mt-2 font-medium'>{item.name}</p>
              <p className='text-sm'>{item.location}</p>
            </div>
          ))
        }
      </div>

      <Button onClick={() => router.push('/add')} floating><i className="fas fa-plus"></i></Button>
    </Page>
  )
}

export default Home;
