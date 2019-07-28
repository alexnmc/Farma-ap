import React from 'react'
import { withPharma } from './PharmaProvider'





const PharmaLogin = props=>  {
    
        return (
            
            <div className="admin">
                <div className = "loginContainer">
                { props.toggle ?
                
                            <div  className='loginForm'>
                                <div className = "loginWrap">
                                    <p className = 'cont'>Nu ai cont?<span className = 'link' onClick={props.editToggler}>Înregistreazã-te</span></p>
                                </div>
                                <h4>Intrã in cont:</h4>
                                <input
                                    className = "login1"
                                    type='text'
                                    name='username'
                                    placeholder='Email'
                                    value={props.username}
                                    onChange={props.handleChange}
                                />

                                <input
                                    className = "login1"   
                                    type='text'
                                    name='password'
                                    placeholder='Parola'
                                    value={props.password}
                                    onChange={props.handleChange}
                                />
                                <button className = 'loginButton' onClick={props.handleLogin}>Autentificare</button>
                                
                            </div>
                   
                            
                   
                        
                    :     

                  
                        <div className='loginForm'>
                                <div className = "loginWrap">
                                    <p className = 'cont'>Ai deja cont? <div> </div> <span className = 'link' onClick={props.editToggler}>Login</span></p>
                                </div>
                        <h4> Creeazã cont nou:</h4>
                       
                            <input
                                className = "login1"
                                type='text'
                                name='pharmaCode'
                                placeholder='cod'
                                value={props.pharmaCode}
                                onChange={props.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='username'
                                placeholder='Adresa e-mail'
                                value={props.username}
                                onChange={props.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password'
                                placeholder='alege parola'
                                value={props.password}
                                onChange={props.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password2'
                                placeholder='repeta parola'
                                value={props.password2}
                                onChange={props.handleChange}
                            />
                            <button className = 'loginButton'  onClick={props.handleSignup} >înregistare</button>
                         </div>
                }
                </div>
            </div>
                
           
        )
    
}

export default withPharma(PharmaLogin)
