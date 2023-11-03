//import react
import React from "react";


//create component, taking props as parameters.
function Counter (props){
    return(
        <>
            <div className="container d-flex mt-5 justify-content-center align-items-center">
            <div className="clock-icon"><i className="far fa-clock"></i></div>
         {/* display each digit of the counter */}
            <div className="seconds Thousands">{props.thousandsDigit}</div>
            <div className="seconds Hundreds">{props.hundredsDigit}</div>
            <div className="seconds Tens">{props.tensDigit}</div>
            <div className="seconds Ones">{props.onesDigit}</div>
            </div>
        </>
    );

}

export default Counter;

