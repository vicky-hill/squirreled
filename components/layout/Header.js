import Image from 'next/image'
import squirrel from '@/public/images/squirrel.png'

const Header = ({ }) => {

    return (
        <div className='w-full bg-orange-300 text-center text-white font-bold tracking-widest py-4 px-16 mb-4 flex items-center'>
            <div id="logo" className='h-12 w-12 relative mr-2'>
                <Image src={squirrel} fill style={{ objectFit: 'contain' }} />
            </div>
            <span className='logo text-4xl'>Squirreled</span>

        </div>
    )
}

export default Header;
