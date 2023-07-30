import {React, useState} from 'react'

function TextInput({ onSend }) {
    const [textValue, setTextValue] = useState("");

    function onSubmit(e) {
        e.preventDefault()
        if(onSend) onSend(textValue);
        setTextValue("");
    }
    

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text"  
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}             
            />
            <input type="submit" hidden/>
        </form>
    )
}

export default TextInput;