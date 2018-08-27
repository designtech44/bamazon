# Welcome to Bamazon
Node.js &amp; MySQL Database


Here is the link for the gif to show the [Bamazon process](bamazon.png)

## Instructions

### Challenge #1: Customer View

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

* item_id (unique id for each product)

* product_name (Name of product)

* department_name

* price (cost to customer)

* stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`.

6. To Run this application in the bash terminal to display all of the items available for sale. Go to file, open terminal and type `nodemon` to start, and the node bamazonCustomer.js. window will open to Include the ids, Product names, Department, prices of products for sale and the Stock Quantity.

7. The app should then prompt users with three messages.

* The first should ask them "Would you like to shop?" (Y/N).
  
* The second message should ask "Please select the ID of the product you wish to buy".

* The third message is "How many units would you like to purchase?".

1. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
* This means updating the SQL database to reflect the remaining quantity.
* Once the update goes through, show the customer the total cost of their purchase.
