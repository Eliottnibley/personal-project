import React from 'react';
import './App.css';
import io from 'socket.io-client'
import routes from './routes'

function App() {
  
  
  return (
    <div className='app-container'>
      {routes}
    </div>
  )
}

export default App;
