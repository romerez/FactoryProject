import React, { useState } from 'react';

function TextInput(props) {
    const [isValid, setIsValid] = useState();
    const [value, setValue] = useState(props?.value);

    const onChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue)
        if (props?.checkValid(inputValue)) {
            setIsValid(true)
            props?.onChange(props?.propName, inputValue, true)
        }
        else {
            setIsValid(false)
            props?.onChange(props?.propName, inputValue, false)

        }
    }

    return (
        <div>
            <span>{props?.text}</span>
            <input onChange={onChange} type={props?.type} value={value} />
            {!isValid && <span>Not Valid</span>}
        </div>
    );
}

export default TextInput;