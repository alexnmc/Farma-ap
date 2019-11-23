import React from 'react'
import { Link } from 'react-router-dom'


const Footer = (props) => {
    return (
        <div className ="footer">
            <p className = 'bottomP' style = {{margin:'auto', color: "rgb(14, 25, 47)" , fontFamily: 'arial', fontSize: '12px'}}>© 2019 Farmaapp.eu All Rights Reserved.</p>
            <Link to = "/terms" style = {{margin:'auto', color: "rgb(14, 25, 47)" , fontFamily: 'arial', fontSize: '12px'}}>Termeni și Condiții</Link>
        </div>
    )
}

export default Footer
