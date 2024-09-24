import React, { Component } from 'react'

export class Layout extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout
