import pandas as pd
def createDF():
    df = pd.read_csv('tcpl-mainline-throughput-and-capacity.csv')
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.loc[(df.Date > '12-31-2021')]
    df = df.drop(columns=['Day', 'Month', 'Year', 'Company', 'Longitude', 'Latitude', 'Pipeline', 'Throughput (GJ/d)', 'Capacity (1000 m3/d)', 'Direction Of Flow'])
    df2 = df
    df = df.loc[(df['Key Point'] == 'Eastern Triangle - NOL Receipts') | (df['Key Point'] == 'Eastern Triangle - Parkway Deliveries') | (df['Key Point'] == 'Eastern Triangle - Parkway Receipts')]
    df = df.drop(columns=['Trade Type'])
    df = df.pivot(index='Date', columns=['Key Point'], values='Throughput (1000 m3/d)')
    df = df.reset_index()
    keyPoints = ['Chippawa', 'Iroquois', 'Niagara', 'Other US Northeast']
    df2 = df2.loc[df2['Key Point'].isin(keyPoints)]
    df2 = df2.pivot(index='Date', columns=['Key Point', 'Trade Type'], values='Throughput (1000 m3/d)')
    array=[]
    for i in df2.columns:
        array.append(f"{i[0]}-{i[1]}")
    df2.columns = array
    result = pd.merge(df, df2, on='Date', how='outer')
    result['Date'] = pd.to_datetime(result['Date'])
    result = result.set_index('Date')
    result = result.resample('MS').mean()
    result = result * 1000 * 35.3147 / 1000000
    return result