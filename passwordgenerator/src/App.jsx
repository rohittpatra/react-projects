import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

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
    <div className=" flex items-center justify-center h-screen w-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-lg bg-gray-700 shadow-xl rounded-2xl p-6 text-white">
        <h1 className='text-2xl font-bold text-center mb-4 text-orange-400'>Password Generator</h1>
        <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-transparent text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 font-medium transition-all'
          >
            Copy
          </button>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <label className='text-lg'>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full ml-4'
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-lg">Include Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              className="w-5 h-5 accent-orange-500 cursor-pointer"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-lg">Include Symbols</label>
            <input
              type="checkbox"
              id="characterInput"
              className="w-5 h-5 accent-orange-500 cursor-pointer"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
