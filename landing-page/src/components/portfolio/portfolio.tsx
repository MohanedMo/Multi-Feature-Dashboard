import Heading from "../heading";
import Image1 from "../../assets/images/anemone-2396299_1920.jpg"
import Image2 from "../../assets/images/butterfly-1278820_1920.jpg"
import Image3 from "../../assets/images/garden-19830_1920.jpg"

import "./portfolio.css"

const Portfolio = () => {
    const portfolio = [
        {
            photo: Image1,
            header: 'Project here',
            pargraph: "My creative ability is very difficult to measure because it can manifest in so many surprising and."
        },
        {
            photo: Image2,
            header: 'Project here',
            pargraph: "My creative ability is very difficult to measure because it can manifest in so many surprising and."
        },
        {
            photo: Image3,
            header: 'Project here',
            pargraph: "My creative ability is very difficult to measure because it can manifest in so many surprising and."
        }
    ]
    return ( 
        <section className="portfolio" id="portfolio">
      <div className="container">
        <Heading header="portfolio" details="If you do it right, it will last forever."/>
        <div className="port-content">
            {portfolio.map((project, index) =>(
          <div key={index} className="col">
            <img src={project.photo} alt={project.header}/>
            <div className="text">
              <h4>{project.header}</h4>
              <p>{project.pargraph}</p>
            </div>
          </div>
            ))}
      </div>
      </div>
    </section>
     );
}
 
export default Portfolio;