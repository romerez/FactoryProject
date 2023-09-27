import './App.css';
import Home from './components/Home'
import React, { useState, useEffect } from 'react';
import { handCheck } from './services/workers';

function App() {
  useEffect(() => {
    handCheck();
  })

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
