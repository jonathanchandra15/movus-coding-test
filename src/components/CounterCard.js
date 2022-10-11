function CounterCard(props) {
  return (
    <div className="bg-slate-200 flex flex-col p-4 rounded-md text-lg text-gray-600 font-medium mb-8">
      <h4>
        Total Car Maker Counter: {props.carMakerCounter}
      </h4>
      <h4>
        Total Car Model Counter: {props.carModelCounter}
      </h4>
    </div>
  )
}

export default CounterCard;