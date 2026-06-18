import pandas as pd
def createDF():
    xls = pd.ExcelFile('historicalPrice.xlsx')
    df = pd.read_excel(xls)
    df = df.set_index('Date')
    df = df.drop(columns={'Commodity \nprice (¢/m³)', 'Gas cost \nadjustment (¢/m³)'})
    df = df / 35.3147 / 100 * 1000000
    df = df.rename(columns={'Effective \nprice (¢/m³) *': 'Historical Price Canada $/MMCF'})
    return(df)