import React, { useState } from "react";

const StateTutorial = () => {
    const [inputValue, setInputValue] = useState("Osiel");
    let onChange = (event) => {
        const newValue = event.target.value; /// This is how you target the input value and make it a new value;
        setInputValue(newValue);
    }

    return (
        <>

        <input placeholder="Enter something..." onChange={onChange} />
        {inputValue}

        </>
    )
}

export default StateTutorial;