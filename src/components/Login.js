import { useRef, useState } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            seterror('')
            setloading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")

        } catch (error) {
            seterror(`${error.code}. Try again..`)

        }
        setloading(false)

    }

    return (
        <>
            <Container style={{ maxWidth: '400px' }}>
                <Card className="mt-5">
                    <Card.Body>
                        {error && <Alert variant='danger' >{error}</Alert>}
                        <h2 className="text-center mb-4">Log In</h2>
                        <hr />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" required ref={emailRef} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    required ref={passwordRef} />
                            </Form.Group>

                            <Button disabled={loading} variant="primary" type="submit" className="w-100 my-3">
                                Login
                            </Button>

                        </Form>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Need an account? <Link to='/signup'> Sign up</Link>
                </div>
            </Container>
        </>
    )
}

export default Login
