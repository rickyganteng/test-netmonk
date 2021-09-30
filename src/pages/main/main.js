import React, { Component } from "react";
import { Card, Container, Col, Row, Form } from "react-bootstrap";
import { connect } from "react-redux"
import { getListUser, getPostUser, getComentPostsById } from "../../redux/action/counter"
import styles from "./main.module.css"
import Cards from "../../components/listUser/listUser"
import Cardcomment from "../../components/comment/comment"

class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      postUser: [],
      post: [],
      Idd: "",
    }
  }
  componentDidMount() {
    this.getData();

  }


  getData = () => {

    this.props.getListUser().then((res) => {
      this.setState({ listUser: res.action.payload.data });
      console.log(res.action.payload.data);

    });

    this.props.getComentPostsById().then((res) => {
      this.setState({ post: res.action.payload.data });
      console.log(res.action.payload.data);

    });

  }
  postData = () => {
    const { form } = this.state;

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .postData(formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Submit Data Succes !",
            show: true,
          },
          () => {
            this.getData();
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
            this.getData();
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
  updateData = () => {
    const { form, id } = this.state;

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    this.props
      .updateData(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            this.getData();
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
      .updateData(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            show: true,
            isUpdate: false,
          },
          () => {
            this.getData();
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
  deleteData = (id) => {
    this.props
      .deleteData(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Posts Deleted !",
            show: true,
          },
          () => {
            this.getData();
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
  deleteComment = (id) => {
    this.props
      .deleteComment(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Comment Deleted !",
            show: true,
          },
          () => {
            this.getData();
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
  handleRoom = (item) => {
    this.props.getPostUser(item.id).then((res) => {
      this.setState({ postUser: res.action.payload.data });
    });
  };


  handleSelectUser = (event, item) => {
    console.log(event);
    this.setState({
      Idd: event.split("_")[2],

    });
    console.log(event.split("_")[2]);
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
    return (
      <>
        <Container className="mt-4">

          {this.state.listUser.length > 0 ? (
            this.state.listUser.map((item, index) => {
              return (
                <Col
                  key={index}
                >
                  <Row>

                    <Col xs={3}>
                      <Cards className="mr-2" data={item} />

                    </Col>

                  </Row>
                </Col>
              );
            })) : (
            <p className={styles.notFound}>Data Not Found !!!</p>
          )};

          {this.state.postUser.length > 0 ? (
            this.state.postUser.map((item, index) => {
              return (
                <Card xs={2}
                  key={index}
                  className={styles.contactList}
                >
                  <Row>

                    <Col xs={3}>
                      <Cardcomment className="mr-2" dataa={item} />

                    </Col>
                  </Row>
                </Card>
              );
            })) : (
            <p className={styles.notFound}>Data Not Found !!!</p>
          )};
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { getListUser, getPostUser, getComentPostsById };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(main);

