import React, { useRef, useEffect, useState } from "react";

export default function Countdown() {
    //useState to initialize the num state to 60 since we’ll start our countdown from 60
  const [num, setNum] = useState(60);
    //pause state initialized to false
  const [pause, setPause] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  
  useEffect(() => {
    const id = setInterval(() => {
        setNum((num) => num - 1);
      }, 1000);

       // Save the interval ID in state
    setIntervalId(id);
  
           //component unmount:cleanup function to clear the interval when the component unmounts
           return () => clearInterval(id)
       }, [])
    
       const handleClick = () => {
        if (!pause) {
          clearInterval(intervalId); // Clear the interval to pause the countdown
        } else {
          // Start a new interval if resuming from pause
          const newIntervalId = setInterval(() => {
            setNum((num) => num - 1);
          }, 1000);
    

      // Update the interval ID in the state
      setIntervalId(newIntervalId);
    }
    setPause((prev) => !prev);
  };
  
  return (
    <div className="countdown-container d-flex justify-content-center align-items-center m-5">
        <div className="icon-sandclock"><i class="fas fa-hourglass-end"></i></div>
        {/*display our number*/}
        <div className= "wrapper flex-column">
      <div className="countdown mb-3">{num}</div>
        {/*button which displays “Run” or “Pause” depending on the value of our pause state*/}
      <button className="btn btn-lg btn-secondary" onClick={handleClick}>{pause ? "Run" : "Pause"}</button>
      </div>
    </div>
  );
}