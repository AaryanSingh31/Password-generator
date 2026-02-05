  import { useState, useCallback, useEffect, useRef} from 'react' //Added usecallback hook useRef hook for Copy pass

  function App() {
    const [length, setLength] = useState(8); //for Length of password
    const[numberAllowed, setNumberAllowed] = useState(false); //For number checkbox
    const[charAllowed, setCharAllowed] = useState(false); //for char checkbox
    const[pass, setPass] = useState("");
    const[copy, setCopy] = useState("copy")
    const [color, setColor] = useState("blue")
    //useRef hook
    let passRef = useRef(null)

    const passGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //Random letters will be picked from here according to length
      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%&*";
      
      for(let i = 1; i <= length; i++){
        let char = Math.floor(Math.random()*str.length);
        pass += str.charAt(char);
      }

      setPass(pass);
      setCopy("Copy");
      setColor("blue")
    }, 
    [length, numberAllowed, charAllowed, setPass])

    const copyPass = useCallback(() => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(pass); //Copy wala Code
    });

      useEffect(() => {
      passGenerator();
    }, [length, numberAllowed, charAllowed, passGenerator])

    const changeText = () => {
        setCopy("Copied");
        setColor("green");
      }
    
    return (
      <>
        <div className="w-full max-w-3xl mx-auto shadow-lg bg-gray-900 text-orange-500 px-8 py-10 my-8 rounded-2xl">
    <h1 className='text-white text-center my-3 text-xl'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-800">
      <input 
        type="text"
        value={pass}
        className='outline-none w-full py-2 px-3 bg-white text-gray-900 selection:bg-blue-200'
        placeholder='Password'
        readOnly
        ref={passRef}
      />
      <button onClick={() => {copyPass(); changeText();}}
      className='outline-none text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 transition-all'
      style={{backgroundColor: color}}>
        {copy}
      </button>
    </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed(prev => !prev);
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>        
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id='charInput'
          onChange={() => {
            setCharAllowed(prev => !prev);
          }}
          />
           <label htmlFor='charInput'>Characters</label>        
          </div>
        </div>
      </div>
    </>
    )
  }
  export default App
