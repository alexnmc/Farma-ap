import React, { Component } from 'react'
import axios from 'axios'
import ring from './Sound/Sound.mp3'
import cities from './cities'

const PharmaContext = React.createContext()
const sound = new Audio(ring)


class PharmaProvider extends Component {
    constructor(){
        super()
        this.state = {
            toggleHome: true,
            toggle3: '',
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
            newPassword2:'',
            phone: '',
            time:'',
            medication: '',
            img:'',
            cities: cities,
            messages: [],
            currentCity: '',
            confirmed: '',
            loading: false,
            alert: '',
            alert2:''
        }
    }

    logout = () => {
        var answer = window.confirm("Ești sigur cã vrei sã ieși din cont?")
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
           if(res.data.success === 'success'){
            this.setState({
               toggle3: res.data.success,
            })
           this.sendActivationEmail(res.data.user._id, res.data.user.username)
            }else{
               alert("Eroare! Vã rugãm sã încercați din nou.")
            }
        }).catch(err => this.setState({alert: err.response.data.errMsg}))
    }

    login = userInfo => {
        axios.post('/user/login', userInfo).then(res => {
            const { token, user } = res.data          // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
        }).catch(err => this.setState({alert: err.response.data.errMsg}))
    }

    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle, //toggle from login to signup
                username: '',
                password: '',
                password2: '',
                pharmaCode: '',
                forgotEmail: '',
                confirmed:'',
                toggle2: true,
                toggle3: '',
                alert:'',
                alert2:''     
            }
        })
    }

    editToggler2 = () => {
        this.setState(prevState => {
            return {
                toggle2: !prevState.toggle2,
                forgotEmail: '',
                confirmed:'',
                alert: '',
                alert2:''       //toggle from login to reset password
            }
        })
    }

    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }
        this.login(newUser) 
        this.setState({
           alert2:'',
        })
    }

    pharmaSignup = () => {
        if(this.state.password.length < 6){
            this.setState({
                alert: 'Parola 6 - 8 caractere'
            })
        }else{
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
                city4: '',
            })
        }
    }
    
    handleSignup = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.pharmaCode === process.env.REACT_APP_CODE ?
                this.pharmaSignup()
                :
                this.state.pharmaCode === "" ? 
                     this.setState({alert: "Vã rugãm sa introduceți codul secret!"})
                    :
                     this.setState({alert: "Cod greșit!"})
        :
            this.setState({alert:'Parolele nu sint identice !'})
    }

    handleReset = () => {
        axios.get(`/user/reset/${this.state.forgotEmail}`).then(res => { 
            if(res.data.confirmed !== 'Confirmed'){
                this.setState({alert: res.data.confirmed})
            } else {
                this.setState({alert: '', confirmed: res.data.confirmed})
                this.sendResetEmail(this.state.forgotEmail, res.data.id)
            }
        })
    }

    resetPassword = (id) => {
        if(this.state.newPassword.length < 6){
            this.setState({
                alert: 'Parola minim 6 caractere'
            })
        }else{
            if(this.state.newPassword === this.state.newPassword2){
                
                const newUser = {
                    password: this.state.newPassword,
                }
                axios.put(`/user/reset/${id}`, newUser).then(res => {  
                    this.setState({ alert2: res.data})
                    if(res.data === "Parola a fost schimbatã !" ){
                        this.setState({
                            confirmed: '',
                            newPassword: '',
                            newPassword2:'',
                        })
                    }
                })
            }else{
                this.setState({
                    alert:  "Parolele nu sunt identice!"
                })
            }
        }
    }

    alertCallBack = (data, email, med) => {
        alert(data +' Email: ' + email +'  medicament: '+ med)
    }
    
    handleSubmit = () => {  // on submit we are sending a new message object to the database
            this.setState({loading: true})
            const { email, phone, medication, img, county} = this.state
            const city = this.state.city2
            const date = new Date()
            axios.post('/message', {date, email, phone, medication, img, city, county}).then(res => {
                this.setState(
                {loading: false},
                this.alertCallBack(res.data, email, medication)
                )
            })
            
            this.setState({
                email: '',
                phone: '',
                medication: '',
                img: '',
                city2: ''
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
            alert:'',
            alert2:''
        })
    }  

    handleChange3 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
            city2: e.target.value
        })
    }  
    
    getMessages = (city) => {
        if(city.length){
            this.setState({currentCity:city}, this.getMessage2)
        }   
    }

    getMessage2 = () => {
        axios.get(`/message/2/${this.state.currentCity}`).then(res => {  
            console.log(res.data)
            this.setState({
                messages: res.data 
            })
        })
    }

    updateMessage = () => {
        axios.get(`/message/2/${this.state.currentCity}`).then(res => {  
            if(res.data.length > this.state.messages.length){
                sound.play()
            }
            this.setState({
                messages: res.data 
            })
        })
    }

    onTakePhoto = (dataUri) => {
        this.setState({
           img: dataUri
        })
    }

    enlarge = (id) => {
        let newArr = this.state.messages // not mutating state
        newArr.map(item => item._id === id ? item.toggle = !item.toggle : item.toggle = true) 
        this.setState({
            messages: newArr
        })
    }

    deletePhoto = () => {
        this.setState({
            img: '',
        })
    }

    rezolvat = (id, email) => {
        var answer = window.confirm("Ești sigur cã vrei sã inchizi mesajul?")
        if(answer){
            const updates = {rezolvat: true}
            axios.put(`/message/${id}`, updates).then(response => {
                const updatedMessage = response.data
                this.setState(prevState => {
                    return {
                        messages: prevState.messages.map(item => item._id === id ? updatedMessage : item ),
                        
                        }
                    })
            })
        }
    }

    sendResetEmail = (email, id) => {
        let linkID = Math.random()
        
        const newLink = {
            linkID: linkID,
            userID: id,
        }
        axios.post('/link', newLink).then(res => {
        }).catch(err => alert(err))
    
        const newMail = {
            sendTo: email,
            linkID: linkID,
        }
        axios.post('/mail/reset', newMail).then(res => {
        }).catch(err => alert(err))
    }

    sendActivationEmail = (id, email) => {
        const newMail = {
            sendTo: email,
            id: id
        }
        axios.post('/mail/activate', newMail).then(res => {
           
        }).catch(err => alert(err))
    }

    deleteMessage = (id) => {
        axios.delete(`/message/${id}`).then(res => {
            this.setState(prevState => {
                return {
                    messages: prevState.messages.map(item => item._id !== id ? item : null ),
                }
            })
        })
    }

    reloadRender = () => {
        this.setState({
            toggleHome: !this.state.toggleHome
        })
    }

    reloadRender2 = () => {
        this.setState({
            toggleHome: true
        })
    }

    reloadRender3 = () => {
        this.setState({
            toggle: true,
            toggle2: true
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
                    enlarge: this.enlarge,
                    rezolvat: this.rezolvat,
                    sendConfirmationEmail: this.sendConfirmationEmail,
                    deleteMessage: this.deleteMessage,
                    handleChange3: this.handleChange3,
                    deletePhoto: this.deletePhoto,
                    reloadRender: this.reloadRender,
                    reloadRender2: this.reloadRender2,
                    reloadRender3: this.reloadRender3
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

