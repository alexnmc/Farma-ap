import React from 'react'
import {withPharma} from './PharmaProvider'



const Search = (props) => {
  
    return (
        <div className = "searchIn">
            <input type = "text" className = 'inputS' list="mylist" placeholder = 'Alege orașul:' value = {props.city2} onChange = {props.handleChange3} required/>
            <datalist id="mylist" >
              {props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
            </datalist>
            <div className = 'searchLogo'></div>
        </div>
     
    )
  
}

export default withPharma(Search)
 