import React, { useEffect, useState } from 'react';
import './App.css';
import DonationsList from './components/DonationsList';
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  useEffect(() => {
    if (localStorage.getItem('mode') && localStorage.getItem('mode') === 'light') {
      setDarkMode(false)
    } else {
      setDarkMode(true)
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen bg-[${darkMode ? '#121212' : '#FFF'}]`}>
      <Navbar
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />

      <div className='pt-[60px]'>
        <DonationsList
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
