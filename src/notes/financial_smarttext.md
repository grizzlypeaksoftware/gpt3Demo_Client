#notes about creating financial smart text using gpt3

Here are some of the prompts I started with...


data: { 
    "symbol": "BTC-USD", "streetName": "Bitcoin",
    "dailyhigh": "18689.99000000",
    "dailylow": "17630.00300000",
    "volume": "830.40580990",
    "quoteVolume": "15204742.38845432",
    "percentChange": "-0.47",
    "updatedAt": "2020-11-23T06:24:55.223Z", "marketCap": "340.7B", "allTimeHighDate": "2017-12-17T06:24:55.223Z", allTimeHigh:  "19891.99"
}

Bitcoin's daily high was 18689.99 USD, with a percent change of -.047%

Today bitcoin closed with a high of  18689.99 USD and a low of 17630.00.   

The price of bitcoin decreased .47% over a 24 hour period as of 11/23/2020

Bitcoin ended the day with a percent change of  -.47%, with a daily high of 18689.99 and a daily low of 17630.00.

Bitcoin's market capitalization, the total value of all bitcoins in existence, hit an all-time high of $340.7B on 11/23/2020.

Bitcoin's price reached an all-time high of  19891.99 on 12/17/2017.

Bitcoin ended the day with a percent change of  -.47%, with a daily high of 18689.99 and a daily low of 17630.00.

{symbol}'s market capitalization hit an all-time high of {marketCap} on {updatedAt}.

{symbol}'s price reached an all-time high of {high} on {date}.

Bitcoin's price is {percentChange}% higher than today's low.

Bitcoin's price is {percentChange}% lower than today's high.

Bitcoin's price is {percentChange}% below the all-time high