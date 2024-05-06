import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Errorpage extends Component {
    render() {
        return (
            <>
                <header>
                    <div className="grid-12 pt-1">
                        <h1>SpaceX Launch Programs</h1>
                    </div>
                </header>
                <div className="pagenot">
                    <img src={require('../Images/pagenot.png').default} alt="page not found"></img>
                    <Link to='/'>Go to Home Page</Link>
                </div>
            </>
        )
    }
}
