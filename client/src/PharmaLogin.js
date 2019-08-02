import React from 'react'
import { withPharma } from './PharmaProvider'



const PharmaLogin = props=>  {
    
        return(
            <div className="admin">
                
                <div className = "loginContainer">
                    { props.toggle ?
                            <div  className='loginForm'>
                                <div className = "loginWrap">
                                    <div className = "loginLogo"></div>
                                    <p className = 'cont'>Alãturati-vã retelei noastre - <span className = 'link' onClick={props.editToggler}>Înregistrare</span></p>
                                </div>
                                <h4>Intrare in cont:</h4>
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
                                        <div className = "loginLogo"></div>
                                        <p className = 'cont'>Aveti deja cont? <span className = 'link' onClick={props.editToggler}>Login</span></p>
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

                                <select 
                                    required 
                                    className = 'login11'
                                    aria-required="true" 
                                    name='city4'
                                    value={props.city4}
                                    onChange={props.handleChange}>
                                <option value = ''>oras:</option>
                                {props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                                </select>

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
