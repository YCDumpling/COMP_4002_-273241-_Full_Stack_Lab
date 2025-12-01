import './Footer.css';

export function Footer() {
  return (
    <footer>
      <span>
        &copy; Pixell River Financial <span id="FooterYear">{new Date().getFullYear()}</span>.
      </span>
    </footer>
  );
}

export default Footer;