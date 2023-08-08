import {React, useState, useEffect, useRef} from "react"

function TextArea({initValue, onSubmit}){
    const [textInput, setTextInput] = useState("");
    const [lines, setLines] = useState(2);
    useEffect(()=>{setTextInput(initValue)},[initValue]);

    const textAreaElm = useRef();

    function onKeyDown(e) {
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            onSubmit(textInput);
        }
    }

    function onKeyUp(e) {
        // TODO: Get this value dinamicaly by checking the size of this element with a single line
        setLines(calculateLines(15, calculateHeight()));
    }

    // This function should return the target height for this element
    function calculateHeight() {
        // TODO: Get this value from a not resized textarea, to get the real scrollHeight (auto shrink)
        return textAreaElm.current.scrollHeight;
    }

    function calculateLines(oneLineHeight, scrollHeight) {
        const lines = Number.parseInt(scrollHeight / oneLineHeight);

        return lines;
    }

    return (
        <form>
            <textarea ref={textAreaElm} onChange={(e) => setTextInput(e.target.value)} value={textInput} 
            rows={lines}
            onKeyDown={onKeyDown} onKeyUp={onKeyUp} style={{resize:"none"}}/>
            <input type="submit" hidden/>
        </form>
    )
}

export default TextArea;