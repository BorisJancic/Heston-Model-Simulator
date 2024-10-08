# Heston Model Option Simulator
## Made in partnership with [Thomas Hart](https://github.com/thomashart17)

---

Built using a ReactJS frontend and a Django (Python) backend

### Frontend
Allows the user to select the input parameters involved in pricing an option like the ticker and time to expiration.  
Displays the stochastic simulations of the contract using both the Heston and Black Scholes models.  

### Backend
Retrieves live data like interest rates and volatilities.  
Computes stochastic simulations to price the option.  
Returns price data and simulation paths.  

