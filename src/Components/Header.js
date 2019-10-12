import React from 'react'
// import Style.css
import '../Assets/Css/Style.css'
// Import Components Bootstrap
import { Row, Col } from 'reactstrap';
// Import Icons & Images
import iconMenu from '../Assets/Images/menu.png'

const Header = () => {
    return <>

        {/* HEADER */}
        <Row>
            <Col sm="9" className="headerFoodItem">
                <Row>
                    <Col sm="2">
                        <img src={iconMenu} alt="menu" className="ml-4" style={{ "marginTop": "25px" }} />
                    </Col>
                    <Col sm="10">
                        <p className="textFoodItems mr-5" style={{ "marginTop": "20px" }}>CafeKU</p>
                    </Col>
                </Row>
            </Col>
            <Col sm="3" className="headerCart">
                {/* <p className="textCart" style={{ "marginTop": "20px" }}>Cart <Badge color="primary" pill style={{ "height": "30px" }}>3</Badge></p> */}
            </Col>
        </Row>
        {/* END HEADER */}

    </>
}

export default Header