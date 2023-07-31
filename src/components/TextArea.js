import {React, useState, useEffect} from "react"

function TextArea({initValue, onSubmit}){
    const [textInput, setTextInput] = useState("");
    useEffect(()=>{setTextInput(initValue)},[initValue]);

    function onKeyDown(e) {
        if(e.keyCode == 13 && e.shiftKey == false){
            e.preventDefault();
            onSubmit(textInput);
        }
    }

    return (
        <form>
            <textarea onChange={(e) => setTextInput(e.target.value)} value={textInput} onKeyDown={onKeyDown}style={{resize:"none"}}/>
            <input type="submit" hidden/>
        </form>
    )
}

export default TextArea;