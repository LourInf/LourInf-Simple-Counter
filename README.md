# Simple Counter using React JS

![image](https://github.com/LourInf/LourInf-Simple-Counter/assets/117685514/934fe51d-3baa-4f55-839d-47b33003af96)

## Main learnings:

1. **useState hook**:

        const [counter, setCounter] = useState(0);
- Great for monitoring various counts, such as the amount of text written, remaining work, or the number of clicks. In this project, it serves as a container for tracking and updating our counter, functioning like a compact memory space.
- It returns an array with 2 elements:
    - The first element is a variable which holds the current state value ("counter"), responsible for storing and representing the current state of the counter.
    - Second element is a function ("setCounter") that facilitates the updating of the "counter" state, allowing us to modify the counter value as needed.
- Since our counter is a number, we initialize the counter state to 0seconds.
- When we want to update the state, we call the function returned by useState with the new value. React then re-renders the component with the updated state:

            setCounter(counter + 1);

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
                  const interval = setInterval(() => {
                    setCounter(counter => counter + 1);
                  }, 1000);
                
                  return () => clearInterval(interval);
                }, [counter]);

- Used to perform side effects in functional components. It's typically employed for tasks that happen after the component renders.
- Here it sets up and initiatize the timer (using setInterval) for updating (in this case, we want to increment) the counter every second, and to clean up the timer with clearInterval.
- Effects and Lifecycle Simulation with useEffect:
    - The useEffect hook is used to simulate lifecycle methods. It runs code after each render.
    - setInterval is employed inside useEffect to increment the counter every second, mimicking a timer.
- Dependency Array([...]): The useEffect hook has a dependency array [counter], specifying that the effect should run whenever the counter state changes. This prevents memory leaks and ensures proper cleanup.
- Cleanup Function (return statement): This function runs when the component is unmounted or when the "counter" variable changes (due to the dependency array [counter]).The cleanup function uses clearInterval(interval) to stop the interval to prevent any ongoing executions after being no longer in use.

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
      			{counter} {/* dynamically displays the current value of the counter variable. */}
      			</>
      		</div>
          );
      
- So the props are set to the result of the "calculateSeconds" function where:
    - "aCounter" becomes "counter" (the current value of the counter variable).
    - "placeValue" becomes 1, 10, 100, and 1000 argument. 
