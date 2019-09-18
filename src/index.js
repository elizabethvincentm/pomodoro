import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const defaultClockState = {
  sLength: 25,
  bLength: 5,
  timeLeft: 1500,
  curTimer: "session",
  timerState: "off",
  interval: "",
  clockAnimation: { animation: "none" }
};
let accurateInterval = function(fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function() {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultClockState;
    this.setSLength = this.setSLength.bind(this);
    this.setBLength = this.setBLength.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }
  setSLength(op) {
    if (this.state.timerState == "on") return;

    let val = this.state.sLength;
    if (op === "+" && val < 60) val++;
    else if (op === "-" && val > 1) val--;

    this.setState({
      sLength: val,
      timeLeft:
        this.state.curTimer === "session" ? val * 60 : this.state.timeLeft
    });
  }
  setBLength(op) {
    let val = this.state.bLength;
    if (this.state.timerState == "on") return;

    if (op === "+" && val < 60) val++;
    else if (op === "-" && val > 1) val--;

    this.setState({
      bLength: val,
      timeLeft: this.state.curTimer === "break" ? val * 60 : this.state.timeLeft
    });
  }
  decrementTimer() {
    let timeLeft, curTimer;
    timeLeft = this.state.timeLeft - 1;
    this.setState({ timeLeft: timeLeft });
    if (timeLeft == 0) this.music.play();
    if (timeLeft < 61) {
      this.setState({
        clockAnimation: { animation: "clock-alert 1s infinite alternate" }
      });
    }
    if (timeLeft < 0) {
      curTimer = this.state.curTimer == "session" ? "break" : "session";
      timeLeft =
        curTimer == "session"
          ? this.state.sLength * 60
          : this.state.bLength * 60;
      this.setState({
        timeLeft: timeLeft,
        curTimer: curTimer,
        clockAnimation: { animation: "none" }
      });
    }
  }
  handleTimer() {
    let timeLeft;
    if (this.state.timerState == "on") {
      this.setState({
        timerState: "off",
        clockAnimation: { animation: "none" }
      });
      this.state.interval && this.state.interval.cancel();
    } else {
      this.setState({
        timerState: "on",
        interval: accurateInterval(() => this.decrementTimer(), 1000)
      });
    }
  }
  resetTimer() {
    this.setState(defaultClockState);
    this.state.interval && this.state.interval.cancel();
    this.music.pause();
    this.music.currentTime = 0.2;
  }

  displayTime() {
    let min = Math.floor(this.state.timeLeft / 60);
    let sec = this.state.timeLeft - min * 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;
    return min + ":" + sec;
  }
  render() {
    return (
      <div id="pomodoro">
        <div id="clock-title">Pomodoro Clock</div>
        <div id="clock-display" style={this.state.clockAnimation}>
          <div id="timer-label">{this.state.curTimer}</div>
          <div id="time-left" class="number-display">
            {this.displayTime()}
          </div>
          <div id="clock-controls">
            <div
              id="start_stop"
              className="switch"
              onClick={() => this.handleTimer()}
            >
              {this.state.timerState === "on" ? (
                <i className="fas fa-pause"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
            </div>
            <div id="reset" className="switch" onClick={this.resetTimer}>
              <i className="fas fa-sync"></i>
            </div>
          </div>
        </div>
        <div id="clock-settings">
          <div id="break-block">
            <div id="break-label">Break Length</div>
            <div id="break-settings">
              <div
                id="break-decrement"
                className="switch"
                onClick={() => this.setBLength("-")}
              >
                -
              </div>
              <div id="break-length" class="number-display">
                {this.state.bLength}
              </div>
              <div
                id="break-increment"
                className="switch"
                onClick={() => this.setBLength("+")}
              >
                +
              </div>
            </div>
          </div>
          <div id="session-block">
            <div id="session-label">Session Length</div>
            <div id="session-settings">
              <div
                id="session-decrement"
                className="switch"
                onClick={() => this.setSLength("-")}
              >
                -
              </div>
              <div id="session-length" class="number-display">
                {this.state.sLength}
              </div>
              <div
                id="session-increment"
                className="switch"
                onClick={() => this.setSLength("+")}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div id="footer"> &copy; Elizabeth Vincent M</div>
        <audio
          id="beep"
          preload="auto"
          src="http://soundbible.com/grab.php?id=2218&type=wav"
          ref={audio => {
            this.music = audio;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
