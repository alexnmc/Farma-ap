import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div className ="footer">
            {document.documentElement.clientWidth > 1000 ? 
             <p className = 'bottomP' style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '12px', fontWeight: '100'}}>© 2019 Farmaap. All Rights Reserved.</p>
             :
             <p className = 'bottomP' style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '8pt', fontWeight: '100'}}>© 2019 Farmaapp. All Rights Reserved.</p>
            }
            <Link to = "/terms" style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '12px', fontWeight: '100'}}>Termeni și Condiții</Link>
        
        </div>
    )
}

export default Footer
