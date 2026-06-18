import statsmodels.api as sm
import pandas as pd
from sqlalchemy import create_engine
import matplotlib.pyplot as plt
import forecast
import canadaThroughput
import supplyDispositionCanada

engine = create_engine("postgresql+psycopg2://postgres:QueensOtt2005!@localhost:5432/my_database")
queryWeather = 'SELECT * FROM temperature'
queryConsumption = 'SELECT * FROM supply'
dfWeather = pd.read_sql(queryWeather, con=engine)
dfConsumption = pd.read_sql(queryConsumption, con=engine)
dfConsumption = dfConsumption[['Ontario-Residential consumption', 'Date']]
df = pd.merge(dfConsumption, dfWeather, on='Date')
df = df.dropna(subset=['Ontario-Residential consumption', 'temperature_2m_mean', 'precipitation_sum'])
X = sm.add_constant(df['temperature_2m_mean'])
y = df['Ontario-Residential consumption']
result = sm.OLS(y, X).fit()

# plt.scatter(df['temperature_2m_mean'], df['Ontario-Residential consumption'], color='darkblue')
# plt.xlabel('Temp')
# plt.ylabel('Ontario Consumption')
# plt.title('Temp vs Consumption')

# plt.figure()
# plt.scatter(df['precipitation_sum'], df['Ontario-Residential consumption'], color='darkgreen')
# plt.xlabel('Precipitation')
# plt.ylabel('Ontario Consumption')
# plt.title('Precipitation vs Consumption')
# plt.show()

# b = result.params['const']
# m = result.params['temperature_2m_mean']
# forecastedWeather = forecast.createDF()
# weeklyTemp = forecastedWeather['temperature_2m_mean'].mean()
# predict = m * weeklyTemp + b
# print(predict)

ontarioSupply = canadaThroughput.createDF()
ontarioConsumption = supplyDispositionCanada.createDF()
ontarioConsumption = ontarioConsumption[['Date','Ontario-Residential consumption']]
ontarioConsumption['Chippawa-export'] = ontarioSupply['Chippawa-export']
ontarioConsumption['Iroquois-export'] = ontarioSupply['Iroquois-export']
ontarioConsumption['Niagara-export'] = ontarioSupply['Niagara-export']
ontarioConsumption['Other US Northeast'] = ontarioSupply['Other US Northeast-export']
ontarioConsumption['Eastern Triangle - Parkway Deliveries'] = ontarioSupply['Eastern Triangle - Parkway Deliveries']
ontarioConsumption['Monthly Consumption'] = ontarioConsumption.sum(axis=1, numeric_only=True)
ontarioSupply = ontarioSupply.drop(columns=['Chippawa-export', 'Iroquois-export', 'Niagara-export', 'Other US Northeast-export', 'Eastern Triangle - Parkway Deliveries'])
ontarioSupply['Monthly Supply'] = ontarioSupply.sum(axis=1, numeric_only=True)
netSupplyDemand = pd.DataFrame()
netSupplyDemand['Date'] = ontarioConsumption['Date']
netSupplyDemand['Supply'] = ontarioSupply['Monthly Supply']
netSupplyDemand['Consumption'] = ontarioConsumption['Monthly Consumption']
netSupplyDemand['Difference'] = netSupplyDemand['Supply'] - netSupplyDemand['Consumption']
netSupplyDemand.reset_index(drop=True, inplace=True)
print(netSupplyDemand)