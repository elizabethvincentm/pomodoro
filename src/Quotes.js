import React from "react";
import "./quotes.css";
const quotesArray = [
  {
    quote: "Better three hours too soon, than one minute too late.",
    author: "William Shakespeare"
  },
  {
    quote:
      "Time is the school in which we learn, time is the fire in which we burn",
    author: "Delmore Schwartz"
  },
  {
    quote: "Nothing is a waste of time if you use the experience wisely.",
    author: "Rodin"
  },
  {
    quote:
      "The common man is not concerned about the passage of time, the man of talent is driven by it.",
    author: "Shoppenhauer"
  },
  {
    quote:
      "Time = life; therefore, waste your time and waste of your life, or master your time and master your life",
    author: "Alan Lakein"
  },
  {
    quote:
      "There is nothing more powerful in the world than the idea that came in time.",
    author: "Victor Hugo"
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    quote:
      "Don’t be fooled by the calendar. There are only as many days in the year as you make use of. One man gets only a week’s value out of a year while another man gets a full year’s value out of a week. ",
    author: "Charles Richards"
  },
  {
    quote: "The key is in not spending time, but in investing it.",
    author: "Stephen R. Covey"
  },
  {
    quote:
      "Ordinary people think merely of spending time. Great people think of using it.",
    author: "Anonymous"
  },
  {
    quote:
      "This time, like all times, is a very good one, if we but know what to do with it.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote:
      "A man who dares to waste one hour of life has not discovered the value of life.",
    author: "Charles Darwin"
  },
  {
    quote:
      "Take care of the minutes and the hours will take care of themselves.",
    author: "Lord Chesterfield"
  },
  {
    quote: "You’re writing the story of your life one moment at a time.",
    author: "Doc Childre and Howard Martin"
  },
  {
    quote: "To do two things at once is to do neither",
    author: "Publius Syrus"
  },
  {
    quote: "Never let yesterday use up today.",
    author: "Richard H. Nelson"
  },
  {
    quote:
      "Realize that now, in this moment of time, you are creating. You are creating your next moment. That is what’s real.",
    author: "Sara Paddison"
  },
  {
    quote: "The time for action is now. It’s never too late to do something.",
    author: "Carl Sandburg"
  }
];

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: Math.floor(Math.random() * quotesArray.length),
      interval: setInterval(() => {
        this.setNewQuote();
      }, 5000)
    };
    this.setNewQuote = this.setNewQuote.bind(this);
  }
  setNewQuote() {
    this.setState({
      quoteIndex: Math.floor(Math.random() * quotesArray.length)
    });
  }
  render() {
    return <div id="quotebox">{quotesArray[this.state.quoteIndex].quote}</div>;
  }
}
export default Quotes;
