import React from 'react';
import Bar from '../components/Bar.js';
import { BlueButton, RedButton } from '../components/Button.js';
import '../styles/SortingVisualizer.css';
import '../styles/Button.css';
import {handleSort} from '../algorithms/SortingManager.js';

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
      timeout: 15
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const newArray = [];
    const {noOfBars} = this.state;

    for (let i = 0; i < noOfBars; i++) {
      newArray.push(this.generateRandomNumber(20, noOfBars));
    }
    this.setState({array: newArray});
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
      <BlueButton key={index} onClick={() => this.handleSortAnimation({value})} value={value}/>
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
    const {array, noOfBars} = this.state;
    const arrayCopy = array.slice();
    const steps = handleSort(sortingAlgo, arrayCopy); 
    const {swapColor, ogColor, timeout} = this.state;

    for (let i = 0; i < steps.length; i++) {
      const [firstBarIdx, firstBarVal, secBarIdx, secBarVal, isSwapped] = steps[i];

      const arrayBars = document.getElementsByClassName('bar');
      const firstBarStyle = arrayBars[firstBarIdx].style;
      const secBarStyle = arrayBars[secBarIdx].style;

      setTimeout(() => {
        firstBarStyle.backgroundColor = swapColor;
        secBarStyle.backgroundColor = swapColor;
      }, i * timeout + 5);
      if (isSwapped) {
        setTimeout(() => {
          firstBarStyle.height = `${secBarVal / noOfBars * (4/5) * 100}%`;  
          secBarStyle.height = `${firstBarVal / noOfBars * (4/5) * 100}%`;
        }, i * timeout + 10);
      }

      setTimeout(() => {
        firstBarStyle.backgroundColor = ogColor;
        secBarStyle.backgroundColor = ogColor;
      }, i * timeout + 15);
    }
    setTimeout(() => {
      this.setState({array: arrayCopy});
    }, steps.length * timeout);
  }

  handleSliderChange = (event) => {
    this.resetArray();
    const newNoOfbars = event.target.value
    console.log({newNoOfbars});
    this.setState({noOfBars: newNoOfbars});
    this.resetArray();
  }

  render() {
    return (
      <div class="flex flex-col">        
        <div className="bar-container" style={{height:'60vh'}}>
          {this.renderBars()}
        </div>

        <div class="bg-zinc-400 text-white w-screen flex flex-col fixed bottom-0"  style={{height:'40vh'}}>
          <div class="flex flex-row p-4 border-b border-black">
            <h2 class="text-4xl font-semibold text-zinc-600 border-zinc-800 mr-10">Sorting Algorithms</h2>
            {this.renderSlider()}
          </div>

          <div class="flex flex-row"> 
          <div className="button-container" style={{width:'12vw'}}>
                {this.renderButtons()}
                <RedButton onClick={() => this.resetArray()} className="btn-red" value="Reset Array"/>
            </div>

            <div class="p-4 border-l border-black" style={{height:'40vh', width:'44vw'}}/>
            <div class="p-4 border-l border-black" style={{height:'40vh', width:'44vw'}}/>

          </div>
        </div>

      </div>

       
    );
  };
}

export default SortingVisualizer;
