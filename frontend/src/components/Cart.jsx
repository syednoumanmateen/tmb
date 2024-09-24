import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


export class Cart extends Component {
    render() {
        const { data } = this.props;

        return (
            <BarChart width={600} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kudosGiven" fill="#007bff" />
            </BarChart>
        )
    }
}

export default Cart
