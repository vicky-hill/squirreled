import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'


const NavigationBar = ({ }) => {
    const router = useRouter();

    const getClasses = name => classNames('navigation__bar-link', {
        'navigation__bar-link--active': router.pathname.includes(name)
    });

    return (
        <div className='navigation__bar'>
            <Link href="/items" className={getClasses('items')}>
                Items
            </Link>
            <Link href="/locations" className={getClasses('locations')}>
                Locations
            </Link>
        </div>
    )
}

export default NavigationBar;
