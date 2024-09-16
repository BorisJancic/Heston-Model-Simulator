import matplotlib.pyplot as plt
import random
from random import gauss
from math import exp, sqrt
import numpy as np


def Heston(S, T, K, r, v, theta, kappa, xi, rho=-0.0, paths=100, steps=100):
    """ 
        v is the instantaneous variance
        theta is average long run varience v -> theta
        kappa is the rate of reversion to theta
        xi volatility of volatility -> varience of v
        rho is the correlation
    """
    xVal = [0]*(steps+1)
    for i in range(1, steps+1):
        xVal[i] = round(T*i/steps, 5)

    stockData = [{'x': xVal, 'y': [S]*(steps+1), 'type': 'line'} for i in range(paths)]
    volData = [{'x': xVal, 'y': [v]*(steps+1), 'type': 'line'} for i in range(paths)]

    dt = T/steps
    value = 0
    stock = [[S]*steps for i in range(paths)]
    vol = [[round(v, 3)]*steps for i in range(paths)]
    
    for i in range(paths):
        S_t = S
        v_t = v
 
        for j in range(1, steps+1):
            W = np.random.multivariate_normal([0, 0], [[1, rho], [rho, 1]])
            S_t += r*S_t*dt + sqrt(v_t)*S_t*W[0]*sqrt(dt)
            v_t += kappa*(theta - v_t)*dt + xi*sqrt(v_t)*W[1]*sqrt(dt)
            v_t = abs(v_t)

            stockData[i]['y'][j] = round(S_t, 2)
            volData[i]['y'][j] = round(v_t, 4)
            #stock[i][j] = round(S_t, 1)
            #vol[i][j] = round(v_t, 3)

        if S_t > K:
            value += S_t - K
    # return stock, vol, value / paths
    return {'type': 'surface', 'value': round(value/paths, 2), 'price': stockData, 'volatility': volData}

def Euler(S, T, K, sigma, r, steps=100, paths=100):
    xVal = [0]*(steps+1)
    for i in range(1, steps+1):
        xVal[i] = round(T*i/steps, 5)

    dt = T/steps
    value = 0
    dataJ = [{'x': xVal, 'y': [S]*(steps+1), 'type': 'line'} for i in range(paths)]
    for i in range(paths):
        S_t = S
        for j in range(1, steps+1):
            S_t = S_t*exp((r - 0.5*sigma**2)*dt + sigma*gauss(0, 1)*sqrt(dt))
            # data[i][j] = round(S_t, 1)
            dataJ[i]['y'][j] = round(S_t, 2)
        if S_t > K:
            value += S_t - K

    return {'value': round(value/paths, 2), 'paths': dataJ, 'price': round(value/paths, 2)}

# print(Euler(385.13, 1.1, 300, 0.3, 0.01, 1000, 50)['price'])

# for i in range(3):
#     print("B  ", b['paths'][i]['y'])
#     print("C  ", b['paths'][i]['x'])