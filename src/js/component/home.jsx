
import React, { useState, useEffect } from "react";
import Counter from "./counter.jsx";
import Countdown from "./countdown.jsx";

const Home = () => {
	//inside Home function we apply the useState hook to manage the counter variable and its update function
	const[counter,setCounter] = useState(0); //initialized at 0 seconds

	 // useEffect hook to run code after each render, simulating component lifecycle
	useEffect(() => {
	 // setInterval to update the counter every second
		const interval = setInterval(() => {
			//component mounting: using the setCounter function to increment the counter
			setCounter(counter => counter +1)
		},1000) 
		//component unmount:cleanup function to clear the interval when the component unmounts
		return () => clearInterval(interval)
	}, [counter]) // Dependency array to specify when the effect should run

	 // function to extract individual digits from the counter
	function calculateSeconds(aCounter,placeValue){
		return Math.floor(aCounter/placeValue) % 10
	}

// rendering the Home component
	return (
		<div className="text-center">
			<>
			{/* Render the Counter component with digit props */}
			<Counter thousandsDigit= {calculateSeconds(counter, 1000)}
			hundredsDigit= {calculateSeconds(counter,100)}
			tensDigit= {calculateSeconds(counter,10)}
			onesDigit= {calculateSeconds(counter,1)}
			/>
			{counter} {/* {counter} dynamically displays the current value of the counter variable. */}

			<Countdown />
			</>

		</div>
	);
};

export default Home;
