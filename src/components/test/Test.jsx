import React, {useState} from 'react'
import Nav from '../nav/Nav'
import Plot from 'react-plotly.js'


const Test = () => {
  let [info, setInfo] = useState(null)
  let [temp1, setTemp1] = useState("")
  let [temp2, setTemp2] = useState("")
  let [temp3, setTemp3] = useState("")
  let [temp4, setTemp4] = useState("")
  let [graph, setGraph] = useState([])
  let [stock, setStock] = useState([])
  let [vol, setVol] = useState([])


  let strikePrice = 100
  let time = 1
  let steps = 1
  let paths = 1
  let graphData = [
    {x: [1, 2, 3], y: [2, 6, 3], type: 'line'},
    {'type': 'line', 'x': [1, 2, 3], 'y': [1, 1, 3]},
    {'type': 'line', 'x': [1, 2, 3], 'y': [2, 2, 2]}
  ]
  let getStochasticData = async (e) => {
      let S = (strikePrice + "").split(".")
      let T = (time + "").split(".")
      if (S.length === 1) { S.push("0") }
      if (T.length === 1) { T.push("0") }
      if (S[0] === "") { S[0] = "0" }
      if (T[0] === "") { T[0] = "0" }
      let response = await fetch(`/api/stochastic/${S[0]}/${S[1]}/${T[0]}/${T[1]}/${steps}/${paths}`)
      let data = await response.json()
      //setInfo(data)
      let list = JSON.parse(data)["BS"]["paths"]
      let stock = JSON.parse(data)["hestonStock"]
      let vol = JSON.parse(data)["hestonVol"]
      console.log(stock)
      setGraph(list)
      setStock(stock)
      setVol(vol)
      //handleClick(e)
  }

  const handleSubmit = (event) => {
      event.target.reset();
      event.preventDefault();
      strikePrice = temp1
      time = temp2
      steps = temp3
      paths = temp4

      getStochasticData(event);
  }

  const testFunction = () => {
    console.log(0)
  }
  
  let testData = [{'type': 'line', 'x': [1, 2, 3], 'y': [1, 1, 3]},
    {type: 'line', x: [1, 2, 3], y: [2, 2, 4]},]

  const sample = [
    { category: 'A', values: [20, 12, 33, 25, 12], types: ['a', 'b', 'b', 's', 't']},
    { category: 'B', values: [43, 23, 11, 23, 61], types: ['g', 'h', 'f', 's', 'a']},
    { category: 'C', values: [63, 14, 16, 33, 21], types: ['z', 'h', 'y', 't', 'b']},
  ]


  function handleClick(e) {
    let list = JSON.parse(info)["paths"]
    setGraph(list)
  }


  return (
    <div>
      <Nav />
      <h1>Models calls on SPY using both the Black Scholes Merton SDE and the stochastic volatility Heston model</h1>
      <div>
          <form onSubmit={handleSubmit}>
              <label>Strike Price</label><br/>
              <input type="number" value={temp1} onChange={(e) => setTemp1(e.target.value)} min="0" step=".1" placeholder="strike">
              </input><br/>
              <label>Time to Expiration</label><br/>
              <input type="number" value={temp2} onChange={(e) => setTemp2(e.target.value)} min="0" step=".1" placeholder="time">
              </input><br/>
              <label>Number of Steps</label><br/>
              <input type="number" value={temp3} onChange={(e) => setTemp3(e.target.value)} min="1" placeholder="steps">
              </input><br/>
              <label>Number of Paths</label><br/>
              <input type="number" value={temp4} onChange={(e) => setTemp4(e.target.value)} min="1" placeholder="paths">
              </input><br/>

              <br/>
              <button type="submit">test</button>
          </form>
      </div>

    <div><Plot
        data = {graph}
        layout = {{width: 800, height: 500, title: "Black Scholes"}}/>
    </div>
    <div>
        <div><Plot
            data = {stock}
            layout = {{width: 800, height: 500, title: "Heston Price"}}/>
        </div>
        <div><Plot
            data = {vol}
            layout = {{width: 800, height: 500, title: "Heston Varience"}}/>
        </div>
    </div>

    </div>
  )
}

export default Test