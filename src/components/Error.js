import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1 className='display-1 my-5 text-center'>This page doesn't exist</h1>
                <Link to='/'><Button variant='dark'>Back Home</Button></Link>
            </div>
        </>
    )
}

export default Error
