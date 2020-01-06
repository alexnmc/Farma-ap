import React from 'react'
import { Link } from 'react-router-dom'


const Footer = (props) => {
    return (
        <div className ="footer">
            <p className = 'bottomP' style = {{margin:'auto', color: "white" , fontFamily: 'arial', fontSize: '12px', fontWeight: '500'}}>© 2019 Farmaapp.eu All Rights Reserved.</p>
            <Link to = "/terms" style = {{margin:'auto', color: "white" , fontFamily: 'arial', fontSize: '12px', fontWeight: '600'}}>Termeni și Condiții</Link>
        </div>
    )
}

export default Footer
