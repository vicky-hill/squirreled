import Image from 'next/image'
import squirrel from '@/public/images/squirrel.png'
import Search from '../elements/Search'

const Header = ({ }) => {

    return (
        <div className='w-full shadow-sm bg-orange-50 text-center text-[#D66330] font-bold tracking-widest py-4 px-16 mb-4 flex items-center'>
            <div id="logo" className='h-12 w-12 relative mr-2'>
                <Image src={squirrel} fill style={{ objectFit: 'contain' }} />
            </div>
            <span className='logo text-4xl'>Squirreled</span>
            <Search />
        </div>
    )
}

export default Header;
