import React from "react";
import Nav from '../nav/Nav'
import './info-page.css'

let wiki = "https://en.wikipedia.org/wiki/Option_(finance)"
let investopedia = "https://www.investopedia.com/terms/o/option.asp"
let blackscholes = "https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model"
let heston = "https://en.wikipedia.org/wiki/Heston_model"
let alpha = "https://optionalpha.com/lessons/options-pricing-the-greeks"
let corporate = "https://corporatefinanceinstitute.com/resources/knowledge/trading-investing/option-greeks/"
let t = "&emsp;"

const InfoPage = () => {
    return (
        <div>
            <Nav />
            <h1 id='infoHeader'>Useful links</h1>
            <br />
            <p><a href={wiki}>Wikipedia</a>: What are options</p>
            <p><a href={investopedia}>Investopedia</a>: What are options</p>
            <p><a href={blackscholes}>Wikipedia</a>: Black Scholes Model</p>
            <p><a href={heston}>Wikipedia</a>: Heston Model</p>
            <p><a href={corporate}>Corporate Finance Institute</a>: Option Greeks</p>
            <p><a href={alpha}>Option Alpha</a>: Option Greeks</p>        
        </div>
  )
}

export default InfoPage