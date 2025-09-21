import './Nav.css';

export function Nav() {
    return (
        <nav>
            <div>
                <img src="/images/logo.png" alt="Pixell River Financial Logo" className="logo" />
                <span className="site-title">Pixell River Financial</span>
            </div>
            <ul>
                <li><a href="/employees">Employees</a></li>
                <li><a href="/organization">Organization</a></li>
            </ul>
        </nav>
    );
}

export default Nav;