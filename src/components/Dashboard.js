import { useState } from "react"
import { useAuth } from '../contexts/AuthContext'
import { Button, Card, Container, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

const Dashboard = () => {
    const [error, seterror] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        seterror("")

        try {
            await logout()
            history.push("/login")
        } catch {
            seterror("Failed to log out")
        }

    }
    return (
        <>
            <Container style={{ maxWidth: '400px' }}>
                <Card className="mt-5">
                    <Card.Body>
                        {error && <Alert variant='danger' >{error}</Alert>}
                        <h2 className="text-center mb-4">Profile</h2>
                        <hr />

                        <strong>Email: </strong>{currentUser.email}
                        <Link to='/update-profile' className='btn btn-primary w-100 text-center mt-4'>Update Profile</Link>

                    </Card.Body>

                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </Container>
        </>
    )
}

export default Dashboard
