import requests
import pandas as pd
def createDF():
    url = "https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6992&daily=temperature_2m_mean,precipitation_sum&timezone=America%2FNew_York"
    response = requests.get(url)
    df = pd.DataFrame(response.json()['daily'])
    df['Date'] = df['time']
    df = df.drop(columns=['time'])
    return df