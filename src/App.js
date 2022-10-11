import './App.css';
import React, { useState} from 'react';
import BarChartComponent from './components/BarChart';
import CounterCard from './components/CounterCard';

function App() {
  const [carMakerCounter, setCarMakerCounter] = useState(0);
  const [carModelCounter, setCarModelCounter] = useState(0);

  function setCounters(carMakerCounter, carModelCounter) {
    setCarMakerCounter(carMakerCounter);
    setCarModelCounter(carModelCounter);
  }

  return (
    <div className='flex flex-col p-4 items-center'>
      <h1 className='text-5xl mb-8 font-bold text-rose-700'>
        Dashboard Page
      </h1>
      <CounterCard 
        carMakerCounter={carMakerCounter}
        carModelCounter={carModelCounter} />
      <BarChartComponent 
        setCounters={setCounters}/>
    </div>
  );
}

export default App;
