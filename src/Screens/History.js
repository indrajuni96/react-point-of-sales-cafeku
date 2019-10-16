import React, { Component } from 'react'
import axios from 'axios'
import Navigation from '../Components/Navigation'
import iconMenu from '../Assets/Images/menu.png'
import { Line } from 'react-chartjs-2'
import convertRupiah from "rupiah-format"
import {
  Col,
  Row,
  Container,
  FormGroup,
  Input,
  Table
} from 'reactstrap'

class History extends Component {
  constructor(props) {
    super()
    this.state = {
      data: [],
      dataRevenue: [],
      dataHistory: [],
      order: [],
      count: 0,
      orders: 0,
      resYearIncome: 0,
      labels: [],
      weeklyIncome: [],
      monthlyIncome: [],
      yearlyIncome: [],
    }
    this.handleChart = this.handleChart.bind(this);
    this.getRecentOrder = this.getRecentOrder.bind(this)
    this.getRevenueOrder = this.getRevenueOrder.bind(this)
    this.getStartRecentOrder()
  }

  async componentDidMount() {
    await this.getWeeklyIncome();
    await this.getCountOrder();
    await this.getMonthlyIncome();
    await this.getYearlyIncome();
    await this.drawChart();
  }

  getWeeklyIncome() {
    axios.get("http://localhost:4000/api/v1/history/weekly")
      .then(result => {
        console.log(result.data.data)
        this.setState({ weeklyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMonthlyIncome() {
    axios.get("http://localhost:4000/api/v1/history/monthly")
      .then(result => {
        this.setState({ monthlyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getYearlyIncome() {
    axios.get("http://localhost:4000/api/v1/history/monthly")
      .then(result => {
        this.setState({ yearlyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChart(event) {
    event.preventDefault();
    let val = event.target.value;
    console.log(val)
    this.drawChart(val);
  }

  drawChart(val) {
    if (val === "weekly") {
      let weekly = [0];
      let lastDate = [0];

      this.state.weeklyIncome.map(item => {
        weekly.push(item.INCOME);
        lastDate.push(item.date_created);
      });

      const dataChart = {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        datasets: [
          {
            label: "This Week Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weekly.slice(Math.max(weekly.length - 7, 0))
          },
          {
            label: "Last Week Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weekly.slice(Math.max(weekly.length - 14, 0)).slice(0, 7)
          }
        ]
      };
      this.setState({ dataRevenue: dataChart });
    } else if (val === "monthly") {
      let monthly = [0];
      this.state.monthlyIncome.map(item => {
        monthly.push(item.INCOME);
      });
      console.log(monthly)
      console.log(monthly.length);

      const dataChart = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "This Month Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: monthly.slice(Math.max(monthly.length - 4, 0))
          },
          {
            label: "Last Month Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: monthly.slice(Math.max(monthly.length - 8, 0)).slice(0, 4)
          }
        ]
      };
      this.setState({ dataRevenue: dataChart });
    } else if (val == "yearly") {
      let yearly = [0];

      this.state.yearlyIncome.map(item => {
        yearly.push(item.INCOME);
      });

      const dataChart = {
        labels: [
          "September",
          "November",
          "December",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August"
        ],
        datasets: [
          {
            label: "This Year Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yearly.slice(Math.max(yearly.length - 12, 0))
          },
          {
            label: "Last Year Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yearly.slice(Math.max(yearly.length - 24, 0)).slice(0, 12)
          }
        ]
      };
      this.setState({ dataRevenue: dataChart });
    }
  }
  getCountOrder = async () => {
    axios.get('http://localhost:4000/api/v1/history/countorder')
      .then(result => {
        this.setState({
          count: result.data.data[0].daynow,
          orders: result.data.data[0].lastweek,
          resYearIncome: result.data.data[0].yearnow
        })
      }).catch(err => {
        console.log(err)
      })
  }
  getStartRecentOrder = async () => {
    await axios.get('http://localhost:4000/api/v1/history/recentorder?order=week')
      .then(result => {
        this.setState({ data: result.data.data })
      })
  }
  getRecentOrder = async (event) => {
    let data = event.target.value
    console.log(data)
    await axios.get('http://localhost:4000/api/v1/history/recentorder?order=' + data)
      .then(result => {
        this.setState({
          data: result.data.data,
          order: data
        })
      })
  }
  getRevenueOrder = async (event) => {
    let data = event.target.value
    let labels = []
    if (data == "day") {
      this.setState({
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      })
    } else if (data == "week") {
      labels = ["week1", "week2", "week3", "week4"]
    } else if (data == "month") {
      labels = ["January", "Febuary", "March", "April", "May", "June", "July"]
    }
    axios.get('http://localhost:4000/api/v1/history/revenueorder?order=' + data)
      .then(result => {
        this.setState({
          dataRevenue: result.data.data
          // order: data
        })
      })
  }

  render() {
    return (
      <>
        <Container fluid={true}>
          <Row>
            <Col sm="12" className="headerFoodItem">
              <Row>
                <Col sm="2">
                </Col>
                <Col sm="8">
                  <p className="textFoodItems mr-5" style={{ "marginTop": "20px" }}>History</p>
                </Col>
                <Col sm="2">
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="contentCafeku">
            <Navigation />
            <Col sm="11" className="pl-5 pr-5">
              <Row className="mt-3 mb-5">
                <Col sm className="CardPink mr-3 p-5 mb-2">
                  <Row>
                    <Col sm="12">
                      <p><b>Today's Income</b></p>
                    </Col>
                    <Col sm="12">
                      <h4>{convertRupiah.convert(this.state.count)}</h4>
                    </Col>
                    <Col sm="12">
                      <p><b>+2% Yesterday</b></p>
                    </Col>
                  </Row>
                </Col>
                <Col sm className="CardBlue mr-3 p-5 mb-2">
                  <Row>
                    <Col sm="12">
                      <p><b>Orders</b></p>
                    </Col>
                    <Col sm="12">
                      <h4>{this.state.orders}</h4>
                    </Col>
                    <Col sm="12">
                      <p><b>+5% Last Week</b></p>
                    </Col>
                  </Row>
                </Col>
                <Col sm className="CardPurple mr-3 p-5 mb-2">
                  <Row>
                    <Col sm="12">
                      <p><b>This Year's Income</b></p>
                    </Col>
                    <Col sm="12">
                      <h4>{convertRupiah.convert(this.state.resYearIncome)}</h4>
                    </Col>
                    <Col sm="12">
                      <p><b>+10% Last Year</b></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="ChartHistory">
                  <Row className="pt-3">
                    <Col sm="10">
                      <h2>Revenue</h2>
                    </Col>
                    <Col sm="2" >
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect" style={{ borderRadius: '10px' }} onChange={this.handleChart}>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Line data={this.state.dataRevenue} />
                </Col>
              </Row>
              <Row className="mt-5 mb-5">
                <Col className="tableRecentOrder">
                  <Row className="pt-3">
                    <Col sm="10">
                      <h2>Recent Order</h2>
                    </Col>
                    <Col sm="2">
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect" style={{ borderRadius: '10px' }} onChange={(event) => this.getRecentOrder(event)}>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Table>
                    <thead>
                      <tr>
                        <th>INVOICES</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>ORDERS</th>
                        <th>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((item, key) => {
                        return (
                          <tr key={key}>
                            <th>{item.invoices}</th>
                            <td>{item.user}</td>
                            <td>{item.date.substr(0, 10)}</td>
                            <td>{item.orders}</td>
                            <td>{convertRupiah.convert(item.amount)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default History