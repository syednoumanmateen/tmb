import React, { createContext, Component } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Define the authReducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOG_OUT':
            return {
                ...state,
                user: {},
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// Create the AuthProvider class component
class AuthProvider extends Component {
    constructor(props) {
        super(props);
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        this.state = {
            authState: {
                user: userData.user || {},
                isAuthenticated: userData.isAuthenticated || false,
            },
        };
    }

    // Define the dispatch function
    dispatch = (action) => {
        this.setState((prevState) => ({
            authState: authReducer(prevState.authState, action),
        }), () => {
            // Update localStorage based on the action
            if (action.type === 'LOG_IN') {
                localStorage.setItem('user', JSON.stringify({
                    user: this.state.authState.user,
                    isAuthenticated: true,
                }));
            } else if (action.type === 'LOG_OUT') {
                localStorage.setItem('user', JSON.stringify({
                    user: {},
                    isAuthenticated: false,
                }));
            }
        });
    };

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, dispatch: this.dispatch }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export { AuthContext, AuthProvider };
