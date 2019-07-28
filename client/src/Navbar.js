import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/">Utilizator</Link>
            <Link to="/contact">Contact</Link>
            <Link to = "/pharma">Pentru farmacii</Link>
        </div>
    )
}

export default Navbar