import React, { Component } from 'react'
import Layout from '../components/Layout'
import badgeData from '../fetures/badges';
import axios from 'axios';
import { AuthContext } from '../fetures/authcontext';
import withRouter from '../fetures/withRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import constants from "../fetures/constants"

export class KudosForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: "",
            badge: [],
            receiver: "",
            sender: ""
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${constants.host}/api/user`);
            let data = response.data.result.data
            data = data.map(i => ({
                value: i._id, label: i.name
            }))
            this.setState({ user: data });
        } catch (error) {
            this.setState({ user: [] });
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleLogin = async (data) => {
        try {
            const { authState, dispatch } = this.context;
            const { message, badge, receiver } = this.state;
            const result = await axios.post(`${constants.host}/api/kudos`, { message, badge, receiver, sender: authState?.user?._id })

            if (result) {
                this.props.navigate('/')
            }
        } catch (e) {

        }
    };

    render() {
        const badgeDataOption = badgeData.map(i => ({
            value: i.name, label: i.name
        }))

        return (
            <>
                <div className="row g-0 p-2">
                    <div className="offset-10 col-2">
                        <button className='btn btn-lg btn-dark me-3 float-end' onClick={() => this.props.navigate('/dashboard')}><FontAwesomeIcon icon={faChartBar} /></button>
                    </div>
                </div>
                <Layout>
                    <div className="container">
                        <div className="m-5">
                            <select className="form-select px-5 py-3" name='receiver' onChange={this.handleInputChange}>
                                <option value="">Select the User you want to give</option>
                                {this.state.user.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-5">
                            <select className="form-select px-5 py-3" name='badge' onChange={this.handleInputChange}>
                                <option value="">Select the Badge you want to give</option>
                                {badgeDataOption.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-5">
                            <input
                                type="text"
                                name="message"
                                className="form-control p-3"
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                placeholder='Reason for Kudos'
                            />
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-dark px-5" onClick={this.handleLogin}>Give Kudos</button>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

KudosForm.contextType = AuthContext;

export default withRouter(KudosForm)
