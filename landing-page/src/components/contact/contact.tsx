import Heading from "../heading";
import "./contact.css"

const Contact = () => {
    return ( 
        <section className="contact" id="contact">
      <div className="container">
        <Heading header="contact" details="we are born to create"/>
        <div className="text">
          <h2>Feel free to drop us a line at:</h2>
          <a href="mailto: mmhnd951@gmail.com">mmhnd951@gmail.com</a>
          <p>Find us on social networks:</p>
            <a href="#"><i className="fas fa-globe"></i></a>
            <a href="#"><i className="fab fa-google-plus-g"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
    </section>
     );
}
 
export default Contact;