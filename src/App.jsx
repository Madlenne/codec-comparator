import { io } from "socket.io-client";
import clips from './clips.png';
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import css from './App.module.scss'
import { Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Conversion from './Conversion';

function App() {

  // async function myFunction(event) {
  //   event.preventDefault();
  //   document.getElementById("messages").innerHTML = "Hello World";
  //   // var file = document.getElementById("file").files[0].name;
  //   var to = document.getElementById("to").value;
  //   var withCodec = document.getElementById("with").value;

  //   // var data = new FormData()
  //   // data.append('file', document.getElementById("file").files[0]);

  //   console.log('aaaa', to, withCodec);
  //   // fetch("/test")
  //   // .then(res => {
  //   //     console.log(res);
  //   // })

  //   const data = new FormData();
  //   data.append('to', to);
  //   data.append('withCodec', withCodec);

  //  await axios.post("http://localhost:5000/test", data, { 
  //     // receive two    parameter endpoint url ,form data
  //     })
  //   .then(res => { // then print response status
  //       console.log(res.statusText)
  //   })

    // await fetch("http://localhost:5000/test", {
    //   method: "post",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*",
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   //make sure to serialize your JSON body
    //   body: JSON.stringify({
    //     // file: file,
    //     to: to,
    //     with: withCodec
    //   })
    // })
    // .then((response) => response.text())
    // .then(response => {
    //     console.log('aaa ', response);
    // })
    
  // }

//   useEffect(() => {
//     var socket = io('http://localhost:5000');
    
//     socket.on('progress', function(msg) {
//       console.log("MSG!!!! ", msg);
  
//       var messages = document.getElementById('messages')
//       var item = document.createElement('li');
//         item.textContent = msg.progress;
//         messages.appendChild(item);
//     });
  
//     socket.on('progress2', function(msg) {
//       console.log("MSG2!!!! ", msg);
  
//       var messages = document.getElementById('messages2')
//       var item = document.createElement('li');
//         item.textContent = msg.progress;
//         messages.appendChild(item);
//     });
//   },[])
  

//   const [videoFile, setVideoFile] = useState(null);

//   const onChangeHandler = async (event) => {
//     console.log(event.target.files[0]);
//     setVideoFile(event.target.files[0]);

//     const data = new FormData();
//     data.append('file', event.target.files[0]);

//     await axios.post("http://localhost:5000/convert", data, { 
//       // receive two    parameter endpoint url ,form data
//       })
//     .then(res => { // then print response status
//         console.log(res.statusText)
//     })
//   }

//   const  onClickHandler = async () => {
//     console.log('aaa');
//     const data = new FormData();
//     data.append('file', videoFile);

//     await axios.post("http://localhost:5000/convert", data, { 
//       // receive two    parameter endpoint url ,form data
//       })
//     .then(res => { // then print response status
//         console.log(res.statusText)
//     })
// }

  return (
    <Switch>
      <Route path='/' exact component={WelcomePage} />
      <Route path='/convert' exact component={Conversion} />
    </Switch>
  );
}

export default App;
