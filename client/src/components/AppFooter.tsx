import '../assets/css/AppFooter.css'
import '../assets/css/global.css'

function AppFooter(){
return (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-links">
                <a href="#about">About</a>
                <a href="#our-team">Our Team</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact Us</a>
            </div>
            <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src={require('../assets/images/site/fb.jpg')}
                        alt="Facebook"/>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src={require('../assets/images/site/x.png')}
                        alt="Twitter"/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src={require('../assets/images/site/instagram.png')}
                        alt="Instagram"/>
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                     <img
                        src={require('../assets/images/site/map.png')}
                        alt="Maps"/>
                </a>
            </div>
            <p className="footer-copy">
                Copyright 2024 Nidhi Sharma
            </p>
        </div>
    </footer>
)
}
export default AppFooter;
