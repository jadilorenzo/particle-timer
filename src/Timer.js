import React, { Component } from 'react';
import Api from './Api';

const MAX_SECONDS = 5999;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.api = new Api();
  }

  addSeconds(seconds) {
    this.setState((prevState) => {
      return { seconds: Math.min(MAX_SECONDS, prevState.seconds + seconds) };
    });
  }

  addMinute() {
    this.addSeconds(60);
  }

  addHalfMinute() {
    this.addSeconds(30);
  }

  addQuarterMinute() {
    this.addSeconds(15);
  }

  startTimer() {
    this.api.send(this.state.seconds.toString());
  }

  resetTimer() {
    this.api.send('reset');
  }

  pauseTimer() {
    this.api.send('pause');
  }

  resumeTimer() {
    this.api.send('resume');
  }

  timecode() {
    const { seconds } = this.state;

    const digit1 = Math.floor(seconds / 60 / 10);
    const digit2 = Math.floor(seconds / 60 % 10);
    const digit3 = Math.floor((seconds % 60) / 10);
    const digit4 = Math.floor(seconds % 10);

    return `${digit1}${digit2}:${digit3}${digit4}`;
  }

  render() {
    return (
      <div>
        <h1>Timer {this.state.title}</h1>
        <h2>{this.timecode()}</h2>
        <div>
          <button id="addMinute" onClick={this.addMinute.bind(this)}>+1m</button>
          <button id="addHalfMinute" onClick={this.addHalfMinute.bind(this)}>+30s</button>
          <button id="addQuarterMinute" onClick={this.addQuarterMinute.bind(this)}>+15s</button>
        </div>
        <div>
          <button id="startTimer" onClick={this.startTimer.bind(this)}>Start</button>
          <button id="resetTimer" onClick={this.resetTimer.bind(this)}>Reset</button>
          <button id="pauseTimer" onClick={this.pauseTimer.bind(this)}>Pause</button>
          <button id="resumeTimer" onClick={this.resumeTimer.bind(this)}>Resume</button>
        </div>
      </div>
    );
  }
}

export default Timer;
