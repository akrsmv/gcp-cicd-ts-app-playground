# Prices

`prices/electrcity/:yyyy/:mm/:dd?[d|m|y]`

`GET /prices/electrcity`
Prices for today

`GET /prices/electrcity/2022/3/13`
Prices for March 13, 2022

`GET /prices/electrcity/2022/3/13?r=2021/11/13`
Prices from November 13, 2021 to March 13, 2022 

## Days Back

`GET /prices/electrcity?d=1`
Prices for today and yesterday

`GET /prices/electrcity?d=45`
Prices for the last 45 days and prices for today

`GET /prices/electrcity/2022/4/1?d=5`
Prices 5 days back from start date, inclusive (2022-04-01 - 2022-03-27)

## Months Back

`GET /prices/electrcity?m=1`
Prices for the last full month and the current month

`GET /prices/electrcity/2022/4`
Prices for April 2022 (2022-04-01 - 2022-04-30)

`GET /prices/electrcity/2022/4?m=3`
Prices between April 2022 and Jan 2022 (2022-01-01 - 2022-04-30)

`GET /prices/electrcity/2022/4/6?m=3`
Prices between April 6, 2022 and Jan 2022 (2022-01-01 - 2022-04-06)

## Years back

`GET /prices/electrcity?y=1`
Prices for this and last years

`GET /prices/electrcity/2022`
Prices for 2022

`GET /prices/electrcity/2022/4?y=2`
Prices between April 2022 and Jan 2020 (2020-01-01 - 2022-04-01)

`GET /prices/electrcity/2022/4/6?y=3`
Prices between April 6 2022 and Jan 2022 (2019-01-01 - 2022-04-06)

