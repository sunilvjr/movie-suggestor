import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { Container, Form, Button } from "react-bootstrap";

const AddMovie = () => {
  const movie_name_ref = useRef();
  const movie_desc_ref = useRef();
  const movie_rating_ref = useRef();

  const history = useHistory();

  const AddMovieHandler = async (e) => {
    e.preventDefault();

    console.log(movie_name_ref.current.value);

    const movieData = {
      movie_name: movie_name_ref.current.value,
      description: movie_desc_ref.current.value,
      rating: movie_rating_ref.current.value,
    };

    try {
      var repsonse = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      console.log(repsonse.data.message);
      history.replace("/");
    } catch (ex) {
      console.log(ex.response.data.errors[0].message);
      if (ex.response) {
        alert(ex.response.data.errors[0].message);
      } else {
        alert("Unknown error occured! Please try again after few minutes");
      }
    }
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <br />
        <h3>Add Movie</h3>
        <br />
        <form onSubmit={AddMovieHandler}>
          <Form.Group className="mb-3" controlId="formBasicMovieName">
            <Form.Label>Movie name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Movie name"
              ref={movie_name_ref}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMovieDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" ref={movie_desc_ref} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMovieRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" ref={movie_rating_ref} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Add Movie
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddMovie;
