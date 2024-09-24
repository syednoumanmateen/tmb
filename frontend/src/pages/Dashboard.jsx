import axios from 'axios'
import React, { Component } from 'react'
import Cart from '../components/Cart'
import withRouter from '../fetures/withRouter'
import constants from "../fetures/constants"

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            given: [],
            received: []
        }
    }

    async componentDidMount() {
        const result = await axios.get(`${constants.host}/api/kudos/given`)

        if (result) {
            const data = result.data.result.data
            this.setState({ given: data.map(i => ({ label: i._id, kudosGiven: i.count })) })

            const resultData = await axios.get(`${constants.host}/api/kudos/received`)

            if (resultData) {
                this.setState({ received: result.data.result.data })
            }
        }
    }
    render() {
        return (
            <>
                <div className="row g-0 p-2">
                    <div className="offset-10 col-1">
                        <button className='btn btn-lg btn-dark me-3 float-end' onClick={() => this.props.navigate('/')}>Kudos List</button>
                    </div>
                    <div className="col-1">
                        <button className='btn btn-lg btn-dark me-3 float-end' onClick={() => this.props.navigate('/form')}>Give Kudos</button>
                    </div>
                </div >
                <div className="container">
                    <div className="row g-0 p-3 align-items-center">
                        <div className="col-6 py-4">
                            <Cart data={this.state.given} />
                        </div>
                        <div className="col-6 py-4">
                            <div className="fw-bold fs-5 text-center mb-3">
                                Kudo Leaderboard
                            </div>
                            <table className="table color-table">
                                <thead>
                                    <tr>
                                        <th style={{ "backgroundColor": "#007bff" }}>Name</th>
                                        <th style={{ "backgroundColor": "#007bff" }}>Number Of Kudos received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.received.map(rec => (
                                        <tr key={rec._id}>
                                            <td>{rec._id}</td>
                                            <td >{rec.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Dashboard)
