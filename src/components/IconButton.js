import React from "react"

function IconButton({icon,onClick}) {
    return <div onClick={(e) => onClick(e)}>
        {icon}
    </div>
}

export default IconButton;