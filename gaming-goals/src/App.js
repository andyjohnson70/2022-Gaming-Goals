import React from 'react';
import Countdown from 'react-countdown';
import { motion } from "framer-motion";
import moon from './img/mm-moon.png';
import './App.css';

const quote = "'Begin with the end in mind' - Stephen Covey"

const sentence = {
  hidden: {opacity: 1},
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
}

const letter = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
  },
}

const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Display blinking countdown
  } else {
    return <div>
            -{days} Days {hours} Hours {minutes} Minutes {seconds} Seconds Remain-
          </div>
  }
};

function Welcome() {
  return (
    <div>
      <img className='moon' src={moon} />
      <h1 className='title'>2022 Gaming Goals</h1>
      <div className='tag-line'>by Andy Johnson</div>
      <motion.div
        className='quote'
        variants={sentence}
        initial="hidden"
        animate="visible"
      >
          {quote.split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            )
          })}
      </motion.div>
      <div className='timer'>
          <Countdown 
            date={new Date(2023, 0, 1)}
            renderer={CountdownRenderer}  
          />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Welcome />
      </header>
    </div>
  );
}

export default App;
