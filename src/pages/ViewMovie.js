import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewMovie = () => {
  console.log("View page");

  const getParams = useParams();

  const getId = getParams.id;

  console.log(getId);

  const [movieData, setMovieData] = useState({});

  //First time, when component is rendered
  useEffect(() => {
    console.log("First time running..");
    GetMovieDetail();
  }, []);

  //Everytime when compoent is changed/updated
  //   useEffect(() => {
  //     console.log("Something was changed!");
  //     GetMovieDetail();
  //   });

  //Each time the dependencies were udpated/changed
  //   useEffect(() => {
  //     console.log("Something was changed!");
  //     GetMovieDetail();
  //   }, [movieData]);

  const GetMovieDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error occured!!");
    }
  };

  return (
    <>
      <MyNavbar></MyNavbar>
      <Container>
        <h1 className="text-info">{movieData.name}</h1>
        <br /> <br />
        <Card>
          <Card.Body>{movieData.info}</Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body> {movieData.desc}</Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            Image: <br />
            <img
              src={movieData.image}
              alt="Movie"
              style={{ height: "100px" }}
            />
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>Rating: {movieData.rating}</Card.Body>
        </Card>
        <br />
        <Link to="/">
          <Button className="bg-dark text-white">Go back</Button>
        </Link>
        <br /> <br />
      </Container>
    </>
  );
};

export default ViewMovie;
