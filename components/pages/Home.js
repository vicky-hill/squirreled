import Page from '../layout/Page'
import { useContext } from 'react'
import ItemContext from '@/context/ItemContext'
import Item from '../item/Item'
import AddItem from '../add/AddItem'
import { X, ArrowRightCircle } from 'react-feather'

const Home = ({ }) => {
  const { items, search, selectedItems, cancelSelection, openModal, error } = useContext(ItemContext);

  if (!items && !error) {
    return <Page protect>
      <div className='container text-center mt-24 pt-10 px-10 lg:px-20 flex justify-between flex-wrap'>
        loading
      </div>
    </Page>
  }

  return (
    <Page protect>
      <div className='container mt-10 pt-10 px-10'>
        {
          selectedItems.length ? (
            <>
              <div className='cursor-pointer inline-block mr-7 mb-8' onClick={cancelSelection}>
                <X className='inline-block mb-1 mr-1 ' size={18} />
                <span className='mb-5'>Cancel Selection</span>
              </div>

              <div className='cursor-pointer inline-block mb-8' onClick={openModal}>
                <ArrowRightCircle className='inline-block mb-1 mr-1 ' size={18} />
                <span className='mb-5'>Move Items</span>
              </div>
            </>
          ) : null
        }

        <div className='text-center flex flex-wrap gap-7'>
          {
            search ? search.map(item => (
              <Item key={item._id} item={item} />
            )) : items ? items.map(item => (
              <Item key={item._id} item={item} />
            )) : <p>No items found</p>
          }
        </div>
      </div>


      <AddItem />
    </Page>
  )
}

export default Home;
