import { Icon } from "@iconify/react";
import "./loves.css"

const Loves = ({lovesNumbers} : { lovesNumbers: number }) => {
    return ( 
        <div className="loves-container">
            <Icon icon="flat-color-icons:like" />
            <span>{lovesNumbers}</span>
        </div>
     );
}
 
export default Loves;
