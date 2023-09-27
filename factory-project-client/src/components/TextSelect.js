import React, { useState } from 'react';

function TextSelect(props) {
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
            <select id={props.propName} name={props.propName} onChange={onChange}  >
                <option name="select" value="">Select</option>
                {
                    props?.options?.map(option => (<option selected={option === value} value={option}>{option}</option>))
                }
            </select>
            {!isValid && <span>Not Valid</span>}
        </div>
    );
}

export default TextSelect;