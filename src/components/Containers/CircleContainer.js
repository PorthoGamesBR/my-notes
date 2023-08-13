import "./CircleContainer.css"

function CircleContainer({styles, children}) {
    return <div className="circle-container" style={styles}>{children}</div>
}

export default CircleContainer;