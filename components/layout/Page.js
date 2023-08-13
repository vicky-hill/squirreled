import Head from 'next/head'
import Header from './Header';

const Page = ({ children, title = 'Squirreled' }) => {
    
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />
            { children }
        </div>
    )
}

export default Page;