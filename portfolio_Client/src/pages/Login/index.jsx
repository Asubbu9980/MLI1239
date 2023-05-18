import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const login = () => {
        navigate('/home')
    }

    return (
        <Container>
            <Row>
                <Col className='mt-5  d-flex flex-column justify-content-center align-items-center'>
                    <h1>please click below to login</h1>
                    <button className='btn btn-primary' onClick={login}>Login</button>
                </Col>
            </Row>
        </Container>
    )
}

export default Login