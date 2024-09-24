import React, { Component } from 'react'
import { AuthContext } from '../fetures/authcontext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faHandHoldingHand, faHandshake, faHandsPraying, faHeart, faHome, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import withRouter from '../fetures/withRouter'
import constants from "../fetures/constants"

export class KudosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kudos: [],
            loading: false
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const result = await axios.get(`${constants.host}/api/kudos`)
            this.setState({ loading: false, kudos: result.data.result.data })
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    render() {
        const { authState } = this.context

        const badgeData = [{
            "name": "Good Vibes",
            "icon": <FontAwesomeIcon icon={faHome} />
        }, {
            "name": "Well Done",
            "icon": <FontAwesomeIcon icon={faThumbsUp} />
        }, {
            "name": "Helping Hand",
            "icon": <FontAwesomeIcon icon={faHandHoldingHand} />
        }, {
            "name": "Welcome",
            "icon": <FontAwesomeIcon icon={faHandsPraying} />
        }, {
            "name": "Knowledge Share",
            "icon": <FontAwesomeIcon icon={faHandshake} />
        }]

        return (
            <>
                <div className="row g-0 p-2">
                    <div className='col-10 p-3 fs-5 d-flex justify-content-center align-items-center '>
                        welcome {authState.user.name}
                    </div>
                    <div className="col-2">
                        <button className='btn btn-lg btn-dark me-3 float-end' onClick={() => this.props.navigate('/form')}>Give Kudos</button>
                    </div>
                </div >
                <div className="container">
                    <div className='overflow-scroll' style={{ height: "84vh" }}>
                        {
                            this.state.kudos.map(i => (
                                <>
                                    <div class="card mx-3 my-5" key={i._id}>
                                        <div class="card-body">
                                            <div className="row g-0 align-items-center">
                                                <div className="col-1 fs-2">
                                                    {badgeData[badgeData.findIndex(k => k.name === i.badge)].icon}
                                                </div>
                                                <div className="col-11">
                                                    <div className="row g-0">
                                                        <div className="col-12 mb-2">
                                                            {i?.sender?.name} gave "{i.badge}" Badge to {i?.receiver?.name}
                                                        </div>
                                                        <div className="offset-2 col-10">
                                                            {i.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-0">
                                                <div className="offset-11 col-1 fs-6">
                                                    {/* <FontAwesomeIcon className="text-secondary" icon={faHeart} /> */}
                                                    <FontAwesomeIcon className="text-primary" icon={faHeart} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <div className="row g-0 p-2">
                    <div className="offset-10 col-2">
                        <button className='btn btn-lg btn-dark me-3 float-end' onClick={() => this.props.navigate('/dashboard')}><FontAwesomeIcon icon={faChartBar} /></button>
                    </div>
                </div>
            </>
        )
    }
}

KudosList.contextType = AuthContext

export default withRouter(KudosList)
