import React from 'react';
import Bar from '../components/Bar.js';
import Button from '../components/Button.js';
import '../styles/SortingVisualizer.css';
import {handleSort} from '../algorithms/SortingManager.js';

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      noOfBars: 40,
      SortAlgos: ["Insertion Sort",
                  "Bubble Sort",
                  "Merge Sort",
                  "Selection Sort",],
      swapColor: 'red', 
      ogColor: 'blue',
      timeout: 3
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const newArray = [];
    const {noOfBars} = this.state;

    for (let i = 0; i < noOfBars; i++) {
      newArray.push(this.generateRandomNumber(5, noOfBars));
    }
    this.setState({array: newArray});
  };

  generateRandomNumber(minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
  }

  renderBars() {
    const {array} = this.state;

    return array.map((value, index) => (
      <Bar key={index} height={`${value * 10}px`} />
    ));
  };

  renderButtons() {
    const {SortAlgos} = this.state;

    return SortAlgos.map((value, index) => (
      <Button key={index} onClick={() => this.handleSortAnimation({value})} value={value}/>
    ));
  } 

  renderSlider() {
    const {noOfBars} = this.state;
    return <input
              type="range"
              min="1"
              max="100"
              value={noOfBars}
              onChange={this.handleSliderChange}
            />
  }

  handleSortAnimation(sortingAlgo) { 
    const {array} = this.state;
    const arrayCopy = array.slice();
    const steps = handleSort(sortingAlgo, arrayCopy); 
    const {swapColor, ogColor, timeout} = this.state;

    for (let i = 0; i < steps.length; i++) {
      const [firstBarIdx, firstBarHeight, secBarIdx, secBarHeight, isSwapped] = steps[i];

      const arrayBars = document.getElementsByClassName('bar');
      const firstBarStyle = arrayBars[firstBarIdx].style;
      const secBarStyle = arrayBars[secBarIdx].style;

      setTimeout(() => {
        firstBarStyle.backgroundColor = swapColor;
        secBarStyle.backgroundColor = swapColor;
      }, i * timeout + 1);

      if (isSwapped) {
        setTimeout(() => {
          const temp = firstBarHeight;
          firstBarStyle.height = `${secBarHeight * 10}px`;  
          secBarStyle.height = `${temp * 10}px`;
        }, i * timeout + 2);
      }

      setTimeout(() => {
        firstBarStyle.backgroundColor = ogColor;
        secBarStyle.backgroundColor = ogColor;
      }, i * timeout + 3);
    }
    setTimeout(() => {
      this.setState({array: arrayCopy});
    }, steps.length * timeout);
  }

  handleSliderChange = (event) => {
    const newNoOfbars = event.target.value
    console.log({newNoOfbars});
    this.setState({noOfBars: newNoOfbars});
    this.resetArray();
  }

  render() {
    return (
      <div>
        <div className="bar-container">
          {this.renderBars()}
        </div>
  
        <div className="button-container">
          {this.renderButtons()}
          <Button onClick={() => this.resetArray()} value="Reset Array"/>
        </div>

        <div>
          {this.renderSlider()}
        </div>
      </div>
    );
  };
}

export default SortingVisualizer;