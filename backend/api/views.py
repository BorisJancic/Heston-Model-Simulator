from sys import set_coroutine_origin_tracking_depth
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

import json
from yahoo_fin.stock_info import *
from . greeks import *
from . graphs import *
from . stock_data import *
from . random_walk import *

# Create your views here.

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/stock/',
            'method': 'GET',
            'body': None,
            'description': 'Returns Black Scholes data'
        },
        {
            'Endpoint': '/stochastic/',
            'method': 'GET',
            'body': None,
            'description': 'Returns stochastic simulation data'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def get_stochastic_data(request, K, Kd, T, Td, steps, paths):
    strike = float(str(K) + "." + str(Kd))
    time = float(str(T) + "." + str(Td))
    #price = float(get_stock_price("SPY"))
    price = get_live_price("SPY")
    sigma = float(get_volatility("SPY"))
    r = round(float(get_live_price("^IRX")/100), 5)

    # {'value': value/paths, 'price': stockData, 'volatility': volData}
    BS = Euler(price, time, strike, sigma, 0.01, steps, paths)
    heston = Heston(price, time, strike, 0.01, sigma**2, 0.25**2, 5, 0.1, -0.7, paths, steps)
    data = {
        "BS": BS,
        "hestonStock": heston['price'],
        "hestonVol": heston['volatility'],
        "heston": heston['value'],
        "call": round(Call(price, strike, time, sigma, 0.01), 2),
        "delta": round(delta(price, strike, time, sigma, 0.01), 3),
        "theta": round(theta(price, strike, time, sigma, 0.01), 3),
        "gamma": round(gamma(price, strike, time, sigma, 0.01), 4),
        "vega": round(vega(price, strike, time, sigma, 0.01), 3),
        "rho": round(rho(price, strike, time, sigma, 0.01), 3),
    }
    # data = Euler(price, time, strike, sigma, r, steps, paths)
    return Response(json.dumps(data))

@api_view(['GET'])
def get_stock_data(request, ticker, K, Kd, T, Td):
    try:
        get_live_price(ticker)
    except:
        return Response(json.dumps("false name"))
    price = round(get_live_price(ticker),2)
    strike = float(str(K) + "." + str(Kd))
    time = float(str(T) + "." + str(Td))
    sigma = get_volatility(ticker)

    data = {
        "price": price,
        "strike": strike,
        "time": time,
        "data": graph_call(price, strike, time, 0.3, 0.01),
        "delta": graph_delta(price, strike, time, 0.3, 0.01),
        "vega": graph_vega(price, strike, time, 0.3, 0.01),
        "theta": graph_theta(price, strike, time, 0.3, 0.01),
        "gamma": graph_gamma(price, strike, time, 0.3, 0.01),
        "rho": graph_rho_S_T(price, strike, time, 0.3, 0.01),

        "Call": round(Call(price, strike, time, 0.3, 0.01), 2),
        "Delta": round(delta(price, strike, time, sigma, 0.01), 3),
        "Theta": round(theta(price, strike, time, sigma, 0.01), 3),
        "Gamma": round(gamma(price, strike, time, sigma, 0.01), 4),
        "Vega": round(vega(price, strike, time, sigma, 0.01), 3),
        "Rho": round(rho(price, strike, time, sigma, 0.01), 3),
    }
    return Response(json.dumps(data))
