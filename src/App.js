import React, { useState, useEffect } from "react";
// import Clicker from "./Clicker";
import TimerFunc from "./Timer";
// import WithRef from "./Ref";


function App() {
  const [isTimer, setIsTimer] = useState(false);


  return (
    <div className="App">
      <h2>React App: Timer</h2>
      <button onClick={() => setIsTimer(!isTimer)}>Toggle Timer</button>
      {isTimer && <TimerFunc />}
      {/* <TimerFunc /> */}
      {/* <WithRef /> */}
    </div>
  );
}


export default App;
