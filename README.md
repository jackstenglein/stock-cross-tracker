# stock-cross-tracker

A Sails.js server that tracks stocks and emails me when there is either a golden cross or a dead cross. The server also simulates how much money you would have made or lost if invested in the stocks.


## Models


### Stock

The Stock model represents the stocks to track.  
The Stock model has the following attributes:
* `name` (string, required) - The name of the company
* `ticker` (string, required, unique) - The ticker symbol of the company
* `purchases` (Transaction) - The simulated purchases of the stock
* `sales` (Transaction) - The simulated sales of the stock
* `price` (float) - The most recent closing price of the stock
* `shares` (integer) - The number of simulated shares owned

### Transaction

The Transaction model represents the purchase or sale of a stock. A new Transaction is created when a golden cross or a dead cross is detected.  
The Transaction model has the following attributes:
* `stock` (Stock, required) - The Stock purchased or sold
* `type` (integer, required) - The type of transaction
    * `0` - Purchase
    * `1` - Sale
* `price` (float, required) - The price the stock would have been sold/bought at
* `date` (string, required) - The date the stock would have been sold/bought
* `shares` (integer, required) - The number of shares involved in the transaction


## Endpoints

The server runs on port 1337, so all endpoints are in relation to localhost:1337. Unless stated, all parameters are required. Query parameters are passed in the URL, while body parameters are passed in the body of the request.


### Stock endpoints

#### `POST /stock/new`
Adds a new stock to track.

Body:
* `name` (string) - The name of the company
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `stock` (object) - The newly-created stock object
* `error` (string) - The error message, if applicable


#### `DELETE /stock/remove`
Deletes a stock from the list to track. Also removes all transactions associated with the stock.

Body:
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `stock` (object) - The stock that was deleted
* `error` (string) - The error message, if applicable


#### `GET /stock/transactions`
Gets all transactions for a stock.

Query:
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `purchases` ([Object]) - The simulated purchases of the stock
* `sales` ([Object]) - The simulated sales of the stock
* `error` (string) - The error message, if applicable


#### `GET /stock/purchases`
Gets all purchases for a stock.

Query:
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `purchases` ([Object]) - The simulated purchases of the stock
* `error` (string) - The error message, if applicable


#### `GET /stock/sales`
Gets all sales for a stock.

Query:
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `sales` ([Object]) - The simulated sales of the stock
* `error` (string) - The error message, if applicable


#### `GET /stock/performance`
Gets performance data for a stock.

Query:
* `ticker` (string) - The ticker symbol of the stock

Response:
* `message` (string) - Message from API to help with debugging
* `performance` (object) - Dictionary containing the following attributes:
    * `moneyEarned` (float) - The money earned by the stock (can be negative)
    * `totalInvestment` (float) - The money invested into the stock
    * `percentReturn` (float) - The return on the stock
    * `sharesOwned` (integer) - The number of shares currently owned
    * `numberOfPurchases` (integer) - The number of purchases of the stock
    * `numberOfSales` (integer) - The number of sales of the stock
* `error` (string) - The error message, if applicable
