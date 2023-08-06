import "./FlexContainer.css"

function FlexContainer({ column, className, children }) {
    // By default is line based (flex-directon: row). If column is true, add column class to className
    const isColumn = column ? "column " : ""

    return <div className={"flexbox " + isColumn + className}>{children}</div>
}

export default FlexContainer;