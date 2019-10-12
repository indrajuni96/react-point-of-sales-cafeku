import React, { Component } from "react"
import convertRupiah from "rupiah-format"
import {
  Col,
  Row,
  Badge,
  Button,
  Media,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form
} from "reactstrap"
// Import Icons & Images
import iconFood from '../Assets/Images/iconFood.png'

class CartsSide extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <>
        <p className="textCart" style={{ "marginTop": "20px" }}>Cart <Badge color="primary" pill style={{ "height": "30px" }}>{this.props.cart.length}</Badge></p>
        <Row style={{ "maxHeight": "370px" }} className="overflow-auto">
          {this.props.cart.length > 0 ? (
            this.props.cart.map((item, key) => {
              return (
                <Col sm="12">
                  <Media>
                    <Media object src={`http://localhost:4000/${item.image}`} alt="Coffe Latte" className="mr-2 bgMedia" />
                    <Media body>
                      <Media heading>
                        {item.name}
                      </Media>
                      <p><b>Rp. {item.price}</b></p>
                      <ButtonGroup>
                        <Button className="buttonMinPlus" onClick={() => { this.props.reduceQty(key) }} >-</Button>
                        <Button className="buttonNumber">{item.quantity}</Button>
                        <Button className="buttonMinPlus" onClick={() => this.props.addQty(key)}>+</Button>
                      </ButtonGroup>
                    </Media>
                  </Media>
                </Col>
              )
            })
          ) : (
              <>
                <img src={iconFood} alt="iconFood" className="iconFood" />
                <p className="textCart3">Your cart is empty</p>
                <p className="textCart2">Please add some items from the menu</p>
              </>
            )}
        </Row>
        <Row style={{ "marginTop": "80px" }}>
          <Col sm="12">
            <Row>
              <Col sm="6">
                <h5><b>Total:</b></h5>
              </Col>
              <Col sm="6">
                <h5><b>Rp.{this.props.totalPrice}*</b></h5>
              </Col>
            </Row>
          </Col>
          <Col sm="12">
            <p style={{ "fontSize": "16px" }}>*Belum termasuk ppn</p>
          </Col>
          <Col sm="12" className="mb-2">
            <Button style={{ "backgroundColor": "#57CAD5", "width": "100%", "borderColor": "#57CAD5" }} onClick={this.props.toggleCheckout}>
              Checkout
                        </Button>
            <Button className="mt-2" style={{ "backgroundColor": "#F24F8A", "width": "100%", "borderColor": "#F24F8A" }} onClick={() => this.props.cancelCart()}>
              Cancel
                        </Button>
          </Col>
        </Row>
        <Modal isOpen={this.props.modalCheckout} toggle={this.props.toggleCheckout} className={this.props.className} id="modalAdd">
          <ModalHeader toggle={this.props.toggleCheckout} style={{ "borderBottom": "#fff" }}>
            <p className="mt-3">Checkout <span style={{ "marginLeft": "124px" }}></span> </p>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.props.handleCheckout}>
              <Input type="hidden" name="user" value="indra" />

              {this.props.cart.map((item) => {
                return (
                  <Row>
                    <Col sm="8">
                      <h4>{item.name} {item.quantity}x</h4>
                    </Col>
                    <Col sm="4">
                      <h4>Rp.{item.price}</h4>
                    </Col>
                    <Input type="hidden" value={item.name} name="orders" />
                    <Input type="hidden" value={item.quantity} name="quantity" />
                    <Input type="hidden" value={item.idProduct} name="id" />
                  </Row>
                )
              })}
              <Input type="hidden" value={this.props.totalPrice} name="amount" />
              <Row className="mb-3">
                <Col sm="6"></Col>
                <Col sm="6"><h4>Total:<span className=""></span>{convertRupiah.convert(this.props.totalPrice)}</h4></Col>
              </Row>
              <Row>
                <Col sm="12" className="mb-2">
                  <Button className="buttonCancel"><h4>Checkout</h4></Button>
                </Col>
                <Col><h5 style={{ textAlign: 'center' }}>Or</h5></Col>
                <Col sm="12">
                  <Button className="buttonAdd" onClick={this.props.toggleCheckout}><h4>Cancel</h4></Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter style={{ "borderTop": "#fff" }}>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default CartsSide