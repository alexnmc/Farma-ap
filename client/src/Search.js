import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'






class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
 
render() {
   
    return (
        <div className = "searchIn">
            <input class="awesomplete" className = 'inputS' list="mylist" placeholder = 'Alege orasul:' onChange={this.props.handleChange3}/>
            <datalist id="mylist" >
              {this.props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
            </datalist>
        <div className = 'searchLogo'></div>
        </div>
     
    )
  }
}

export default withPharma(Search)
 