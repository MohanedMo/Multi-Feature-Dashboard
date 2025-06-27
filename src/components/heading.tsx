const Heading = ({header, details}: {header: string, details: string}) => {
    return ( 
        <>
        <h2 className="personal-heading">{header}</h2>
        <p>{details}</p>
        </>
     );
}
 
export default Heading;