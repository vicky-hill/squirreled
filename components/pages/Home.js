import Page from '../layout/Page'
import Button from '../elements/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'
import ItemContext from '@/context/ItemContext'
import Item from '../elements/Item'

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
      <div className='container text-center mt-10 pt-10 px-10 flex flex-wrap gap-7'>
        {
          search ? search.map(item => (
            <Item item={item} />
          )) : items ? items.map(item => (
            <Item item={item} />
          )) : <p>No items found</p>
        }
      </div>

      <Button onClick={() => router.push('/add')} floating><i className="fas fa-plus"></i></Button>
    </Page>
  )
}

export default Home;
