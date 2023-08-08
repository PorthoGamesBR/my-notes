import {React, useState, useEffect, useRef} from "react"

function TextArea({initValue, onSubmit}){
    const [textInput, setTextInput] = useState("");
    useEffect(()=>{setTextInput(initValue)},[initValue]);

    const textAreaElm = useRef();

    function onKeyDown(e) {
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            onSubmit(textInput);
        }
    }

    // This function should return the target height for this element
    function calculateHeight() {
        return textAreaElm.current.scrollHeight;
    }

    function calculateLines(oneLineHeight, scrollHeight) {
        const lines = Number.parseInt(scrollHeight / oneLineHeight);

        return lines;
    }

    return (
        <form>
            <textarea ref={textAreaElm} onChange={(e) => setTextInput(e.target.value)} value={textInput} onKeyDown={onKeyDown}style={{resize:"none"}}/>
            <input type="submit" hidden/>
        </form>
    )
}

export default TextArea;