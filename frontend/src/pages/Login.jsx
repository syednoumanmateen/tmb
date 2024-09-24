import React, { Component } from 'react'
import Layout from '../components/Layout'
import axios from "axios"
import { AuthContext } from '../fetures/authcontext';
import { Navigate } from 'react-router-dom';
import constants from "../fetures/constants"

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            redirectPath: ""
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleLogin = async (data) => {
        try {
            const { dispatch } = this.context;
            const { name } = this.state;
            const result = await axios.get(`${constants.host}/api/user/${name}`)
            if (result) {
                dispatch({ type: 'LOG_IN', payload: result.data.result.data });
                this.setState({ ...this.state, redirectPath: "/" })
            }
        } catch (e) {

        }
    };

    render() {
        if (this.state.redirectPath) {
            return <Navigate to={this.state.redirectPath} />;
        }

        return (
            <Layout>
                <div className="display-2 fw-bold">
                    Welcome To KudoSpot
                </div>
                <>
                    <div className="m-5">
                        <input
                            type="text"
                            name="name"
                            className="form-control p-3"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            placeholder='Enter Your Name'
                        />
                    </div>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button type="submit" className="btn btn-dark px-5" onClick={this.handleLogin}>login</button>
                    </div>
                </>
            </Layout>
        );
    }
}

Login.contextType = AuthContext;

export default Login
