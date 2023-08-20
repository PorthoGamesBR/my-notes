import { useState } from "react";

function ShowOnHover({children}) {
    const [isHovered, setIsHovered] = useState(false);
    
    const isTouchScreen = () => {
        try{
            document.createEvent("TouchEvent")
            return true;
        }
        catch {
            return false;
        }
    }
    
    return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ minHeight: "0.8vh"}}>
        {!isTouchScreen() ? 
        <div style={{display: isHovered ? "block" : "none"}}>
            {children}
        </div> : 
        <>{children}</>}
    </div>)
}

export default ShowOnHover;