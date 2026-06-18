import canadaProduction
import importsFromUSA
import pandas as pd
def createDF():
    canadaDF = canadaProduction.createDF()
    usaDF = importsFromUSA.createDF()
    result = pd.merge(canadaDF, usaDF, on='Date', how='outer')
    result = result.drop(columns=['Difference', 'Total', 'Days'])
    result.to_excel('output.xlsx', index=False)
    return result