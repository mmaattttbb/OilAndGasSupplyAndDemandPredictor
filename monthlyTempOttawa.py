import requests
import pandas as pd
def createDF():
    url = 'https://archive-api.open-meteo.com/v1/archive?latitude=45.4215&longitude=-75.6972&start_date=2022-01-01&end_date=2026-05-27&daily=temperature_2m_mean,precipitation_sum&timezone=America%2FNew_York'
    response = requests.get(url)
    df = pd.DataFrame(response.json()['daily'])
    df['time'] = pd.to_datetime(df['time'])
    df = df.set_index('time')
    df = df.rename_axis(None)
    df = df.resample('MS').mean()
    df['Date'] = df.index
    df['Date'] = pd.to_datetime(df['Date'])
    return df
