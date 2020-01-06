import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import Admin from './Admin'
import PharmaLogin from './PharmaLogin'
import PharmaPortal from './PharmaPortal'
import Activation from './Activation'
import ProtectedRoutes from './ProtectedRoutes'
import {withPharma} from './PharmaProvider'
import ResetPassword from './ResetPassword'
import Terms from './Terms'
import { Beforeunload } from 'react-beforeunload'



class App extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            token: this.props.token,
        }
    }
    
    render(){
        return (
            <div>
                <Beforeunload onBeforeunload={() => this.props.leavePage()}>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/about" component={About}/>
                    <Route exact path="/pharma" render = {props => this.props.token ? <Redirect to="/portal"/> : <PharmaLogin {...props}/>}/>
                    <ProtectedRoutes
                        redirectTo="/pharma"
                        component={this.props.username === 'uj_rudi@hotmail.com' ? Admin : PharmaPortal}  // prevents users access to the pharmaportal by typing in the url in the browser
                        token={this.props.token}
                        path="/portal"
                    />
                    <Route path = "/resetpassword/:id"  component = {ResetPassword}/>
                    <Route path = "/activation/:id"  component = {Activation}/>
                    <Route path = "/terms"  component = {Terms}/>
                </Switch>
                </Beforeunload>
            </div>
        )
    }
}

export default withPharma(App)