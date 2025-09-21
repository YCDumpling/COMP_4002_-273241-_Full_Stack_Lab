import './Header.css';
import Nav from '../Nav/Nav';


export function Header() {
    return (
        <header>
            <Nav />
            <p className="greeting">
                Welcome to the Pixell River Financial Employee and Organization Portal!
            </p>
        </header>
    );
}

export default Header;