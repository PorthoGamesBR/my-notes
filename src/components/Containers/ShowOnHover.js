import { useState } from "react";

function ShowOnHover({children}) {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ minHeight: "0.8vh"}}>
        <div style={{display: isHovered ? "block" : "none"}}>
            {children}
        </div>
    </div>)
}

export default ShowOnHover;