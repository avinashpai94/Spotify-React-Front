import React from 'react';
import next from './icons/next.png';
import pause from './icons/pause.png';
import play from './icons/play.png';
import previous from './icons/previous.png';
import repeat from './icons/repeat.png';
import shuffle from './icons/shuffle.png';
import './App.css';
import './css/button-sheet.css';
var request = require('request');

let el;
let playing;
let repeating;
let shuffling;
let response_object;

function play_song(){
  fetch('http://localhost:8888/play', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
  }).catch(function (err) {
    console.log(err);
  })
}

function next_song() {
  fetch('http://localhost:8888/next', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
  }).catch(function (err) {
    console.log(err);
  })
}


function prev_song() {
  fetch('http://localhost:8888/prev', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
  }).catch(function (err) {
    console.log(err);
  })
}

function shuffle_song() {
  fetch('http://localhost:8888/shuffle', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
  }).catch(function (err) {
    console.log(err);
  })
}

function repeat_song() {
  fetch('http://localhost:8888/repeat', {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
  }).catch(function (err) {
    console.log(err);
  })
}

async function player_state() {
  const response = await fetch('http://localhost:8888/player_state');
  const json = await response.json();
  return json;
}


// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
function clickHandler(props){
    switch(props.target.id){
      case 'shuffle-button':
        shuffle_song();
        break;
      case 'prev-button':
        prev_song();
        break;
      case 'play-button':
        play_song();
        if(playing){
          props.target.src=pause;
        }else{
          props.target.src=play;
        }
        playing = !playing;
        break;
      case 'next-button':
        next_song();
        break;
      case 'repeat-button':
        repeat_song();
        break;      
    }
}

const ButtonIcon = props => {
  return <img id={props.id} className = {props.className} src ={props.src} alt={props.alt} onClick={clickHandler} path ={`/${props.path}`}/>
}



class Spotify_remote extends React.Component {

  state = {
    is_name : '',
    is_playing : false,
    is_repeating : false, 
    is_shuffling : false
  }

  constructor(props){
    super(props)
  }

  async componentDidMount(){
    const response = await player_state();
    console.log(response.name)
    this.setState({
        is_name : response.name,
        is_playing: response.is_playing,
        is_repeating: response.repeat_state,
        is_shuffling: response.shuffle_state
    })
  }

  
  render() {
    return (
      <div className="main-container" id='main'>
        <div className='seek-container'>
        <div className='seek-icon' id='song-name'><span>{this.state.is_name}</span></div>
        {/* <div className='seek-icon' id='song-artist'></div>
        <div className='seek-icon' id='song-artwork'></div>
        <div className='seek-icon' id='song-seek'></div>
        <div className='seek-icon' id='song-pos'></div> */}
        </div>
        <div className='button-container'>
          <ButtonIcon id='shuffle-button' className='button-icon' src={shuffle} alt="shuffle"/>
          <ButtonIcon id='prev-button' className='button-icon' src={previous} alt="prev"/>
          <ButtonIcon id='play-button' className='button-icon' src={this.state.is_playing ? pause : play} alt="play"/>
          <ButtonIcon id='next-button' className='button-icon' src={next} alt="next"/>
          <ButtonIcon id='repeat-button' className='button-icon' src={repeat} alt="repeat"/>
        </div>
      </div>
    );
  }
}

export default Spotify_remote;
