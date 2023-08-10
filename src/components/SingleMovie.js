import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleMovie = (props) => {
  return (
    <>
      <Col key={props.data.id}>
        <Card style={{ width: "18rem", minHeight: "600px" }}>
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ height: "250px" }}
          />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/view_movie/${props.data.id}`}>
              <Button variant="dark">View detail</Button>
            </Link>
          </Card.Body>
        </Card>
        {/* <div>
          <Link to={`/view_movie/${props.data.id}`}>
            <b>{props.data.name}</b>
          </Link>
          <br />
          <img src={props.data.image} alt="Movie" style={{ height: "100px" }} />
          <br />
          <b>Info</b>: {props.data.info}
          <br />
          <b>Rating</b>: {props.data.rating ? props.data.rating : 0}
          <br /> <br />
        </div> */}
      </Col>
    </>
  );
};

export default SingleMovie;
