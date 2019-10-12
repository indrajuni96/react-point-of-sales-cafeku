import React, { Component } from 'react'
import axios from 'axios'
// Import Style.css Native
import '../Assets/Css/Style.css'
// Import Components Bootstrap
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
// Import Icons & Images
import iconFork from '../Assets/Images/fork.png'
import iconClipboard from '../Assets/Images/clipboard.png'
import iconAdd from '../Assets/Images/add.png'
import iconLogout from '../Assets/Images/logout.png'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddProduct = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    // fetch("http://localhost:4000/api/v1/products/", {
    //   method: "POST",
    //   body: data
    // })
    axios.post('http://localhost:4000/api/v1/products/', data)
    window.location.reload();
  }

  render() {
    return (
      <>
        <Col sm="1" style={{ "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.25)", "minHeight": "560px" }}>
          <Row>
            <Col className="mt-5 ml-1">
              <a href="/dashboard" className="buttonIcons ml-3">
                <img src={iconFork} alt="iconFork" />
              </a>
            </Col>
            <Col className="mt-5 ">
              <a href="/history" className="buttonIcons ml-3">
                <img src={iconClipboard} alt="iconClipboard" />
              </a>
            </Col>
            <Col className="mt-5 ">
              <Button className="buttonIcons ml-1" onClick={this.toggle}>
                <img src={iconAdd} alt="iconAdd" />
              </Button>
            </Col>
            <Col className="mt-5 ">
              <a href="/logout" className="buttonIcons ml-3" >
                <img src={iconLogout} alt="iconAdd" width="56px" />
              </a>
            </Col>
          </Row>
        </Col>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} id="modalAdd">
          <ModalHeader toggle={this.toggle} style={{ "borderBottom": "0px solid #fff" }}>
            <p className="textModalHeaderAdd">Add Item</p>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleAddProduct}>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Name</p></Label>
                <Col sm={9} >
                  <Input type="text" name="name" id="Name" className="mt-2 inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Description</p></Label>
                <Col sm={9} >
                  <Input type="text" name="description" id="description" className="mt-2 inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Image</p></Label>
                <Col sm={9} >
                  <Input type="file" name="image" id="image" className="inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Category</p></Label>
                <Col sm={5} >
                  <Input type="select" name="idCategori" id="Name" className="inputAddProduct">
                    <option value="1">Makanan</option>
                    <option value="2">Minuman</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Price</p></Label>
                <Col sm={6} >
                  <Input type="text" name="price" id="price" className="inputAddProduct" />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Quantity</p></Label>
                <Col sm={6} >
                  <Input type="text" name="quantity" id="quantity" className="inputAddProduct" />
                </Col>
              </FormGroup>
              <Button className="buttonCancel w100px" style={{ marginLeft: '260px' }} onClick={this.toggle} >Cancel</Button>{' '}
              <Button className="buttonAdd w100px">Add</Button>
            </Form>
          </ModalBody>
          <ModalFooter style={{ "borderTop": "0px solid #fff" }}>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Navigation