import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import Header from './Header'
import UserContext from '@/context/UserContext'
import { useRouter } from 'next/router'

const Page = ({ children, title = 'Squirreled', protect }) => {
    const router = useRouter();

    const { currentUser, loading } = useContext(UserContext);

    useEffect(() => {
        if(!loading && !currentUser && protect) {
          router.push('/login')
        }
      }, [currentUser, loading]);

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />
            { protect && !currentUser ? <p>loading</p> : children }
        </div>
    )
}

export default Page;