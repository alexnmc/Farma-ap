import React, {Component} from 'react'
import axios from 'axios'
import {withPharma} from './PharmaProvider'




class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
           city: this.props.city
           
        }
    }


    
    componentDidMount(){
       this.props.getLocation()
    }
    
    
    render(){
            return(
                <div className = 'home'>
                    <div className='bookingContainer'>
                        <div className = "imgWrap">
                            <div  className = 'img1'></div>
                            <h1 className = 'cauta'>Cãutati produsul dorit {this.props.city.length ? 'în ' + this.state.city + ':' : ':'}</h1>
                        </div>
                        <form className = 'bookingForm' onSubmit={this.props.handleSubmit}  >
                            {!this.props.city.length ?
                                <input 
                                    type='text'
                                    name='city2'
                                    placeholder='Oras'
                                    value={this.props.city2}
                                    onChange={this.props.handleChange}
                                    required
                                />
                            :
                            null
                            }
                            
                            <input 
                                type='text'
                                name='name'
                                placeholder='Nume'
                                value={this.props.name}
                                onChange={this.props.handleChange}
                                required
                            />
                            <input 
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={this.props.email}
                                onChange={this.props.handleChange}
                                required
                            />
                            <input 
                                type='number'
                                name='phone'
                                placeholder='Telefon'
                                value={this.props.phone}
                                onChange={this.props.handleChange}
                                required
                            />

                            <input 
                                type='text'
                                name='medication'
                                placeholder='Produsul dorit'
                                value={this.props.medication}
                                onChange={this.props.handleChange}
                                required
                            />
                            <button className = "button1">Trimite</button>
                        </form>
                    </div>
                 </div>              
            )
    }
}

       
    export default withPharma(Home)