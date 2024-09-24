import React, { Component } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import KudosForm from './pages/KudosForm'
import KudosList from './pages/KudosList'
import Login from './pages/Login'
import ProtectRoute from './components/ProtectRoute'
import NotFound from './components/NotFound'
import "./styles/app.css"

export class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    {/* <Route path="/" element={<ProtectRoute />}> */}
                    <Route path="/" element={<Navigate to="/list" />} />
                    <Route path="list" element={<KudosList />} />
                    <Route path="form" element={<KudosForm />} />
                    <Route path="dashboard" element={< Dashboard />} />
                    {/* </Route> */}
                </Routes>
            </>
        )
    }
}

export default App
