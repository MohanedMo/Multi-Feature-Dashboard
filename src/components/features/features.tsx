import "./features.css"
const Features = () => {
    const features = [
        {
        icon: "fas fa-laptop-house",
        header: "tell us your idea",
        pragraph: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea ipsum eius,"
        },
        {
        icon: "fas fa-flask",
        header: "we will do all the work",
        pragraph: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea ipsum eius,"
        },
        {
        icon: "fas fa-globe-americas",
        header: "yours products is worldwide",
        pragraph: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea ipsum eius,"
        },
]
  return (
    <section className="features">
      <div className="container">
        {features.map((feat, index) => (
        <div key={index} className="feat">
          <i className={feat.icon}></i>
          <h3>{feat.header}</h3>
          <p>{feat.pragraph}</p>
        </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
