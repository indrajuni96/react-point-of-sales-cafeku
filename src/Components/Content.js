import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { getHome } from "../public/redux/Actions/Home";
// Import Master.css Native
import '../Assets/Css/Style.css'
// Import Components Bootstrap
import {
  Container,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
// Import Components
import Header from './Header'
import Navigation from './Navigation'
import ManagementItems from './ManagementItems'
import CartsSide from './CartsSide'

class Content extends Component {
  constructor(props) {
    super()
    this.state = {
      data: [],
      search: '',
      byProduct: 'idProduct',
      sort: 'asc',
      page: '1',
      totalPages: '',
      cart: [],
      cartTotal: 0,
      order: [],
      totalPrice: 0,
      modalCheckout: false,
      modalEdit: false,
      dataIdSelected: null
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.addCart = this.addCart.bind(this)
    this.cancelCart = this.cancelCart.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  inputOnChangehandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleCheckout() {
    this.setState(prevState => ({
      modalCheckout: !prevState.modalCheckout
    }));
  }

  toggleModalEdit(data) {
    this.setState({
      modalEdit: !this.state.modalEdit,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      quantity: data.quantity,
      dataIdSelected: data.idProduct
    })
  }

  async componentDidMount() {
    await this.getAll(
      this.state.search,
      this.state.byProduct,
      this.state.sort,
      this.state.page)
  }

  getAll = async (search, byProduct, sort, page) => {
    const result = await this.props.dispatch(
      getHome({
        search: this.state.search,
        sort: this.state.sort,
        order: this.state.byProduct,
        page: this.state.page
      })
    );

    this.setState({
      data: result.value.data.data,
      totalPages: result.value.data.total_pages
    });

    console.log(result.value.data.total_pages)

    // let querySearch, queryByProduct, queryPage

    // if (search) querySearch = `&searchByName=${search}`
    // else querySearch = ""

    // if (byProduct && sort) queryByProduct = `?byProduct=${byProduct}&sort=${sort}`
    // else queryByProduct = ""

    // if (page) queryPage = `&pages=${page}`
    // else queryPage = ""

    // await axios.get(`http://localhost:4000/api/v1/products${queryByProduct}${querySearch}${queryPage}`)
    //   .then(result => {
    //     this.setState({
    //       data: result.data.data,
    //       totalPages: result.data.total_pages
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  getSearch = (e) => {
    e.preventDefault()
    let search = e.target.value
    this.setState({
      search
    })
    this.getAll(search, this.state.byProduct, this.state.sort)
  }

  getByProduct = (e) => {
    e.preventDefault()
    let byProduct = e.target.value
    this.setState({
      byProduct
    })
    this.getAll(this.state.search, byProduct, this.state.sort)
  }

  getSort = (e) => {
    e.preventDefault()
    let sort = e.target.value
    this.setState({
      sort
    })
    this.getAll(this.state.search, this.state.byProduct, sort)
  }

  getPages = (page) => {
    // e.preventDefault()
    // let pages = e.target.value
    this.setState({
      page
    })
    this.getAll(this.state.search, this.state.byProduct, this.state.sort, page)
  }

  Paginations = () => {
    const totalPages = this.state.totalPages
    var pageButton = []
    for (let i = 1; i <= totalPages; i++) {
      pageButton.push(i)
    }
    return (
      <Pagination size="sm" aria-label="Page navigation example">
        {
          pageButton.map((page, key) => (
            <PaginationItem className={page === this.state.page ? 'active' : ''} key={key} >
              <PaginationLink style={{ "height": "38px", "paddingTop": "8px" }} value="1" onClick={() => this.getPages(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
      </Pagination>
    )
  }

  addCart(data) {
    const { idProduct, name, price, image, quantity } = data;
    let cart = { idProduct, name, price, image, quantity: 1, stokPrice: price, stokQuantity: quantity };
    const exists = this.state.cart.find(({ idProduct }) => idProduct === data.idProduct);
    if (exists) {
      window.alert("Product is already in the cart!");
    } else {
      data.quantity = 1;
      const totalPrice = this.state.totalPrice + data.price;
      const carts = [...this.state.cart, cart];
      this.setState({ cart: carts, totalPrice });
    }
  }

  async addQty(data) {
    let cart = this.state.cart[data];
    cart.quantity += 1;
    cart.price += cart.stokPrice;
    const totalPrice = this.state.totalPrice + cart.stokPrice;
    this.setState({ carts: [cart], totalPrice });
  }

  async reduceQty(data) {
    let cart = this.state.cart[data];
    let allcart = this.state.cart;
    const totalPrice = this.state.totalPrice - cart.stokPrice;
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      cart.price -= cart.stokPrice;
      this.setState({
        carts: [cart],
        totalPrice
      });
    } else {
      allcart.splice(data, 1);
      this.setState({ cart: allcart, totalPrice });
    }
  }

  cancelCart() {
    this.setState(prevState => ({
      cart: [],
      totalPrice: 0
    }));
  }

  handlerUpdateProduct = (event) => {
    event.preventDefault();
    const dataku = new FormData(event.target)
    axios.put(`http://localhost:4000/api/v1/products/${this.state.dataIdSelected}`, dataku)
    window.location.reload();
  }

  handleDelete(idProduct) {
    if (window.confirm("Are you sure want to delete this product? " + idProduct)) {
      axios.delete("http://localhost:4000/api/v1/products/" + idProduct)
      window.location.reload();
    }
  }

  handleCheckout = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    axios.post('http://localhost:4000/api/v1/products/addHistory', data)
    window.location.reload();
  }

  render() {
    return (
      <>
        <Container fluid={true}>
          {/* HEADER */}
          <Header />
          {/* END HEADER */}
          {/* CONTENT */}
          <Row className="contentCafeku">
            <Navigation />
            <Col sm="8" style={{ "background": "rgba(190, 195, 202, 0.3)" }}>
              <Row className="mt-3">
                <Col sm="3">
                  <Input type="text" placeholder="Search.." value={this.state.search} onChange={this.getSearch} />
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  <Input type="select" onChange={this.getByProduct}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </Input>
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  <Input type="select" onChange={this.getSort}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </Input>
                </Col>
                <Col sm="3" style={{ "marginLeft": "-25px" }}>
                  {this.Paginations()}
                </Col>
              </Row>
              {/* Show data to CardView */}
              <Row className="mt-3">
                <ManagementItems
                  data={this.state.data}
                  addCart={this.addCart}
                  handleDelete={this.handleDelete}
                  toggleModalEdit={this.toggleModalEdit}
                />
              </Row>
            </Col>
            {/* Sidebar Right add to Cart */}
            <Col sm="3" style={{ "border": "1px solid #CECECE" }}>
              <CartsSide
                cart={this.state.cart}
                modalCheckout={this.state.modalCheckout}
                addQty={data => {
                  this.addQty(data)
                }}
                reduceQty={data => {
                  this.reduceQty(data)
                }}
                handleCheckout={(data) => {
                  this.handleCheckout(data)
                }}
                cancelCart={this.cancelCart}
                totalPrice={this.state.totalPrice}
                toggleCheckout={this.toggleCheckout}
              />
            </Col>
          </Row>
          {/* END CONTENT */}
        </Container >
        {/* ### MODAL UPDATE PRODUCT### */}
        <Modal isOpen={this.state.modalEdit} toggle={this.toggleModalEdit} className={this.props.className} id="modalAdd">
          <ModalHeader toggle={this.toggleModalEdit} style={{ "borderBottom": "0px solid #fff" }}>
            <p className="textModalHeaderAdd">Edit Item</p>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handlerUpdateProduct}>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Name</p></Label>
                <Col sm={9} >
                  <Input type="text" name="name" value={this.state.name} id="Name" className="mt-2 inputAddProduct" onChange={this.inputOnChangehandler} />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Description</p></Label>
                <Col sm={9} >
                  <Input type="text" name="description" value={this.state.description} id="description" className="mt-2 inputAddProduct" onChange={this.inputOnChangehandler} />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Image</p></Label>
                <Col sm={9} >
                  <Input type="file" name="image" id="image" className="inputAddProduct" onChange={this.inputOnChangehandler} />
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
                  <Input type="text" name="price" id="price" className="inputAddProduct" value={this.state.price} onChange={this.inputOnChangehandler} />
                </Col>
              </FormGroup>
              <FormGroup row style={{ "marginBottom": "0px", "height": "67px" }}>
                <Label for="Name" sm={3}><p className="textLabelForm">Quantity</p></Label>
                <Col sm={6} >
                  <Input type="text" name="quantity" id="quantity" className="inputAddProduct" value={this.state.quantity} onChange={this.inputOnChangehandler} />
                </Col>
              </FormGroup>
              <Button className="buttonCancel w100px" style={{ marginLeft: '260px' }} onClick={this.toggleModalEdit} >Cancel</Button>{' '}
              <Button className="buttonAdd w100px">Add</Button>
            </Form>
          </ModalBody>
          <ModalFooter style={{ "borderTop": "0px solid #fff" }}>
          </ModalFooter>
        </Modal>
        {/* ### END MODAL UPDATE PRODUCT */}
        {/* ### MODEL CHECKOUT#### */}

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.Home
  };
};

export default connect(mapStateToProps)(Content);