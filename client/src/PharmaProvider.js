import React, { Component } from 'react'
import axios from 'axios'


const openGeocoder = require('node-open-geocoder');
const PharmaContext = React.createContext()


class PharmaProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            toggle: true,
            username: '',
            password: '',
            password2: '',
            pharmaCode: '',
            city: JSON.parse(localStorage.getItem("city")) || '',
            county: localStorage.getItem("county") || '',
            city2: '',
            date: new Date(),
            name: '',
            email: '',
            phone: '',
            time:'',
            medication: '',

        }
    }

    logout = () => {
        var answer = window.confirm("Esti sigur ca vrei sa iesi din cont?")
            if(answer){
                this.setState({
                    user:'',   
                    token: '',
                    toggle: true
                })
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }

    signup = userInfo => {
        axios.post('/user/signup', userInfo).then(res => {
            const { token, user } = res.data
            localStorage.setItem("user", JSON.stringify(user))    //stores the token and the user  in local storage in case of page refresh...
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    login = userInfo => {
        axios.post('/user/login', userInfo).then(res => {
            const { token, user } = res.data          // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle, //toggle from login to signin
                username: '',
                password: '',
                password2: '',
                pharmaCode: ''
            }
        })
    }

    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        this.login(newUser) // we are receiving this function from the context and we call it here 
        this.setState({
            username: '',
            password: ''
        })
    }

    pharmaSignup = () => {
        this.getLocation()
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        this.signup(newUser)
        this.setState({
            username: '',
            password: '',
            password2:'',
            pharmaCode:''
        })
    }
    
    handleSignup = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.pharmaCode === process.env.REACT_APP_CODE ?
                this.pharmaSignup()
                :
                this.state.pharmaCode === "" ? 
                    alert("Vã rugãm sa introduceti codul secret.")
                    :
                    alert("Cod  gresit!")
        :
        alert('Parolele nu sint identice!')
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
        function(position) {
            openGeocoder().reverse(position.coords.longitude, position.coords.latitude)
                .end((err, res) => {       
                        if(err){
                            alert('Locatie necunuscuta')
                        }  
                        if(res){
                            localStorage.setItem("city", JSON.stringify(res.address.city))
                            localStorage.setItem("county", JSON.stringify(res.address.county))
                        }
                })
            },
            function(msg){

                alert('Please enable your GPS position future.');  
            },
            
            {maximumAge:600000, timeout:5000, enableHighAccuracy: false}
        )
    }


    handleSubmit = (e) => {  // on submit we are sending a new booking object to the database
        e.preventDefault()
        const {date, name, email, phone, medication, county} = this.state

        const city = this.state.city.length ? this.state.city : this.state.city2
       
        
        axios.post('/message', {date, name, email, phone, medication, city, county}).then(res => {
            alert(res.data +' Nume: '+ name +'  medicament: '+ medication)
        })
        
        this.setState({
            name: '',
            email: '',
            phone: '',
            date:'',
            medication: ''
        })
    }
    
    
    render() {
        return (
            <PharmaContext.Provider
                value={{
                    ...this.state,
                    handleToggle: this.handleToggle,
                    handleEdit:this.handleEdit,
                    logout: this.logout,
                    showMessages: this.showMessages,
                    handleDelete: this.handleDelete,
                    signup: this.signup,
                    login: this.login,
                    editToggler: this.editToggler,
                    handleLogin: this.handleLogin,
                    pharmaSignup: this.pharmaSignup,
                    handleSignup: this.handleSignup,
                    handleChange: this.handleChange,
                    getLocation: this.getLocation,
                    handleSubmit: this.handleSubmit
                }}>
                {this.props.children}
            </PharmaContext.Provider>
        )
    }
}

export default PharmaProvider


export const withPharma = C => props => (
    <PharmaContext.Consumer>
        {value => <C {...props} {...value}/> }
    </PharmaContext.Consumer>
)

