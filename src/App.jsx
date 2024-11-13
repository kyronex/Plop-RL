import { useState } from 'react'


function App() {
    const ploping = "PLOPing";
    const plopStyle = {color:"red", backgroundColor:"blue"};
    const jsonFile = "C:/Users/jack_/Documents/Dev/Plop/05409F30417BD8F1A589D1B32318E40A.replay.json"

    const [test,setTest] = useState(0) ;
    console.log(test);

    let contentFile = "";



    const clicking = (e) => {
      setTest(test+1);
    };


  return <>
    <h1 id="plop" style={plopStyle}>PLOP</h1>
    <h1 id={ploping} onClick={clicking} >{ploping} {test}</h1>
    <p>{jsonFile}</p>
  </>
}

export default App
