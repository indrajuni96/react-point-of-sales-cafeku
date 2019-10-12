import React, { Component } from 'react'
import axios from 'axios'
import Content from '../Components/Content'

class Dashboard extends Component {
    constructor(props) {
        super()
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await this.getAll()
    }

    getAll = async () => {
        await axios.get('http://localhost:4000/api/v1/products')
            .then(result => {
                this.setState({ data: result.data.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return <>
            <Content />
        </>

    }
}

export default Dashboard