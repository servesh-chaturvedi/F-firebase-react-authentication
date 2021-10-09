import { useRef, useState } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { currentUser, update_email, update_password } = useAuth()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return seterror("Passwords don't match")
        }

        const promises = []

        setloading(true)
        seterror('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(update_email(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(update_password(passwordRef.current.value))
        }

        Promise.all(promises).then(() => history.push('/')).catch((error) => { seterror(`${error.code}. Try again..`) }).finally(() => { setloading(false) })
    }


    return (
        <>
            <Container style={{ maxWidth: '400px' }}>
                <Card className="mt-5">
                    <Card.Body>
                        {error && <Alert variant='danger' >{error}</Alert>}
                        <h2 className="text-center mb-4">Update Profile</h2>
                        <hr />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" required defaultValue={currentUser.email} ref={emailRef} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Leave blank to keep the same"
                                    ref={passwordRef} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Leave blank to keep the same"
                                    ref={confirmPasswordRef} />
                            </Form.Group>


                            <Button disabled={loading} variant="primary" type="submit" className="w-100 my-3">
                                Update
                            </Button>

                        </Form>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Don't want to change? <Link to='/'>Cancel</Link>
                </div>
            </Container>
        </>
    )
}

export default UpdateProfile
