import "./loading.css"

const LoadingComponent = () => {
    return ( 
        <div className="container">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Blog Posts Dashboard</h1>
          </div>
          <div className="card-content">
            <div className="skeleton skeleton-input"></div>
            <div style={{ marginTop: "1rem" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton skeleton-row"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default LoadingComponent;