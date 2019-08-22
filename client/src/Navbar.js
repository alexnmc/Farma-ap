import React from 'react'
import { Link } from 'react-router-dom'
import {withPharma} from './PharmaProvider'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link onClick = {() => props.reloadRender2()} to="/">Cautã</Link>
            <Link to="/about">Despre</Link>
            <Link to="/contact">Contact</Link>
            <Link to = "/pharma">Login</Link>
        </div>
    )
}

export default withPharma(Navbar)