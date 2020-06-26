import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav/Nav'

function App() {
  

  return (
    <div className='app-container'>
      <Nav/>
      {routes}
    </div>
  )
}

export default App;
