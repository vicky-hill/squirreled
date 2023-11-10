import React, { useEffect, useState, useContext } from 'react'
import UserContext from '@/context/UserContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import Page from '@/components/layout/Page'
import Form, { TextInput } from '@/components/form/Form'
import * as Yup from 'yup'

const validation = Yup.object({
    email: Yup.string().required('Please enter your email'),
    password: Yup.string().required('Please enter your password')
})

const Login = ({ }) => {
    const router = useRouter();

    const { currentUser, checkUserSession } = useContext(UserContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "123456"
    })

    useEffect(() => {
        currentUser && router.push('/account');
    }, [currentUser]);

    useEffect(() => {
        error && (
            setTimeout(() => {
                setError(null);
            }, 3000)
        )
    }, [error])

    const onSubmit = async () => {
        try {
            setLoading(true);
            const { email, password } = values;
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem('token', user.accessToken);

            checkUserSession(user.accessToken);
            router.push('/account');

            setValues({ email: '', password: '' });
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <Page>
            <Container content="extra-narrow fit-screen" center>
                <Form values={values} setValues={setValues} onSubmit={onSubmit} validation={validation}>
                    <h1 className='form__title'>Login</h1>
                    <p className='form__text'>Please enter your email and password:</p>

                    <TextInput name="email" />
                    <TextInput name="password" type="password" />

                    <Button size="big" loading={loading} type="submit" round block className="mt-2">Login</Button>

                    <p className='form__err'>{error && error}</p>
                    <p className='form__text mt-5'>Don't have an account? <Link href="/signup">Sign up</Link></p>
                </Form>
            </Container>
        </Page>
    )
}


export default Login
