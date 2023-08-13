import React from "react"

function IconButton({icon,onClick}) {
    return <div style={{cursor: "pointer"}} onClick={(e) => onClick(e)}>
        {icon}
    </div>
}

export default IconButton;