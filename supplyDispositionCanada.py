import pandas as pd
def createDF():
    df = pd.read_csv('2510005501_databaseLoadingData.csv')
    df = df.pivot(index='REF_DATE', columns=['GEO','Supply and disposition'], values='VALUE')
    print(df.columns)
    array = []
    for i in df.columns:
        array.append(f"{i[0]}-{i[1]}")
    df.columns = array
    df = df.rename_axis(None)
    df = df * 1000 * 35.3147 / 1000000
    df['Date'] = df.index
    df['Date'] = pd.to_datetime(df['Date'])
    df['Days'] = df['Date'].dt.days_in_month
    print(df)
    df[['Ontario-Residential consumption', 'Ontario-Industrial consumption', 'Ontario-Commercial consumption', 'Ontario-Exports', 'Alberta-Residential consumption', 'Alberta-Industrial consumption', 'Alberta-Commercial consumption','Alberta-Exports', 'British Columbia-Residential consumption', 'British Colombia-Industrial consumption', 'British Colombia-Commercial consumption', 'British Columbia-Exports']] = df[['Ontario-Residential consumption', 'Ontario-Industrial consumption', 'Ontario-Commercial consumption', 'Ontario-Exports', 'Alberta-Residential consumption', 'Alberta-Industrial consumption', 'Alberta-Commercial consumption','Alberta-Exports', 'British Columbia-Residential consumption', 'British Columbia-Industrial consumption', 'British Columbia-Commercial consumption', 'British Columbia-Exports']].div(df['Days'], axis=0)
    print(df)
    return df
createDF()