import React from 'react';
import './App.css';
import io from 'socket.io-client'
import routes from './routes'
import Nav from './components/Nav'

function App() {
  

  return (
    <div className='app-container'>
      <Nav/>
      {routes}
    </div>
  )
}

export default App;
