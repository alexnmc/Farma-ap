import React from 'react'
import { Link } from 'react-router-dom'


const Footer = (props) => {
    return (
        <div className ="footer">
            <p className = 'bottomP' style = {{margin:'auto', color: props.color , fontFamily: 'arial', fontSize: '12px', fontWeight: '100'}}>© 2019 Farmaapp.eu All Rights Reserved.</p>
            <Link to = "/terms" style = {{margin:'auto', color: props.color , fontFamily: 'arial', fontSize: '12px', fontWeight: '100'}}>Termeni și Condiții</Link>
        </div>
    )
}

export default Footer
