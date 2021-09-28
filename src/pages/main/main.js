import React, { Component } from "react";
// import axiosApiIntances from "../../../utils/axios";
// import { connect } from "react-redux";
// import ReactPaginate from "react-paginate";
import { Card, Container, Col, Row, DropdownButton, Dropdown, Form } from "react-bootstrap";
import { connect } from "react-redux"
import { getListUser, getPostUser } from "../../redux/action/counter"
import styles from "./main.module.css"


class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      listUser: [],
      postUser: [],
      nameVal: "Selected",
    }
  }
  componentDidMount() {
    this.getData();

  }

  getData = () => {
    // const { page, limit, sortBy, search } = this.state;
    // this.props.getAllLaporPaket(page, limit, sortBy, search);
    this.props.getListUser().then((res) => {
      this.setState({ listUser: res.action.payload.data });
      console.log(res.action.payload.data);

    });
    this.props.getPostUser().then((res) => {
      this.setState({ postUser: res.action.payload.data });
      console.log(res.action.payload.data);

    });
  };
  handleSelectUser = (event) => {
    console.log(event);
    this.setState({
      nameVal: event.split("_")[0],
      Id: event.split("_")[1],
      form: {
        ...this.state.form,
        movieId: event.split("_")[1],
      }
    });
    console.log(event.split("_")[0]);
    // console.log(event.split("-")[1]);
  };

  render() {
    const { userId, nameVal } = this.state
    console.log('props', this.props);
    console.log('user', this.state.listUser);
    return (
      <>
        <Container className="mt-5">
          <p>tol</p>
          <div className={styles.border}>
            <Form>
              <Form.Group as={Row}>
                <Col xs={6}>
                  <p className={styles.textleft}>Name User List </p>
                  <DropdownButton
                    className={`${styles.dropDown} mb-2 text-right`}
                    // name="movieId"
                    // value={movieId}
                    variant="secondary"
                    title={nameVal}
                    id="dropdown-menu-align-right"
                    onSelect={this.handleSelectUser}
                  >
                    {this.state.listUser.length > 0 ? (
                      this.state.listUser.map((item, index) => {
                        // console.log(item.movie_id);
                        return (
                          <div className="p-3 shadow" key={index}>
                            <Dropdown.Item
                              className={styles.semi}
                              eventKey={`${item.name}_${item.username}`}
                            // onChange={(event) => this.changeTextForm(event)}

                            >
                              {item.name}
                            </Dropdown.Item>
                          </div>
                        );
                      })
                    ) : (
                      <p className={styles.notFound}>Movie Not Found !!!</p>
                    )}

                  </DropdownButton>
                </Col>

              </Form.Group>
            </Form>
          </div>
          {/* <Col >
            <Row ><h1>Hadus Purwantus</h1></Row>
            <Row ><h1>tol</h1></Row>
            <Row><h1>tolo</h1></Row>
          </Col> */}
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { getListUser, getPostUser };

const mapStateToProps = (state) => ({
  movie: state,

});

export default connect(mapStateToProps, mapDispatchToProps)(main);

