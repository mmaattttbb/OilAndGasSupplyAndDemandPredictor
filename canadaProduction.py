import pandas as pd
def createDF():
    xls = pd.ExcelFile('canadian-marketable-natural-gas-production-2000on.XLSX')
    df = pd.read_excel(xls, '2000+ - mmcfd Mpi3j', skiprows=8)
    df.dropna(axis=1, how='all', inplace=True)
    df.drop(columns=['Unnamed: 12'], inplace=True)
    df.drop(index=[0, 1], inplace=True)
    df = df.fillna(0)
    df = df.loc[(df.Date > '12-1-2021')]
    df['Total'] = df.iloc[:, 1:8].sum(axis=1)
    df['Difference'] = df.Canada - df.Total
    return(df)