import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styles from "./listUser.module.css";

class Cards extends Component {
  handleRoom = (id) => {
    this.props.getPostUser(id).then((res) => {
      this.setState({ postUser: res.action.payload.data });

    });
  };
  render() {
    // const {
    //   id,
    //   name
    // } = this.props.data;
    return (
      <>
        <Card >

          <Card.Body className="text-center">
            <Card.Text className={styles.category}></Card.Text>
            <Button
              className={styles.btMoon}
              variant="outline-primary"
              onClick={() => this.handleRoom}
            >
              <div className={styles.btCnt}>Details</div>
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Cards);
