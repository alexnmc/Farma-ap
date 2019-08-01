import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/">Cautã</Link>
            <Link to="/contact">Despre</Link>
            <Link to = "/pharma">Parteneri</Link>
        </div>
    )
}

export default Navbar