
import React, { useState, useEffect } from "react";
import Counter from "./counter.jsx";
import Buttons from "./buttons.jsx";

const Home = () => {
	const[counter,setCounter] = useState(0); //initialized at 0 seconds
	const[isActive, setIsActive] = useState(false);
	
	useEffect(() => {
		const interval = isActive ? setInterval(() => setCounter(counter => counter + 1), 1000) : null;
		return () => clearInterval(interval);
	  }, [isActive]);

	 // function to extract individual digits from the counter
	function calculateSeconds(aCounter,placeValue){
		return Math.floor(aCounter/placeValue) % 10
	}


	const handleMain = () =>{
		setIsActive(!isActive); // Toggle between true and false

	};
	const handleReset =() => {
		setCounter(0)
		setIsActive(false);
	};


// rendering the Home component
	return (
		<div className="text-center">
			{/* Render the Counter component with digit props */}
			<Counter 
				thousandsDigit= {calculateSeconds(counter, 1000)}
				hundredsDigit= {calculateSeconds(counter,100)}
				tensDigit= {calculateSeconds(counter,10)}
				onesDigit= {calculateSeconds(counter,1)}
			/> 			
			<Buttons handleMain={handleMain} handleReset={handleReset} isActive={isActive} />
     		
		</div>
	);
};

export default Home;
