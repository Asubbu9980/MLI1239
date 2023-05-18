import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [portfolios, setPortFolios] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/portfolio")
      .then(res => {
        const portfolios = res.data.data.portfolios
        setPortFolios([...portfolios])
      }
      )
  }, [])

  const goToProfile = (id) => {
    navigate(`/portfolio/${id}`)
  }
  return (
    <div className='bg-light p-5'>
      <Container>
        <h1 className='text-center'>Portfolios</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {portfolios.map((portfolio) => (
            <Card key={portfolio._id} className="m-2 shadow" style={{ width: '300px' }} >
              <Card.Body className='d-flex flex-column justify-content-between'>
                <div>
                  <Card.Title>{portfolio.firstName} {portfolio.lastName}</Card.Title>
                  <Card.Text>Current Position: {portfolio.currentPosition}</Card.Text>
                  <Card.Text>Experience: {portfolio.experience}</Card.Text>
                  <Card.Text>
                    Skills:
                  </Card.Text>
                  <ul className="pl-4 mt-0">
                    {portfolio.skills.map((skill, index) => (
                      <li key={index}>{skill.skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Button variant="primary" className="mt-3" onClick={() => goToProfile(portfolio._id)}>
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>

  );
};

export default Home;
