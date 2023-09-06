import {React, useState, useEffect, useRef} from "react"

function TextArea({initValue, onSubmit, onValueChange, style}){
    const [textInput, setTextInput] = useState("");
    useEffect(()=>{setTextInput(initValue)},[initValue]);

    const textAreaElm = useRef();

    function onKeyDown(e) {
        onValueChange(textInput)
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            onSubmit(textInput);
        }
    }

    // This function should return the target height for this element
    function calculateHeight(textAreaElement) {
        return textAreaElement.scrollHeight;
    }

    useEffect(() => {
        textAreaElm.current.style.height=0;
        const newHeight = calculateHeight(textAreaElm.current,2);
        textAreaElm.current.style.height= newHeight+"px";
    },[textInput])

    return (
        <form>
            <textarea ref={textAreaElm} onChange={(e) => setTextInput(e.target.value)} value={textInput} onKeyDown={onKeyDown} rows="1" style={{...style, resize:"none"}} />
            <input type="submit" hidden/>
        </form>
    )
}

export default TextArea;