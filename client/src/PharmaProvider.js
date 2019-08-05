import React, { Component } from 'react'
import axios from 'axios'
import ring from './Sound/Sound.mp3'



const openGeocoder = require('node-open-geocoder');
const PharmaContext = React.createContext()
const sound = new Audio(ring)



class PharmaProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            city: JSON.parse(localStorage.getItem("city")) || '', // from geolocation..
            county: localStorage.getItem("county") || '',
            toggle: true,
            toggle2: true,
            username: '',
            password: '',
            password2: '',
            pharmaCode: '',
            city2: '',
            city4:'',
            email: '',
            forgotEmail: '',
            newPassword: '',
            phone: '',
            time:'',
            medication: '',
            img:'',
            cities:['Oradea','Salonta','Marghita','Sacueni','Beius','Valea lui Mihai','Alesd','Stei','Vascau','Nucet'],
            messages: [],
            currentCity: '',
            confirmed: ''
        }
    }

    logout = () => {
        var answer = window.confirm("Ești sigur cã vrei sã ieși din cont ?")
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
                pharmaCode: '',
                forgotEmail: '',
                confirmed:'',
                toggle2: true      
            }
        })
    }

    editToggler2 = () => {
        this.setState(prevState => {
            return {
                toggle2: !prevState.toggle2,
                forgotEmail: '',
                confirmed:''               //toggle from login to reset password
                
            }
        })
    }

    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password,
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
            password: this.state.password,
            city: this.state.city4
        }
        this.signup(newUser)
        this.setState({
            username: '',
            password: '',
            password2:'',
            pharmaCode:'',
            city4: ''
        })
    }
    
    handleSignup = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.pharmaCode === process.env.REACT_APP_CODE ?
                this.pharmaSignup()
                :
                this.state.pharmaCode === "" ? 
                    alert("Vã rugãm sa introduceți codul secret.")
                    :
                    alert("Cod greșit !")
        :
        alert('Parolele nu sint identice !')
    }

    
    handleReset = () => {
        axios.get(`/user/reset/${this.state.forgotEmail}`).then(res => {  
            if(res.data !== 'Confirmed'){
                alert(res.data)
            }
            this.setState({
                confirmed: res.data
            })
        })
    }


    resetPassword = () => {
        const newUser = {
            password: this.state.newPassword,
        }
        axios.put(`/user/reset/${this.state.forgotEmail}`, newUser).then(res => {  
              alert(res.data)
            if(res.data === "Parola a fost schimbatã !" ){
                this.setState({
                    toggle2: true,
                    confirmed: '',
                    newPassword: ''
                })
            }
        })
    }


    /*getLocation = () => {
        navigator.geolocation.getCurrentPosition(
        function(position) {
            openGeocoder().reverse(position.coords.longitude, position.coords.latitude)
                .end((err, res) => {       
                        if(err){
                            alert('Locație necunuscutã !')
                        }  
                        if(res){
                            localStorage.setItem("city", JSON.stringify(res.address.city))
                            localStorage.setItem("county", JSON.stringify(res.address.county))
                        }
                })
            }
        )
    }*/


    handleSubmit = () => {  // on submit we are sending a new message object to the database
        const { email, phone, medication, img, county} = this.state
        const city = this.state.city.length ? this.state.city : this.state.city2
        const date = new Date()
        
        axios.post('/message', {date, email, phone, medication, img, city, county}).then(res => {
            console.log(res.data)
            alert(res.data +' Email: ' + email +'  medicament: '+ medication)
        })
        
        this.setState({
           
            email: '',
            phone: '',
            medication: '',
            img: ''
        })
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
        }, this.getMessages(e.target.value))
        
    }  

    handleChange2 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }  
    
    getMessages = (city) => {
        if(city.length){
            this.setState({currentCity:city}, this.getMessage2)
        }   
    }

    getMessage2 = () => {
        axios.get(`/message/2/${this.state.currentCity}`).then(res => {  
            this.setState({
                messages: res.data 
            })
        })
    }

    updateMessage = () => {
        axios.get(`/message/2/${this.state.currentCity}`).then(res => {  
            console.log(res.data.length, this.state.messages.length)
            if(res.data.length > this.state.messages.length){
                sound.play()
            }
            this.setState({
                messages: res.data 
            })
        })
    }

    onTakePhoto = (dataUri) => {
        let uri = decodeURIComponent(dataUri)
        this.setState({
           img: uri
        })
    }

    enlarge = (id) => {
        let newArr = this.state.messages // not mutating state
        newArr.map(item => item._id === id ? item.toggle = !item.toggle : item.toggle = true) 
        this.setState({
            messages: newArr
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
                    handleReset: this.handleReset,
                    resetPassword: this.resetPassword,
                    editToggler: this.editToggler,
                    editToggler2: this.editToggler2,
                    handleLogin: this.handleLogin,
                    pharmaSignup: this.pharmaSignup,
                    handleSignup: this.handleSignup,
                    handleChange: this.handleChange,
                    handleChange2: this.handleChange2,
                    getLocation: this.getLocation,
                    handleSubmit: this.handleSubmit,
                    getMessages: this.getMessages,
                    updateMessage: this.updateMessage,
                    onTakePhoto: this.onTakePhoto,
                    enlarge: this.enlarge
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

