#from msilib.schema import Error
from yahoo_fin.stock_info import *
from bs4 import BeautifulSoup
import requests

# http://theautomatic.net/yahoo_fin-documentation/

def get_rfr():
    return round(get_live_price("^IRX")/100, 5)

def get_stock_price(ticker="SPY"):
    return round(float(get_live_price(ticker)), 2)

def get_stock_history(ticker="^VIX", date='01/05/2022'):
    data = 1
    
    print(get_data(ticker, start_date = date))
    return (get_data(ticker, start_date = date)['open'][0])

def get_volatility(ticker, days=180):
    website = f'https://www.alphaquery.com/stock/{str(ticker)}/volatility-option-statistics/{str(days)}-day/iv-mean'
    r = requests.get(website)#.text
    soup = BeautifulSoup(r.text, 'html.parser')
    section = soup.find_all('div', {'class': "displayNone"})
    element = section[0].find('strong').text
    return float(element)


# print(get_volatility("SPY"))
# print(get_stock_price("TSLA"))
# print(get_rfr())
# print(get_live_price("^IRX"))
# print(get_stock_history("SPY"))
