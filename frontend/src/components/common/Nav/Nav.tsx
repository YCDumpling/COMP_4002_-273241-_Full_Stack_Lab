import './Nav.css';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';

export function Nav() {
    return (
        <nav>
            <div>
                <img src="/images/logo.png" alt="Pixell River Financial Logo" className="logo" />
                <span className="site-title">Pixell River Financial</span>
            </div>
            <div className="page-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/organization">Organization</NavLink>
            </div>
            <div className="user-management-links">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}

export default Nav;