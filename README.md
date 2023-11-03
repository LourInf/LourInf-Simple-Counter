# Simple Counter using React JS

![image](https://github.com/LourInf/LourInf-Simple-Counter/assets/117685514/2049aa7e-d33f-43e0-8d7a-08172bf2978b)


## Main learnings:

1. **useState hook**:

        const [counter, setCounter] = useState(0);
        const [isActive, setIsActive] = useState(false);
- Destructuring Assignment: _const [counter, setCounter] = useState(0)_: Uses destructuring assignment to create a state variable named counter and a function named setCounter to update it. Similarly, _const [isActive, setIsActive] = useState(false)_ creates a state variable named isActive and a function named setIsActive. So we have 2 parts:
    - the state Variable: in this project, "counter" holds the state for counting seconds. It is initialized at 0. Similarly, "isActive" represents the state for tracking whether a component is active or not (e.g., whether the timer is running). It is initialized as false.
    - the function to update the state: "setCounter" allows us to update the value of the "counter" state variable. Similarly, "setIsActive" allows us to update the value of the "isActive" state variable.
- When we want to update the state, we call the function returned by useState with the new value. React then re-renders the component with the updated state:

        setCounter(counter => counter + 1)

    - Note: Because state updates are asynchronous, we need to ensure that the correct latest state is used. We can do that by using the functional form of "setCounter" so React guarantees that it will provide the latest state value as an argument to the function. If we would use _setCounter(counter + 1)_ the counter might be incremented just once.
      
2. **setInterval**:

       setInterval(callback, delay, param1, param2, ...);
- It's a built-in JavaScript function that is used to repeatedly execute a provided function at specified intervals. It's commonly used for tasks that require periodic execution, such as animations, timers, or any situation where you want to perform an action at regular intervals.
- Breaking down the function:
    - callback: The function to be executed at each interval.
    - delay: The time, in milliseconds, between each execution of the function.
    - param1, param2, ...: (Optional) Additional parameters to pass to the callback function.
    - Return Value: setInterval returns a numeric ID that uniquely identifies the interval. This ID can be used to later clear or cancel the interval.
- Clearing the Interval: To stop the interval and prevent further executions, you can use the clearInterval function, passing the interval ID as an argument.

        clearInterval(interval);
   
4. **useEffect hook**:

       useEffect(() => {
	   const interval = isActive ? setInterval(() => setCounter(counter => counter + 1), 1000) : null;
	   return () => clearInterval(interval);
       }, [isActive]);

- Used to perform side effects in functional components. It's typically employed for tasks that happen after the component renders.
- Here it sets up and initiatize the timer (using setInterval) for updating (in this case, we want to increment) the counter every second, and to clean up the timer with clearInterval.
- Effects and Lifecycle Simulation with useEffect:
    - useEffect simulates lifecycle methods by running code after each render.
    - In this case, setInterval inside useEffect mimics a timer, incrementing the counter every second when isActive is true.
- Dependency Array([ ]): The useEffect hook has a dependency array [isActive], specifying that the effect should run whenever the "isActive" state changes. This prevents memory leaks and ensures proper cleanup.
- If isActive is true, the timer is set up with setInterval to increment the counter every second. If isActive is false, the timer is set to null, pausing the countdown.
- Cleanup Function (return statement): runs when the component is unmounted or when the "isActive" state changes (due to the dependency array [isActive]).The cleanup function uses clearInterval(interval) to stop the interval to prevent any ongoing executions after being no longer in use.

       return () => clearInterval(interval)


3. The "calculateSeconds" function is created for the props in order to extract individual digits from the counter:
   
       function calculateSeconds(aCounter, placeValue) {
         return Math.floor(aCounter / placeValue) % 10;
          }
   
- We pass two parameters: "aCounter" and "placeValue":
    - aCounter: This is the counter value from which we want to extract digits.
    - placeValue: This represents the place value of the digit we want to extract (e.g., ones, tens, hundreds, thousands).
    - Mathematical Operation:
        - "Math.floor(aCounter / placeValue)": This division calculates how many times the placeValue fits into aCounter. For example, if placeValue is 100 and aCounter is 456, the result of this division would be 4.
        - "% 10": The modulus operation (%) is used to get the remainder after the division by 10. This operation effectively extracts the last digit of the result obtained from the division.
        - Return Value: The final result is the last digit of the division, representing the digit at the specified place value.
      
  
4. Props:
- Used to pass data from a parent component ("Home") to a child component ("Counter"). The Counter component receives individual digit props (thousandsDigit, hundredsDigit, tensDigit, and onesDigit).
- The props are calculated by calling the "calculateSeconds" function with two arguments: the current value of the counter, and the digit at the 1, 10, 100 and 1000 place of the counter, so we are able to break down the "counter" into its individual digits and pass them as props to the "Counter" component:

        //rendering the Home component
          return (
            <div className="text-center">
      		{/* Render the Counter component with digit props */}
      		<Counter thousandsDigit= {calculateSeconds(counter, 1000)}
      		hundredsDigit= {calculateSeconds(counter,100)}
      		tensDigit= {calculateSeconds(counter,10)}
      		onesDigit= {calculateSeconds(counter,1)}
             />
            </div>
          );
      
- So the props are set to the result of the "calculateSeconds" function where:
    - "aCounter" becomes "counter" (the current value of the counter variable).
    - "placeValue" becomes 1, 10, 100, and 1000 argument. 

5. Button component and button Handlers:
- The Buttons component receives props (handleMain, handleReset, and isActive) to control button behavior. Buttons' text is conditionally rendered based on the "isActive" state (the "Start/Pause" button dynamically changes its text based on the isActive state). And the click events on these buttons trigger the associated functions (handleMain and handleReset) passed as props:

          const Buttons = ({ handleMain, handleReset, isActive }) => {
          return (
            <div className="btn-group-vertical bt-group sm" role="group">
              <button type="button" className="btn btn-outline-success btn-lg m-2 p-3 fw-bold" onClick={handleMain}>
                {isActive ? "Pause" : "Start"}
              </button>
              <button type="button" className="btn btn-outline-danger btn-lg m-2 p-3 fw-bold" onClick={handleReset}>
                {"Reset"}
              </button>
            </div>
          );
        };

- "handleMain" toggles the value of the "isActive" state, simulating the start/pause functionality, while "handleReset" resets the counter to zero and sets the "isActive" state to false, simulating a reset functionality:

          const handleMain = () =>{
                setIsActive(!isActive); // Toggle between true and false
        
        	};
          const handleReset =() => {
                setCounter(0)
        	setIsActive(false);
        	};
