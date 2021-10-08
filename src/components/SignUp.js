import { useRef, useState } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return seterror("Passwords don't match")
        }

        try {
            seterror('')
            setloading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
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
                        <h2 className="text-center mb-4">Sign Up</h2>
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

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Re-enter Password"
                                    required ref={confirmPasswordRef} />
                            </Form.Group>


                            <Button disabled={loading} variant="primary" type="submit" className="w-100 my-3">
                                Submit
                            </Button>

                        </Form>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to='/login'>Log In</Link>
                </div>
            </Container>
        </>
    )
}

export default SignUp
