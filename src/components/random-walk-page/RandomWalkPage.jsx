import React, {useState} from 'react'
import Nav from '../nav/Nav'
import Plot from 'react-plotly.js'
import './random-walk-page.css'
import equationImage from './equation.png'
import HestonE from './Heston.png'
import BS from './BS.png'
import Var from './Var.png'
import Stock from './Stock.png'

const RandomWalkPage = () => {
  let [temp1, setTemp1] = useState("")
  let [temp2, setTemp2] = useState("")
  let [temp3, setTemp3] = useState("")
  let [temp4, setTemp4] = useState("")
  let [graph, setGraph] = useState([])
  let [stock, setStock] = useState([])
  let [vol, setVol] = useState([])

  const [isActive, setIsActive] = useState(false);
  const [BSprice, setBSprice] = useState();
  const [BSsim, setBSsim] = useState();
  const [Heston, setHeston] = useState();
  const [delta, setDelta] = useState();
  const [theta, setTheta] = useState();
  const [gamma, setGamma] = useState();
  const [vega, setVega] = useState();
  const [rho, setRho] = useState();

  let strikePrice = 100
  let time = 1
  let steps = 1
  let paths = 1

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
      setBSsim(JSON.parse(data)["BS"]["price"])
      setBSprice(JSON.parse(data)["call"])
      setHeston(JSON.parse(data)["heston"])
      setDelta(JSON.parse(data)["delta"])
      setTheta(JSON.parse(data)["theta"])
      setGamma(JSON.parse(data)["gamma"])
      setVega(JSON.parse(data)["vega"])
      setRho(JSON.parse(data)["rho"])

      setIsActive(current => true);
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

  return (
    <div>
        <Nav />
        <h1 className='header'>Simulate SPY Calls using the Black Scholes</h1>
        <h1 className='header'>and Heston Models</h1>
        <div className='row'>
            <div className='column'>
                <form className='submit' onSubmit={handleSubmit}>
                    <label>Strike Price</label><br/>
                    <input className='input' type="number" value={temp1} onChange={(e) => setTemp1(e.target.value)} min="0" step=".1" placeholder="strike">
                    </input><br/>
                    <label>Time to Expiration</label><br/>
                    <input className='input' type="number" value={temp2} onChange={(e) => setTemp2(e.target.value)} min="0" step=".1" placeholder="time">
                    </input><br/>
                    <label>Number of Steps</label><br/>
                    <input className='input' type="number" value={temp3} onChange={(e) => setTemp3(e.target.value)} min="1" placeholder="steps">
                    </input><br/>
                    <label>Number of Paths</label><br/>
                    <input className='input' type="number" value={temp4} onChange={(e) => setTemp4(e.target.value)} min="1" placeholder="paths">
                    </input><br />
                    <button className='calculate' type="submit">Simulate</button>
                </form>
            </div>
            <div className='column'>
                <div className='value' style={{display: isActive? 'block': 'none'}}>
                <p>Black Scholes Exact Value:</p>
                <p>{BSprice}</p>
                </div>
                <div className='value' style={{display: isActive? 'block': 'none'}}>
                <p>Black Scholes Simulated Value:</p>
                <p>{BSsim}</p>
                </div>
                <div className='value' style={{display: isActive? 'block': 'none'}}>
                <p>Heston Simulated Value:</p>
                <p>{Heston}</p>
                </div>
                <div className='table' style={{display: isActive? 'block': 'none'}}>
                    <table>
                    <tr>
                        <th>Delta</th>
                        <th>Theta</th>
                        <th>Vega</th>
                        <th>Gamma</th>
                        <th>Rho</th>
                    </tr>
                    <tr>
                        <td>{delta}</td>
                        <td>{theta}</td>
                        <td>{vega}</td>
                        <td>{gamma}</td>
                        <td>{rho}</td>
                    </tr>
                    </table>
                </div>
                <div style={{display: isActive? 'none': 'block'}}>
                    <p style={{fontStyle: 'italic'}}>Black Scholes Exact Solution</p>
                    <img src={equationImage} id="image" style={{width: 400}}/>
                    <p style={{fontStyle: 'italic'}}>Black Scholes SDE</p>
                    <img src={BS} id="image" style={{width: 325}}/>
                    <br /><br /><br />
                    <p style={{fontStyle: 'italic'}}>Heston Price SDE</p>
                    <img src={Stock} id="image" style={{width: 350}}/>
                    <br />
                    <p style={{fontStyle: 'italic'}}>Heston Variance SDE</p>
                    <img src={Var} id="image" style={{width: 450}}/>
                    <p style={{fontStyle: 'italic'}}>Ws and Wb being the correlation between the two random processes</p>
                </div>
            </div>
        </div>

        <div>
            <div id ="test" style={{display: isActive? 'block': 'none'}}><Plot
                data = {graph}
                layout = {{width: 800, height: 500, title: "Black Scholes"}}/>
            </div>
            <div style={{display: isActive? 'block': 'none'}}><Plot
                data = {stock}
                layout = {{width: 800, height: 500, title: "Heston Price"}}/>
            </div>
            <div style={{display: isActive? 'block': 'none'}}><Plot
                data = {vol}
                layout = {{width: 800, height: 500, title: "Heston Varience"}}/>
            </div>
        </div>

    </div>
  )
}

export default RandomWalkPage