import requests
import pandas as pd
def createDF():
    url = "https://api.eia.gov/v2/natural-gas/sum/lsum/data/?frequency=monthly&data[0]=value&facets[series][]=N9010PA2&facets[series][]=N9010WV2&start=2022-01&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=ztZC8E0CbmJSjlNIuKBYqQanyjuXeMbGqDTkKDdv"
    response = requests.get(url)
    df = pd.DataFrame(response.json()['response']['data'])
    df = df.drop(columns=['duoarea', 'product', 'product-name', 'process', 'series', 'units'])
    df = df.rename(columns={'period': 'Date'})
    df = df.pivot(index='Date', columns=['area-name'], values='value')
    df.columns = ['Pensylvania Withdrawals', 'West-Virginia Withdrawals']
    df.reset_index(names='Date', inplace=True)
    df['Date'] = pd.to_datetime(df['Date'])
    return df