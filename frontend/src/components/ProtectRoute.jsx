import React, { Component } from 'react'
import { AuthContext } from '../fetures/authcontext';
import { Navigate } from 'react-router-dom';

export class ProtectRoute extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         redirectPath:""
    //     };
    // }

    // componentDidMount() {
    //     const { authState } = this.context;

    //     if (!authState.isAuthenticated) {
    //         this.setState({ redirectPath: '/login' });
    //     }
    // }

    render() {
        // if (this.state.redirectPath) {
        //     return <Navigate to={this.state.redirectPath} />;
        // }

        return (
            <>
                {/* {this.props.children} */}
            </>
        );
    }
}

ProtectRoute.contextType = AuthContext

export default ProtectRoute
