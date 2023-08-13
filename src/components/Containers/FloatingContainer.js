import "./FloatingContainer.css"

function FloatingContainer({children}) {
    return <div className="floating-container fc-horizontal-middle fc-vertical-bottom">{children}</div>
}

export default FloatingContainer;