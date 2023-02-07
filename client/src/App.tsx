import React, { useEffect, useState } from 'react';
import './App.css';
import DonationsList from './components/DonationsList';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom'
import Donation from './components/Donation';
import CreateDonation from './components/CreateDonation';
import ConnectWallet from './components/ConnectWallet';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [connectedWallet, setConnectedWallet] = useState<boolean>(false)
  useEffect(() => {
    if (localStorage.getItem('mode') && localStorage.getItem('mode') === 'light') {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#FFF'
      setDarkMode(false)
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#121212'
      setDarkMode(true)
    }
  }, [darkMode])

  if (connectedWallet) {
    return (
      <ConnectWallet />
    )
  }

  return (
    <div className={`bg-[${darkMode ? '#121212' : '#FFF'}]`}>

      <Navbar
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route
          path='/home'
          element={
            <DonationsList
              darkMode={darkMode}
            />}
        />

        <Route
          path='/donation'
          element={
            <Donation
              darkMode={darkMode}
            />
          }
        />

        <Route
          path='/create'
          element={
            <CreateDonation
              darkMode={darkMode}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
