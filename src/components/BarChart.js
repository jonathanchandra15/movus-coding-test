import axios from "axios";
import React, { useState, useEffect } from 'react';
import BarChart from 'react-bar-chart';
import BarFilter from "./BarFilter";

function BarChartComponent(props) {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2015);
  let promises = []

  const carMakerList = ['Toyota', 'Daihatsu', 'Honda', 'BMW', 'Mitsubishi',
  'Tesla', 'Bugatti', 'Ford', 'Mercury', 'Lotus']
   
  const margin = {top: 20, right: 20, bottom: 30, left: 40};

  useEffect(() => {
    const tempData = [];
    let carModelCounter = 0;
    for (let i = 0; i < carMakerList.length; i++) {
      promises.push(axios.get('/vehicles/getmodelsformakeyear/make/' + carMakerList[i] + '/modelyear/' + year +'/vehicleType/car?format=json'))
    }

    Promise.all(promises).then(responses => {
      for(let i = 0; i < responses.length; i++) {
        tempData.push({
          text: carMakerList[i], 
          value: responses[i]['data']['Count']
        })
        carModelCounter += responses[i]['data']['Count']
      }
      setData(tempData);
      props.setCounters(carMakerList.length, carModelCounter);
    });
  }, [])
  
  return (
    <div className="flex">
      <div>
        <h3 className="text-center text-xl font-medium text-rose-800">
          Car Model Bar Graph Year {year}
        </h3>
        <BarChart ylabel='Quantity'
          width={800}
          height={500}
          margin={margin}
          data={data}
        />
      </div>
      <BarFilter
        carMakerList={carMakerList}
        setData={setData}
        setYear={setYear}
        setCounters={props.setCounters} />
    </div>
  )
}

export default BarChartComponent;