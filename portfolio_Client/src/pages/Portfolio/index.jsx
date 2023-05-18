import { useEffect } from 'react';
import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Favorite, ThumbDown } from '@mui/icons-material';
import StarRating from '../../components/StarRating';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import './style.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PortfolioPage = () => {

  const params = useParams();
  const id = params.id;

  const [portfolioDetailes, setPortfolioDetailes] = useState({});
  const [skills, setSkills] = useState([]);
  // const [votes, setVotes] = useState([]);
  const [activeButton, setActiveButton] = useState([]);
  const [date, setDate] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:3001/portfolio/${id}`)
      .then(res => {
        const detailes = res.data
        setPortfolioDetailes({ ...res.data });
        setSkills([...res.data.skills]);
        const initialVotes = res.data.skills.map(() => ({ likes: 0, dislikes: 0 }));
        // setVotes(initialVotes);
        setActiveButton([...initialVotes.map(() => null)]);
        setDate(moment(detailes.birthdate).format('MMMM Do YYYY'));
      })
  }, [id]);

  const handleLike = (index) => {
    if (activeButton[index] === 'like') {
      setActiveButton((prevActiveButtons) => {
        const updatedActiveButtons = [...prevActiveButtons];
        updatedActiveButtons[index] = null;
        return updatedActiveButtons;
      });
    } else {
      // setVotes((prevVotes) => {
      //   const updatedVotes = [...prevVotes];
      //   updatedVotes[index].likes += 1;
      //   updatedVotes[index].dislikes -= activeButton[index] === 'dislike' ? 1 : 0;
      //   return updatedVotes;
      // });
      setActiveButton((prevActiveButtons) => {
        const updatedActiveButtons = [...prevActiveButtons];
        updatedActiveButtons[index] = 'like';
        return updatedActiveButtons;
      });
    }
  };

  const handleDislike = (index) => {
    if (activeButton[index] === 'dislike') {
      setActiveButton((prevActiveButtons) => {
        const updatedActiveButtons = [...prevActiveButtons];
        updatedActiveButtons[index] = null;
        return updatedActiveButtons;
      });
    } else {
      // setVotes((prevVotes) => {
      //   const updatedVotes = [...prevVotes];
      //   updatedVotes[index].dislikes += 1;
      //   updatedVotes[index].likes -= activeButton[index] === 'like' ? 1 : 0;
      //   return updatedVotes;
      // });
      setActiveButton((prevActiveButtons) => {
        const updatedActiveButtons = [...prevActiveButtons];
        updatedActiveButtons[index] = 'dislike';
        return updatedActiveButtons;
      });
    }
  };

  return (
    <div className="portfolioBackgroundColor text-white p-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h1 className='text-center'>Portfolio</h1>
            <Card text="dark" className="rounded shadow cardBackground">
              <Card.Body>
                <Card.Title>{portfolioDetailes.firstName} {portfolioDetailes.lastName}</Card.Title>
                <Card.Text>Email: {portfolioDetailes.email}</Card.Text>
                <Card.Text>Date of Birth: {date}</Card.Text>
                <Card.Text>Gender: {portfolioDetailes.gender}</Card.Text>
                <Card.Text>Education: {portfolioDetailes.education}</Card.Text>
                <Card.Text>University: {portfolioDetailes.university}</Card.Text>
                <Card.Text>Current Position: {portfolioDetailes.currentPosition}</Card.Text>
                <Card.Text>Experience: {portfolioDetailes.experience}</Card.Text>
                <Card.Text>Location: {portfolioDetailes.location}</Card.Text>
                <Card.Text>
                  Skills:
                </Card.Text>
                <ul className="pl-4">
                  {skills.map((skill, index) => (
                    <li key={index} className="mb-4">
                      <div className='d-felx flex-row'>
                        <div>
                          <p className='mb-0'>
                            <strong>Skill:</strong> {skill.skill}
                          </p>
                          <p>
                            <strong>Description:</strong> {skill.description}
                          </p>
                        </div>
                        <StarRating />
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-primary"
                            onClick={() => handleLike(index)}
                            disabled={activeButton[index] === 'dislike'}
                            style={{ backgroundColor: activeButton[index] === 'like' ? 'green' : 'white' }}
                            className="me-2"
                          >
                            <Favorite />
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleDislike(index)}
                            disabled={activeButton[index] === 'like'}
                            style={{ backgroundColor: activeButton[index] === 'dislike' ? 'red' : 'white' }}
                          >
                            <ThumbDown />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PortfolioPage;
