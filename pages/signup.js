import React, { useEffect, useState, useContext } from 'react'
import UserContext from '@/context/UserContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
    password: Yup.string().required('Please enter your password'),
    password: Yup.string().required('Please confirm your password'),
})

const Signup = ({ }) => {
    const router = useRouter();

    const { currentUser, register, checkUserSession } = useContext(UserContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "123456",
        password2: "123456"
    })

    useEffect(() => {
        currentUser && router.push('/');
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
            if (values.password !== values.password2) return setError("Passwords don't match");

            setLoading(true);
            const { email, password } = values;
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            const payload = { firebaseID: user.uid, email }
            register(payload);

            localStorage.setItem('token', user.accessToken);

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
                    <h1 className='form__title'>Sign Up</h1>
            
                    <TextInput name="email" />
                    <TextInput name="password" type="password" />
                    <TextInput name="password2" type="password" />

                    <Button size="big" loading={loading} type="submit" round block className="mt-2">Sign up</Button>

                    <p className='form__err'>{error && error}</p>
                    <p className='form__text mt-5'>Already have an account? <Link href="/login">Login</Link></p>
                </Form>
            </Container>
        </Page>
    )
}


export default Signup
