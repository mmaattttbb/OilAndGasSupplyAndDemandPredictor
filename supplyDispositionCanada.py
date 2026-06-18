import pandas as pd
def createDF():
    df = pd.read_csv('/Users/matthewbuentiempo/Desktop/Oil&Gas Project/2510005501_databaseLoadingData.csv')
    df = df.pivot(index='REF_DATE', columns=['GEO','Supply and disposition'], values='VALUE')
    array = []
    for i in df.columns:
        array.append(f"{i[0]}-{i[1]}")
    df.columns = array
    df = df.rename_axis(None)
    df = df * 1000 * 35.3147 / 1000000
    df = df.drop(columns=['Ontario-Marketable production', 'Alberta-Marketable production', 'British Columbia-Marketable production'])
    df['Date'] = df.index
    df['Date'] = pd.to_datetime(df['Date'])
    df['Days'] = df['Date'].dt.days_in_month
    df[['Ontario-Residential consumption', 'Ontario-Exports', 'Alberta-Residential consumption','Alberta-Exports', 'British Columbia-Residential consumption', 'British Columbia-Exports']] = df[['Ontario-Residential consumption', 'Ontario-Exports', 'Alberta-Residential consumption','Alberta-Exports', 'British Columbia-Residential consumption', 'British Columbia-Exports']].div(df['Days'], axis=0)
    return df