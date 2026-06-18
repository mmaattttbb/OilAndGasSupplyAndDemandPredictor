import pandas as pd
from sqlalchemy import create_engine
import albertaPrice
import canadaThroughput
import historicalPriceCanada
import mergeDataFrames
import monthlyTempOttawa
import newYorkPrice
import supplyDispositionCanada
import westVirginiaPensylvania

def getPrice():
    albertaData = albertaPrice.createDF()
    canadaHistorical = historicalPriceCanada.createDF()
    nyPrice = newYorkPrice.createDF()
    priceTable = pd.merge(albertaData, canadaHistorical, on='Date', how='outer')
    priceTable = pd.merge(priceTable, nyPrice, on='Date', how='outer')
    priceTable.reset_index(names='Date', inplace=True)
    priceTable['Historical Price Canada $/MMCF'] = priceTable['Historical Price Canada $/MMCF'].ffill()
    return priceTable

def getTemp():
    ottTemp = monthlyTempOttawa.createDF()
    return ottTemp

def getSupply():
    canSupply = canadaThroughput.createDF()
    canSupply = canSupply.drop(columns=['Chippawa-export', 'Iroquois-export', 'Niagara-export', 'Other US Northeast-export', 'Eastern Triangle - Parkway Deliveries'])
    cadUSProduction = mergeDataFrames.createDF()
    supplyCad = supplyDispositionCanada.createDF()
    supplyCad = supplyCad[['Ontario-Residential consumption', 'Date', 'Ontario-Closing inventory', 'Alberta-Closing inventory', 'British Columbia-Closing inventory']]
    supplyTable = pd.merge(canSupply, cadUSProduction, on='Date', how='outer')
    supplyTable = pd.merge(supplyTable, supplyCad, on='Date', how='outer')
    return supplyTable

def getDemand():
    wVirginiaPensylvania = westVirginiaPensylvania.createDF()
    canDemand = canadaThroughput.createDF()
    canDemand = canDemand.drop(columns=['Chippawa-import', 'Iroquois-import', 'Niagara-import', 'Eastern Triangle - NOL Receipts', 'Eastern Triangle - Parkway Receipts'])
    demandTable = pd.merge(wVirginiaPensylvania, canDemand, on='Date', how='outer')
    demandCad = supplyDispositionCanada.createDF()
    demandCad = demandCad.drop(columns=['British Columbia-Residential consumption', 'Alberta-Residential consumption', 'Ontario-Residential consumption', 'Ontario-Closing inventory', 'Alberta-Closing inventory', 'British Columbia-Closing inventory'])
    demandTable = pd.merge(demandTable, demandCad, on='Date', how='outer')
    return demandTable

engine = create_engine("postgresql+psycopg2://postgres:QueensOtt2005!@localhost:5432/my_database")
priceTable = getPrice()
temp = getTemp()
supply = getSupply()
demand = getDemand()

priceTable.to_sql(
    name='prices',
    con=engine,
    if_exists='replace',
    index=False,
    schema='public'
)

temp.to_sql(
    name='temperature',
    con=engine,
    if_exists='replace',
    index=False,
    schema='public'
)

supply.to_sql(
    name='supply',
    con=engine,
    if_exists='replace',
    index=False,
    schema='public'
)

demand.to_sql(
    name='demand',
    con=engine,
    if_exists='replace',
    index=False,
    schema='public'
)