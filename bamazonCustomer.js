// ======= NPM MODULES ==========
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');

//create connection to database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	//username
	user: "root",
	//password
	"password": "Itsmine2",
	"database": "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  queryProducts();
});

function queryProducts() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;

		//Display all of the items available for sale. Include the ids, names, and prices of products for sale.
		console.log("======================================================================");
		console.log("                      WELCOME TO BAMAZON!");
		console.log("======================================================================");

		//Create a new Table in the cli-table view  
		var table = new Table({
			head: ['ID'.cyan, 'PRODUCT NAME'.cyan, 'DEPARTMENT'.cyan, 'PRICE'.cyan, 'STOCK QUANTITY'.cyan]
		});

		for (var i = 0; i < res.length; i++) {
			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
		}
		//Create table layout with items for sale. 
		console.log(table.toString());
		startShopping();
	});

	//prompt users with two messages.
	//The first should ask them the ID of the product they would like to buy.
	//The second message should ask how many units of the product they would like to buy.

	// function that asks the user if they would like shop using the inquirer package
	function startShopping() {
		inquirer.prompt([{
			name:  "welcome",
			message: "Would you like to shop? (Y/N)",
			type: "input",

		}]).then(function (answer) {
			if (answer.welcome.toUpperCase() === 'Y') {
				// If the user selects Y then the question function is called which prompts them to enter what they want
				questions();

			} else {
				// If the user selects no then the game ends and and the message below is displayed
				console.log("  THANKS FOR DROPPING BY. GOOD BYE!".magenta);
				process.exit(0);
			}
			
		});
	}

    // Create the function that asks the user which products they want to buy and how many
	function questions() {
		inquirer.prompt([{
			name: "userId",
			type: "input",
			message: "Please select the ID of the product you wish to buy",
			validate: function (value) {
				if (isNaN(value) === false) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			name: "userQty",
			type: "input",
			message: "How many units would you like to purchase?",
			validate: function (value) {
				if (isNaN(value) === false) {
					return true;
				} else {
					return false;
				}
			}
		}]).then(function (answer) {
			// Set the responses for the (userId and userQty) to corresponding variables
			//Then commmunicate with the products database to select from the product items
			var userItem = answer.userId;
			var userQty = answer.userQty;
			connection.query('SELECT * FROM products WHERE ?', {
					item_id: answer.userId
				},
				function (err, results) {
					if (err) throw err;
					//If the amount requested is greater than the amount in stock.
					//Commmunicate with the products database to give the results of the stock_quantity
				    //If insufficient then close connection and exit program
					if (userQty > results[0].stock_quantity) {
						console.log( "\n<<< Sorry. Insufficient inventory for that quantity!. Please try again. >>>".magenta);
						connection.end();
					}
					//If the amount requested is less than the amount in stock.
					// else the user can purchase the item
					else {
						var totalCost = userQty * results[0].price;
						var newQty = results[0].stock_quantity - userQty;
						var itemId = results[0].item_id;
						console.log("\n-----------------------------------------------------------------------");
						console.log("\n  <<< Yes this item is available! >>>".magenta);
						console.log("\n  Your order: " + userQty + " " + results[0].product_name + ".");
						console.log("\n  Total cost: " + userQty + " x " + results[0].price + " = $ " + totalCost);
						console.log("\n-----------------------------------------------------------------------\n");

						//Then prompt the user to cofirm the order.
						inquirer
							.prompt([{
								type: "confirm",
								message: "Confirm Order:",
								name: "confirmOrder",
								default: true
							}])
							.then(function (confirmResponse) {
								//If the user responds confirm, then proceed with the order and update the bamazon table.
								if (confirmResponse.confirmOrder) {
									//Communicate with the database to update the remaining quantity		
									connection.query('UPDATE products SET ? where ?', [{
											stock_quantity: newQty
										}, {
											item_id: itemId
										}],
										function (err, res) {
											if (err) throw err;
											//Output the the totalCoast for the items chosen
											console.log("\n-----------------------------------------------------------------------");
											console.log("\n You were charged $" + totalCost + " for " + userQty + "--" + results[0].product_name + ".");
											console.log("\n Thank you for your order.");
											console.log("\n-----------------------------------------------------------------------");
										    connection.end();
										}
									);
								} else {
									//If the user responds confirm false, then end the game and restart the process.
									console.log("\n-----------------------------------------------------------------------------");
									console.log("\n   Your orders has been canceled. You are directed back to the main interface.".magenta);
									console.log("\n-----------------------------------------------------------------------------\n");
									//=== RUN BAMAZON =======
									queryProducts();
								}
							});
						}
					}
				);
			});
		}
	}




