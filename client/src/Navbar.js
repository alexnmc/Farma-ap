import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/">Cautã</Link>
            <Link to="/contact">Contact</Link>
            <Link to = "/pharma">Farmacie</Link>
        </div>
    )
}

export default Navbar