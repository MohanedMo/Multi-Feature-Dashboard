import { Icon } from "@iconify/react";
import "./state.css"

const State = ({stateNumbers, icon, color} : { stateNumbers: number, icon: string, color: string }) => {
    return ( 
        <div className="state-container">
            <Icon icon={icon} style={{color: color}}/>
            <span>{stateNumbers}</span>
        </div>
     );
}
 
export default State;
