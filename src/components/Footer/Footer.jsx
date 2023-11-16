import './Footer.css'
export default function Footer() {
    return (
        <footer className="page-footer">
            <p className="footer-text">
                Made by Kartik Gupta &nbsp;
                <a href="https://github.com/kartik3110" className="badge-gh" target="_blank">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/kartikgupta3110/" className="badge-linkedin" target="_blank">
                    LinkedIn
                </a>
            </p>
        </footer>
    );
}