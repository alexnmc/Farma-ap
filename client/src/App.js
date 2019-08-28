import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import PharmaLogin from './PharmaLogin'
import PharmaPortal from './PharmaPortal'
import Activation from './Activation'
import ProtectedRoutes from './ProtectedRoutes'
import {withPharma} from './PharmaProvider'
import ResetPassword from './ResetPassword'
import Terms from './Terms'



class App extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            token: this.props.token,
            
        }
    }
    
    render(){
        return (
           //if there is a token in the local storage(or state) the  Admin component redirects to the AdminPortal component autoomatically
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/about" component={About}/>
                    <Route exact path="/pharma" render = {props => this.props.token ? <Redirect to="/portal"/> : <PharmaLogin {...props}/>}/>
                    <ProtectedRoutes
                        redirectTo="/pharma"
                        component={PharmaPortal}  // prevents users access to the adminportal by typing in the url in the browser
                        token={this.props.token}
                        path="/portal"
                    />
                    <Route path = "/resetpassword/:id"  component = {ResetPassword}/>
                    <Route path = "/activation/:id"  component = {Activation}/>
                    <Route path = "/terms"  component = {Terms}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default withPharma(App)