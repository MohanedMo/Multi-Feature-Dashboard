import Heading from "../heading";
import Image from "../../assets/images/300px-Halbin_skyline.jpg"
import "./about.css"

const About = () => {
    return ( 
         <section className="about" id="about">
      <div className="container">
        <Heading header="about" details="Less is more work"/>
          <div className="about-content">
          <div className="image">
              <img src={Image} alt="about"/>
          </div>
          <div className="text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliqui</p>
              <hr/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliqu</p>
        </div>
      </div>
    </div>
    </section>
     );
}
 
export default About;