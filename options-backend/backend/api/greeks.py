import math as m
from scipy.stats import norm

def Call(S, K, t, sigma, r):
    d1 = calc_d1(S, K, t, sigma, r)
    d2 = calc_d2(S, K, t, sigma, r)
    return N(d1)*S - N(d2)*K*(m.e**(-r*t))

def calc_d1(S, K, t, sigma, r):
    num = m.log(S/K) + (r + (sigma**2)/2)*t
    return num / (sigma*m.sqrt(t))

def calc_d2(S, K, t, sigma, r):
    return calc_d1(S, K, t, sigma, r) - sigma*m.sqrt(t)

def N(x):
    return norm.cdf(x)

def gauss(x):
    return norm.pdf(x)

def delta(S, K, t, sigma, r, type="Call"):
    if type == "Put":
        return N(calc_d1(S, K, t, sigma, r)) - 1
    else:
        return N(calc_d1(S, K, t, sigma, r))

def gamma(S, K, t, sigma, r):
    return gauss(calc_d1(S, K, t, sigma, r)) / (S*sigma*m.sqrt(t))

def vega(S, K, t, sigma, r):
    return S*gauss(calc_d1(S, K, t, sigma, r))*m.sqrt(t)

def theta(S, K, t, sigma, r):
    return -((S*gauss(calc_d1(S, K, t, sigma, r))*sigma)/(2*m.sqrt(t)))-(r*K*(m.e**(-r/t))*N(calc_d2(S, K, t, sigma, r)))

def rho(S, K, t, sigma, r):
    return K*t*(m.e**(-r/t)*N(calc_d2(S, K, t, sigma, r)))
