import Head from 'next/head'
import Header from './Header';

const Page = ({ children, title = 'Nail Polish' }) => {
    
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