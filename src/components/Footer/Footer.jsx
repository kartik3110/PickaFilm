import "./Footer.css";
export default function Footer() {
  return (
    <footer className="page-footer">
      <p className="footer-text">
        &#169; 2024 Kartik Gupta
        <a
          href="https://github.com/kartik3110"
          className="social"
          target="_blank"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/kartikgupta3110/"
          className="social"
          target="_blank"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
