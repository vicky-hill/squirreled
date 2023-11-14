import Image from 'next/image'
import squirrel from '@/public/images/squirrel.png'
import Search from '../elements/Search'
import { useContext } from 'react'
import UserContext from '@/context/UserContext'

const Header = ({ }) => {

    const { currentUser, logout } = useContext(UserContext);
    const orange = 'text-[#D66330]'

    return (
        <div className='w-full shadow-sm bg-zinc-800 text-center text-white font-bold tracking-widest py-4 px-16 flex items-center'>
            <div id="logo" className='h-12 w-12 relative mr-2'>
                <Image
                    alt="logo"
                    src={squirrel}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <span className='logo text-4xl'>Squirreled</span>
            <Search />
            {
                currentUser && (
                    <span className='ml-auto cursor-pointer' onClick={logout}>
                        Logout
                    </span>
                )
            }
        </div>
    )
}

export default Header;
