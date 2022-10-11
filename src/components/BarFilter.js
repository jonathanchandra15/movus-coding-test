import React, { useState } from 'react';
import axios from "axios";
import { YearPicker } from 'react-dropdown-date';

function BarFilter(props) {
  const [checkboxesState, setCheckboxesState] = useState(new Array(10).fill(true));
  const [year, setYear] = useState(2015);
  let promises = []

  function handleOnChange(position) {
    let carMakerCounter = 0;
    const updatedCheckboxesState = []
    for (let i = 0; i < checkboxesState.length; i++) {
      if (i === position) {
        updatedCheckboxesState.push(!checkboxesState[i]);
      } else {
        updatedCheckboxesState.push(checkboxesState[i]);
      }
    }
    setCheckboxesState(updatedCheckboxesState);
    filter(updatedCheckboxesState, year);
  }

  function handleYearChange(newYear) {
    setYear(newYear);
    props.setYear(newYear)
    filter(checkboxesState, newYear);
  }

  function filter(checkboxesStateParam, yearParam) {
    const tempData = []
    const filteredCarMakerList = [];
    let carMakerCounter = 0;
    let carModelCounter = 0;
    for(let i = 0; i < props.carMakerList.length; i++) {
      if (checkboxesStateParam[i] == true) {
        carMakerCounter += 1;
        filteredCarMakerList.push(props.carMakerList[i]);
        promises.push(axios.get('/vehicles/getmodelsformakeyear/make/' + props.carMakerList[i] + '/modelyear/' + yearParam + '/vehicleType/car?format=json'))
      }
    }
    Promise.all(promises).then(responses => {
      for(let i = 0; i < responses.length; i++) {
        tempData.push({
          text: filteredCarMakerList[i], 
          value: responses[i]['data']['Count']
        })
        carModelCounter += responses[i]['data']['Count'];
      }
      props.setCounters(carMakerCounter, carModelCounter);
      props.setData(tempData)
    }); 
  }

  return (
    <div>
      <h4 className='font-medium text-lg text-rose-800 mb-4'>
        Filter
      </h4>

      <h5 className='font-medium text-base text-zinc-600'>
        Car Maker
      </h5>
      {props.carMakerList.map((carMaker, index) => {
        return (
          <div key={index}>
            <input
              type='checkbox'
              id={index}
              name={carMaker}
              value={carMaker}
              checked={checkboxesState[index]}
              onChange={() => handleOnChange(index)} />
            <label>{carMaker}</label>
          </div>
        )
      })}

      <h5 className='font-medium text-base text-zinc-600 mt-4'>
        Year
      </h5>
      <div className='bg-zinc-600 p-0.5'>
        <YearPicker 
          defaultValue={'Select year'}
          start={1995}                
          end={2022}                  
          reverse                     
          value={year}     
          onChange={(year) => {
            handleYearChange(year)
          }}
          id={'year'}
          name={'year'} />
      </div>
    </div>
  )
}

export default BarFilter;