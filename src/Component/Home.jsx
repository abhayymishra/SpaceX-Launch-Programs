import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Errorpage from './Error'
import Showdata from './show-data'
export default function Home() {
    return (
        <>
        <Router>
                <Switch>
                    <Route path="/" exact component={Main} /> 
                    <Route path="/Breif-data" component={Showdata} />
                    <Route path="*" component={Errorpage} />                    
                    <Main/>
                </Switch>
            </Router>    
        </>
    )
}
