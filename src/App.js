import React from 'react';
import './App.css';
import io from 'socket.io-client'

function App() {
  const socket = io.connect('http://localhost:3030')

  var chat =  socket.on('welcome', data => {
    console.log(data)
    return data
  })
  console.log(chat)
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
