import React, { Component } from "react";
import { Card, Container, Col, Row, Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux"
import {
  getListUser,
  getPostUser,
  getComentPostsById,
  postData,
  deleteData,
  deleteComment,
  updateData,
  updateComment,
  postComment
} from "../../redux/action/counter"
import styles from "./main.module.css"
import Table from 'react-bootstrap/Table'

// import Cards from "../../components/listUser/listUser"
// import Cardcomment from "../../components/comment/comment"

class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      postUser: [],
      post: [],
      Idd: 0,
      paketNameVal: "Selected Paket Name",
      isShowView1: false,
      form: {
        title: "",
        body: "",
        Komentar: "",
        userId: 1,
      }
    }
  }
  componentDidMount() {
    const { Idd } = this.state
    this.getUserList();
    this.handleRoom(Idd);

  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ Idd: this.state.Idd }, () => {
        this.handleRoom(this.state.Idd);
      });
    }

  }
  getUserList = () => {
    this.props.getListUser().then((res) => {
      this.setState({ listUser: res.action.payload.data });
      console.log(res.action.payload.data);

    });
  }
  handleRoom = (item) => {
    console.log(item.id);
    let { Idd } = this.state
    Idd = item.id
    this.props.getPostUser(Idd).then((res) => {
      this.setState({ postUser: res.action.payload.data });
      console.log(res.action.payload.data);
    });
  };

  getComment = (item) => {
    console.log(item);
    this.props.getComentPostsById(item.id).then((res) => {
      this.setState({ post: res.action.payload.data });
      console.log(res.action.payload.data);

    });
  }
  handleView1 = () => {
    let { isShowView1 } = this.state;
    isShowView1 ? (isShowView1 = false) : (isShowView1 = true);
    this.setState({
      isShowView1: isShowView1,
    });
  };

  postData = () => {
    const { form } = this.state;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    console.log(form);
    this.props
      .postData(formData)
      .then((res) => {
        console.log(res);
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            this.getUserList();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Submit Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  postComment = () => {
    const { form } = this.state;

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postComment(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            this.getUserList();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Submit Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  changeTextForm = (event) => {
    console.log(event.target);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  updateData = (item) => {
    const { form } = this.state;

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    this.props
      .updateData(item.id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            this.getUserList();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  updateComment = () => {
    const { form, id } = this.state;

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    this.props
      .updateComment(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            this.getUserList();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  deleteData = (item) => {
    this.props
      .deleteData(item.id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Data Deleted !",
            show: true,
          },
          () => {
            this.getUserList();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  deleteComment = (item) => {
    this.props
      .deleteComment(item.id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Comment Deleted !",
            show: true,
          },
          () => {
            this.getUserList();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  handleSelect = (event) => {
    console.log(event);
    this.setState({

      form: {
        ...this.state.form,
        userId: event.split("_")[0],
      }
    });
  };


  changeTextForm = (event) => {
    console.log(event.target);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    const { postUser, paketNameVal } = this.state
    const { title, body, Komentar, userId } = this.state.form
    console.log(this.state);
    return (
      <>
        <Container className="mt-4">
          <Row>
            <Col xs={3}>
              {this.state.listUser.length > 0 ? (
                this.state.listUser.map((item, index) => {
                  return (
                    <Col
                      key={index}
                    >

                      {/* <Cards className="mr-2" data={item} /> */}
                      <Card >

                        <Card.Body className="text-center">
                          <Card.Text className={styles.category}>{item.name}</Card.Text>
                          <Button
                            className={styles.btMoon}
                            variant="outline-primary"
                            onClick={() => this.handleRoom(item)}
                          >
                            <div className={styles.btCnt}>Details</div>
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>


                  );
                })) : (
                <p className={styles.notFound}>Data Not Found !!!</p>
              )}
            </Col>
            {/* {postUser.body} */}

            <Form.Label>Name Paket</Form.Label>
            <Col >
              <DropdownButton
                className={`${styles.dropDown} mb-2 text-center`}
                name="userId"
                value={userId}
                variant="secondary"
                title={paketNameVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                {this.state.listUser.length > 0 ? (
                  this.state.listUser.map((item, index) => {
                    return (
                      <div className="p-3 shadow" key={index}>
                        <Dropdown.Item
                          className={styles.semi}
                          eventKey={`${item.id}_${item.username}`}
                          onChange={(event) => this.changeTextForm(event)}

                        >
                          {item.name}
                        </Dropdown.Item>
                      </div>
                    );
                  })
                ) : (
                  <p className={styles.notFound}>Data Not Found !!!</p>
                )}

              </DropdownButton>

              <Form>
                <Form.Group>
                  <Form.Label>Tulis Posting..</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tulis Title.."
                    name="title"
                    value={title}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Tulis Body.."
                    name="body"
                    value={body}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Form.Group>
                <Col xs={0}>
                  <p><Button
                    onClick={() => this.postData()}
                  >Posting
                  </Button></p>

                </Col>
              </Form>

              {postUser.length >= 0 ? (
                postUser.map((item, index) => {
                  return (
                    // <p>{item.body}</p>
                    <Col key={index}>
                      <Table striped bordered hover>
                        <thead >
                          <tr>
                            {/* <th>#</th> */}

                            <th>
                              <p>{item.body}</p>
                              <Row xs={7}>
                                <Col xs={3}>
                                  <p
                                    className={styles.leftPurple}
                                    onClick={() => this.getComment(item)}
                                  >
                                    Komentar
                                  </p>

                                </Col>

                                <Col xs={3}>
                                  <p><Button
                                    onClick={() => this.updateData(item)}>Edit</Button></p>
                                </Col>
                                <Col xs={0}>
                                  <p><Button
                                    onClick={() => this.deleteData(item)}
                                  >Hapus</Button></p>
                                </Col>
                              </Row>

                            </th>


                          </tr>
                        </thead>
                      </Table>
                    </Col>

                  )
                })) : (
                <p className={styles.notFound}>Data Not Found !!</p>
              )}
            </Col>
            <Col>
              <div>
                <Row >
                  <Col >
                    {this.state.post.map((item, index) => {
                      return (
                        <Row>
                          <Col key={index}>
                            <p>{item.name}</p>
                          </Col>
                          <Col>
                            <Col xs={3}>
                              <p><Button
                                onClick={() => this.updateComment(item)}>Edit</Button></p>
                            </Col>
                            <Col xs={0}>
                              <p><Button
                                onClick={() => this.deleteComment(item)}
                              >Hapus</Button></p>
                            </Col>
                          </Col>

                        </Row>


                      );
                    })}
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Form>
                      <Form.Group>
                        <Form.Label>Tulis Komentar..</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Tulis Komentar.."
                          name="Komentar"
                          value={Komentar}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Form.Group>
                      <Col xs={0}>
                        <p><Button
                          onClick={() => this.postComment()}>Tambah <p>komentar</p> </Button></p>
                      </Col>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container >
      </>
    );
  }
}

const mapDispatchToProps = { getListUser, postComment, getPostUser, getComentPostsById, postData, deleteData, deleteComment, updateData, updateComment };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(main);

