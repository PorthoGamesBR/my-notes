import {React, useState, useEffect, useRef} from "react"

function TextArea({initValue, onSubmit}){
    const [textInput, setTextInput] = useState("");
    useEffect(()=>{setTextInput(initValue)},[initValue]);

    const textAreaElm = useRef();

    function onKeyDown(e) {
        calculateHeight();
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            onSubmit(textInput);
        }
    }

    function calculateHeight() {
        console.log(textAreaElm.current.scrollHeight)
    }

    return (
        <form>
            <textarea ref={textAreaElm} onChange={(e) => setTextInput(e.target.value)} value={textInput} onKeyDown={onKeyDown}style={{resize:"none"}}/>
            <input type="submit" hidden/>
        </form>
    )
}

export default TextArea;