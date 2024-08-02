import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="app-container bg-cyan-500">
      <div className="main-body bg-cyan-500 w-full max-w-lg mx-auto shadow-2xl rounded-lg px-8 py-10 my-8 text-white">
        <h1 className="text-center text-3xl font-bold mb-6">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-white text-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 text-white px-5 py-3 shrink-0 hover:bg-blue-800"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col text-lg gap-y-6">
          <div className="flex items-center justify-between gap-x-4">
            <label className="font-semibold">Length: {length}</label>
            <div className="flex items-center gap-x-4">
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setLength((prev) => Math.max(6, prev - 1))}
              >
                -
              </button>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                onClick={() => setLength((prev) => Math.min(100, prev + 1))}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="numberInput" className="font-medium">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="characterInput" className="font-medium">Include Characters</label>
          </div>
        </div>
      </div>
      <style jsx>{`
        .app-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: 1600% 1600%;
          
        }
         `}</style>
    </div>
  );
}

export default App;
