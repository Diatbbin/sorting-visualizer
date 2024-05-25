import React from 'react';
import Bar from '../components/Bar.js';
import { SortButton, ResetButton } from '../components/Button.js';
import {handleSort} from '../algorithms/SortingManager.js';
import '../styles/SortingVisualizer.css';
import '../styles/Button.css';
import '../styles/descVisualizer.css';

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      noOfBars: 80,
      SortAlgos: ["Insertion Sort",
                  "Bubble Sort",
                  "Merge Sort",
                  "Selection Sort",],
      swapColor: '#475569', 
      ogColor: '#e2e8f0',
      timeout: 30,
      timeoutIds: [],
      infoText: "",
      tComplexityText: "",
      sComplexityText: "",
      tComplexityHeader: "",
      sComplexityHeader: "",
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const newArray = [];
    const {noOfBars} = this.state;
    this.clearTimeouts();

    for (let i = 0; i < noOfBars; i++) {
      newArray.push(this.generateRandomNumber(20, noOfBars));
    }

    this.setState({array: newArray});
    this.setState({infoText: ""});
    this.setState({tComplexityText: ""});
    this.setState({sComplexityText: ""});
    this.setState({tComplexityHeader: ""});
    this.setState({sComplexityHeader: ""});
  };

  generateRandomNumber(minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
  }

  renderBars() {
    const {array, noOfBars} = this.state;

    return array.map((value, index) => (
      <Bar key={index} heightFrac={value/noOfBars} />
    ));
  };

  renderButtons() {
    const {SortAlgos} = this.state;

    return SortAlgos.map((value, index) => (
      <SortButton key={index} onClick={() => this.handleSortAnimation({value})} value={value}/>
    ));
  } 

  renderSlider() {
    const {noOfBars} = this.state;
    return <input
              type="range"
              min="40"
              max="120"
              value={noOfBars}
              onChange={this.handleSliderChange}
              className="bg-stone-300"
            />
  }

  handleSortAnimation(sortingAlgo) { 
    const {array, noOfBars, timeoutIds} = this.state;
    const arrayCopy = array.slice();
    const {desc, tcomplx, scomplx, steps} = handleSort(sortingAlgo, arrayCopy); 
    const {swapColor, ogColor, timeout} = this.state;
    this.resetArray();
    this.setState({infoText: desc});
    this.setState({tComplexityText: tcomplx});
    this.setState({sComplexityText: scomplx});
    this.setState({tComplexityHeader: "Time Complexity: "});
    this.setState({sComplexityHeader: "Space Complexity: "});
    let i;

    for (i = 0; i < steps.length; i++) {
      const [firstBarIdx, firstBarVal, secBarIdx, secBarVal, isSwapped] = steps[i];

      const arrayBars = document.getElementsByClassName('bar');
      const firstBarStyle = arrayBars[firstBarIdx].style;
      const secBarStyle = arrayBars[secBarIdx].style;
 
      timeoutIds.push(setTimeout(() => {
        firstBarStyle.backgroundColor = swapColor;
        secBarStyle.backgroundColor = swapColor;
      }, i * timeout + 10));

      if (isSwapped) {
        timeoutIds.push(setTimeout(() => {
          firstBarStyle.height = `${secBarVal / noOfBars * (4/5) * 100}%`;  
          secBarStyle.height = `${firstBarVal / noOfBars * (4/5) * 100}%`;
        }, i * timeout + 20));
      }

      setTimeout(() => {
        firstBarStyle.backgroundColor = ogColor;
        secBarStyle.backgroundColor = ogColor;
      }, i * timeout + 30);
    }

    timeoutIds.push(setTimeout(() => {
      this.setState({array: arrayCopy});
    }, steps.length * timeout));
  }

  clearTimeouts() {
    const {timeoutIds} = this.state;
    if (timeoutIds) {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    }
  }

  handleSliderChange = (event) => {
    this.resetArray();
    const newNoOfbars = event.target.value
    this.setState({noOfBars: newNoOfbars});
  }

  render() {
    const {infoText, tComplexityText, sComplexityText, tComplexityHeader, sComplexityHeader} = this.state;
    return (
      <div class="flex flex-col">        
        <div className="bar-container">
          {this.renderBars()}
        </div>

        <div class="sort-box">
          <div class="sort-border">
            <h2 class="sort-header">Sorting Algorithms</h2>
            {this.renderSlider()}
          </div>

          <div class="flex flex-row"> 
          <div className="button-container">
                {this.renderButtons()}
                <ResetButton onClick={() => this.resetArray()} className="btn-reset" value="Reset Array"/>
            </div>
            <div class="flex flex-col">
              <div class="desc-text">{infoText}</div>
              
              <h3 class="desc-header">
                {tComplexityHeader}
              </h3>

              <div class="desc-text">{tComplexityText}</div>

              <h3 class="desc-header">
                {sComplexityHeader} 
              </h3>

              <div class="desc-text">{sComplexityText}</div>
            </div> 
          </div>
        </div>

      </div>
    );
  };
}

export default SortingVisualizer;
