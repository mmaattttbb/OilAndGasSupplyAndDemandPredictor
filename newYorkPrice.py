import requests
import pandas as pd
def createDF():
    url = "https://api.eia.gov/v2/natural-gas/pri/sum/data/?frequency=monthly&data[0]=value&facets[series][]=N3010NY3&facets[series][]=N3050NY3&sort[0][column]=period&start=2022-01&sort[0][direction]=desc&offset=0&length=5000&api_key=ztZC8E0CbmJSjlNIuKBYqQanyjuXeMbGqDTkKDdv"
    response = requests.get(url)
    df = pd.DataFrame(response.json()['response']['data'])
    df.drop(columns=['duoarea', 'product', 'product-name', 'process', 'process-name', 'series', 'units'], inplace=True)
    df['Date'] = pd.to_datetime(df['period'])
    df = df.sort_values(by='Date')
    df = df.pivot(index='Date', columns=['series-description'], values='value')
    df = df.rename(columns={'New York Price of Natural Gas Delivered to Residential Consumers (Dollars per Thousand Cubic Feet)':'Residential Price NY $/MMCF', 'Natural Gas Citygate Price in New York (Dollars per Thousand Cubic Feet)':'Citygate Price NY $/MMCF'})
    df.columns = ['Citygate Price NY $/MMCF', 'Residential Price NY $/MMCF']
    df['Residential Price NY $/MMCF'] = pd.to_numeric(df['Residential Price NY $/MMCF'], errors='coerce')
    df['Residential Price NY $/MMCF'] = df['Residential Price NY $/MMCF'] * 1000 * 1.4
    df['Citygate Price NY $/MMCF'] = pd.to_numeric(df['Citygate Price NY $/MMCF'], errors='coerce')
    df['Citygate Price NY $/MMCF'] = df['Citygate Price NY $/MMCF'] * 1000 * 1.4
    return df