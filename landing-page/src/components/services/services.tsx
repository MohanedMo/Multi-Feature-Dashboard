import Heading from "../heading";
import Image from "../../assets/images/mountainous-5942962_1280.jpg"

import "./services.css"
const Services = () => {
    return ( 
        <section className="services" id="services">
      <div className="container">
        <Heading header={'services'} details={"Don't be busy, be productive"}/>
        <div className="services-content">
          <div className="col">
            <div className="srv">
          <i className="fas fa-print"></i>
          <div className="text">
          <h3>grafic designer</h3>
          <p>Graphic design is the process of visual 
            communication and problem-solving 
            using one or more of typography.</p>
          </div>
          </div>
          <div className="srv">
            <i className="far fa-comment-alt"></i>
            <div className="text">
            <h3>UI & UX</h3>
            <p>Graphic design is the process of visual 
              communication and problem-solving 
              using one or more of typography.</p>
            </div>
          </div>
        </div>
        <div className="col">
        <div className="srv">
          <i className="fab fa-adversal"></i>
          <div className="text">
          <h3>Web Design</h3>
          <p>Web design encompasses many different 
            skills and disciplines in the production 
            and maintenance of websites.</p>
          </div>
        </div>
        <div className="srv">
          <i className="fas fa-desktop"></i>
          <div className="text">
          <h3>Web Development</h3>
          <p>Web development is a broad term for 
            the work involved in developing a web site 
            for the Internet or an intranet.</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="image">
          <img src={Image} alt="Mountain"/>
        </div>
      </div>
      </div>
      </div>
    </section>
     );
}
 
export default Services;