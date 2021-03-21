import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [signedInUser, setSignedInUser] = useContext(UserContext)

    return (
        < div className='container'>
            <Navbar collapseOnSelect expand="lg">
                <NavLink className=" header-icon" to='/home'>Horseback riders</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <NavLink className="nav-link-style" to='/home'>Home</NavLink>
                        <NavLink className="nav-link-style" to=''>Destination</NavLink>
                        <NavLink className="nav-link-style" to=''>Blog</NavLink>
                        <NavLink className="nav-link-style" to=''>Contact</NavLink>

                        {/* Log In Out Button */}
                        <h6 className='pt-2 pr-1 user-name'>{signedInUser.name} </h6>
                        {signedInUser.isSignIn ?
                            <button className='logInOut-btn' onClick={() => setSignedInUser({ isSignIn: false })}>SignOut</button> :
                            <NavLink className='logInOut-btn' to='/login'>Login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;