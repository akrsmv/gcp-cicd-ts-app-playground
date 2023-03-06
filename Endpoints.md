
Valid substitutions so far
---
- `dataKind` = prices and `dataUnit` = bgn
- `dataKind` = usage and `dataUnit` = kwh

# {dataKind}

`{dataKind}/{dataUnit}/:yyyy/:mm/:dd?[d|m|y]`

`GET /{dataKind}/{dataUnit}`
{dataKind} for today

`GET /{dataKind}/{dataUnit}/2022/3/13`
{dataKind} for March 13, 2022

`GET /{dataKind}/{dataUnit}/2022/3/13?r=2021/11/13`
{dataKind} from November 13, 2021 to March 13, 2022 

## Days Back

`GET /{dataKind}/{dataUnit}?d=1`
{dataKind} for today and yesterday

`GET /{dataKind}/{dataUnit}?d=45`
{dataKind} for the last 45 days and {dataKind} for today

`GET /{dataKind}/{dataUnit}/2022/4/1?d=5`
{dataKind} 5 days back from start date, inclusive (2022-04-01 - 2022-03-27)

## Months Back

`GET /{dataKind}/{dataUnit}?m=1`
{dataKind} for the last full month and the current month

`GET /{dataKind}/{dataUnit}/2022/4`
{dataKind} for April 2022 (2022-04-01 - 2022-04-30)

`GET /{dataKind}/{dataUnit}/2022/4?m=3`
{dataKind} between April 2022 and Jan 2022 (2022-01-01 - 2022-04-30)

`GET /{dataKind}/{dataUnit}/2022/4/6?m=3`
{dataKind} between April 6, 2022 and Jan 2022 (2022-01-01 - 2022-04-06)

## Years back

`GET /{dataKind}/{dataUnit}?y=1`
{dataKind} for this and last years

`GET /{dataKind}/{dataUnit}/2022`
{dataKind} for 2022

`GET /{dataKind}/{dataUnit}/2022/4?y=2`
{dataKind} between April 2022 and Jan 2020 (2020-01-01 - 2022-04-01)

`GET /{dataKind}/{dataUnit}/2022/4/6?y=3`
{dataKind} between April 6 2022 and Jan 2022 (2019-01-01 - 2022-04-06)


