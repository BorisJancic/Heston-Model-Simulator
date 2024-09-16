import React, { useState } from 'react'
import Nav from '../nav/Nav'
import Plot from 'react-plotly.js'
import './graphs-page.css'
import greekImage from './greeks.png'
import equationImage from './equation.png'


const GraphsPage = () => {
    let [temp1, setTemp1] = useState("")
    let [temp2, setTemp2] = useState("")
    let [temp3, setTemp3] = useState("")

    let [call, setCall] = useState([])
    let [gamma, setGamma] = useState([])
    let [delta, setDelta] = useState([])
    let [vega, setVega] = useState([])
    let [theta, setTheta] = useState([])
    let [rho, setRho] = useState([])

    const [isActive, setIsActive] = useState(false);
    const [BSprice, setBSprice] = useState();
    const [delta_, setDelta_] = useState();
    const [theta_, setTheta_] = useState();
    const [gamma_, setGamma_] = useState();
    const [vega_, setVega_] = useState();
    const [rho_, setRho_] = useState();

    let stockTicker ="SPY"
    let strikePrice = 100
    let time = 1

    let getStockData = async (e) => {
        if (stockTicker == "") { return }
        let S = (strikePrice + "").split(".")
        let T = (time + "").split(".")
        if (S.length == 1) { S.push("0") }
        if (T.length == 1) { T.push("0") }
        if (S[0] == "") { S[0] = "0" }
        if (T[0] == "") { T[0] = "0" }
        let response = await fetch(`/api/stock/${stockTicker}/${S[0]}/${S[1]}/${T[0]}/${T[1]}`)
        console.log(S, T)
        let data = await response.json()
        let call = JSON.parse(data)

        setCall([call['data']])
        setDelta([call['delta']])
        setGamma([call['gamma']])
        setVega([call['vega']])
        setRho([call['rho']])
        setTheta([call['theta']])

        setIsActive(current => true);
        setBSprice(JSON.parse(data)["Call"])
        setDelta_(JSON.parse(data)["Delta"])
        setTheta_(JSON.parse(data)["Theta"])
        setGamma_(JSON.parse(data)["Gamma"])
        setVega_(JSON.parse(data)["Vega"])
        setRho_(JSON.parse(data)["Rho"])
    }

    const handleSubmit = (event) => {
        event.target.reset();
        event.preventDefault();
        stockTicker = temp1
        strikePrice = temp2
        time = temp3
        getStockData(event);
    }

  return (
    <div>
        <Nav />
        <h1 className='header'>Visualize the Black Scholes Equation</h1>
        <h1 className='header'>and its derivatives</h1>
        <div className='row'>
            <div className='column'>
                <form className='submit' onSubmit={handleSubmit}>
                    <label>Stock Ticker</label><br/>
                    <input className='input' type="text" value={temp1} onChange={(e) => setTemp1(e.target.value)} placeholder="ticker">
                    </input><br/>
                    <label>Strike Price</label><br/>
                    <input className='input' type="number" min="0" step=".01" value={temp2} onChange={(e) => setTemp2(e.target.value)} placeholder="price">
                    </input><br/>
                    <label>Time to Expiration</label><br/>
                    <input className='input' type="number" min="0" step=".01"value={temp3} onChange={(e) => setTemp3(e.target.value)} placeholder="time">
                    </input><br/>
                    
                    <button className='calculate' type="submit">test</button>
                </form>
            </div>
            <div className='column' style={{display: isActive? 'block': 'none'}}>
                <div className='value'>
                    <p>Call Value:</p>
                    <p>{BSprice}</p>
                </div>
                <div className='table'>
                    <table>
                    <tr>
                        <th>Delta</th>
                        <th>Theta</th>
                        <th>Vega</th>
                        <th>Gamma</th>
                        <th>Rho</th>
                    </tr>
                    <tr>
                        <td>{delta_}</td>
                        <td>{theta_}</td>
                        <td>{vega_}</td>
                        <td>{gamma_}</td>
                        <td>{rho_}</td>
                    </tr>
                    </table>
                </div>
            </div>
            <div>
                <br />
                <p style={{ fontStyle: 'italic', display: isActive? 'none': 'block' }}>Black Scholes Equation</p>
                <img src={equationImage} id="image" style={{display: isActive? 'none': 'block'}}/>
                <br />
                <img src={greekImage} id="image" style={{display: isActive? 'none': 'block'}}/>
            </div>
        </div>

        <div style={{display: isActive? 'block': 'none'}}>
            <div>
                <div className='left'><Plot
                    data = {call}
                    layout = {{width: 600, height: 600, type: 'surface', title: "Call Value"}}/>
                </div>
                <div className='middle'><Plot
                    data = {gamma}
                    layout = {{width: 600, height: 600, type: 'surface', title: "Gamma"}}/>
                </div>
                <div className='right'><Plot
                    data = {delta}
                    layout = {{width: 600, height: 600, type: 'surface', title: "Delta"}}/>
                </div>
            </div>

            <div className='right'>
                <br/>
            </div>
            <div className='right'><Plot
                data = {vega}
                layout = {{width: 600, height: 600, type: 'surface', title: "Vega"}}/>
            </div>
            <div className='right'><Plot
                data = {theta}
                layout = {{width: 600, height: 600, type: 'surface', title: "Theta"}}/>
            </div>
            <div className='right'><Plot
                data = {rho}
                layout = {{width: 600, height: 600, type: 'surface', title: "Rho"}}/>
            </div>
        </div>    

    </div>
  )
}

export default GraphsPage
