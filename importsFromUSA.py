import requests
import pandas as pd
def createDF():
    url = "https://api.eia.gov/v2/natural-gas/move/expc/data/?frequency=monthly&data[0]=value&facets[series][]=N9132CN2&start=2022-01&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=ztZC8E0CbmJSjlNIuKBYqQanyjuXeMbGqDTkKDdv"
    response = requests.get(url)
    df = pd.DataFrame(response.json()['response']['data'])
    df.drop(columns=['duoarea', 'area-name', 'product', 'product-name', 'process', 'process-name', 'series', 'series-description', 'units'], inplace=True)
    df['period'] = pd.to_datetime(df['period'])
    df['Days'] = df['period'].dt.days_in_month
    df = df.sort_values(by='period')
    df['ImportsPerDay'] = pd.to_numeric(df['value'])/df['Days']
    df = df.rename(columns={'period':'Date', 'value':'ImportsFromUSA'})
    return df