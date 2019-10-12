import React, { Component } from "react"
import convertRupiah from "rupiah-format"
import {
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap'

class ManagementItems extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <>
        {
          this.props.data.map((item, index) => {
            return (
              <Col sm="4" className="mb-3" key={item.idProduct}>
                <Card className="cardRadius ">
                  <CardImg top className="CardImages" src={`http://localhost:4000/${item.image}`} alt="Card image cap" />
                  <CardBody className="cardBodyItems">
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>
                      <Row>
                        <Col sm="8">
                          <b style={{ "fontSize": "19px" }}>{convertRupiah.convert(item.price)}</b>
                        </Col>
                        <Col sm="3" className="ml-2">
                        </Col>
                        <Col sm="12" className="mt-1">
                          <Button color="primary" className="buttonAddCart mr-1" onClick={(data) => this.props.addCart(item)}>Add</Button>
                          <Button color="warning" className="buttonAddCart" onClick={() => this.props.toggleModalEdit(item)}>Update</Button>
                          <Button color="danger" className="ml-1 buttonAddCart" onClick={() => this.props.handleDelete(item.idProduct)}>Delete</Button>
                        </Col>
                      </Row>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </>
    )
  }
}

export default ManagementItems