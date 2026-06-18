import requests
import pandas as pd
def createDF():
    url = "https://api.economicdata.alberta.ca/api/data?code=666e6195-c509-479b-b79f-b95e05536032"
    response = requests.get(url)
    df = pd.DataFrame(response.json())
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.loc[(df.Date > '12-1-2021')]
    df = df.set_index('Date')
    df = df.drop(columns=['Type ', 'Unit'])
    df = df.rename(columns={'Value': 'Alberta Price $/MMCF'})
    df = df / 26.853 / 35.3147 * 1000000
    return df