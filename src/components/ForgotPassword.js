import { useRef, useState } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const [message, setmessage] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            seterror('')
            setloading(true)
            await resetPassword(emailRef.current.value)
            setmessage("Check your mail for further instructions")

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
                        {message && <Alert variant='success' >{message}</Alert>}
                        <h2 className="text-center mb-4">Recover Password</h2>
                        <hr />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" required ref={emailRef} />
                            </Form.Group>

                            <Button disabled={loading} variant="primary" type="submit" className="w-100 my-3">
                                Reset Password
                            </Button>

                        </Form>
                        <div className="w-100 text-center mt-2">
                            <Link to='/login'>Login</Link>
                        </div>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Need an account? <Link to='/signup'> Sign up</Link>
                </div>
            </Container>
        </>
    )
}

export default ForgotPassword
