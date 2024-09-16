import React from 'react'
import { Link } from 'react-router-dom';
import './nav.css'

const Nav = () => {
    return (
        <div>
            <ul>
                <li><Link to='/' class="active">Home</Link></li>
                <li><Link to='/graphs'>Graphs</Link></li>
                <li><Link to='/random-walk'>Random Walk</Link></li>
                <li><Link to='/info-page'>Info</Link></li>
                <li><Link to='/test'>Test</Link></li>
            </ul>
            <br />
        </div>
    )
}

export default Nav