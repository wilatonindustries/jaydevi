global.WebSocket = require('ws');
const DerivAPI = require('@deriv/deriv-api/dist/DerivAPI');
const fetch = require('node-fetch');

// take this order from frontend
// const order = {
//     contract_type: 'CALL',
//     currency: 'USD',
//     amount: 10,
//     duration: 5,
//     duration_unit: 't',
//     symbol: 'frxUSDJPY',
//     basis: 'stake',
// }

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());



const cors = require('cors');
app.use(cors());




const jwt = require('jsonwebtoken');

const jwtpass = "uhfgudhguadhfughhfgadhfughdfhdfh";

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'
});


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'wilaytbz_Trade_user',
//     password: 'Trade@123',
//     database: 'wilaytbz_trading_db',
//      port: 3306
// });





connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to database");
    }
});



app.get('/', (req, res) => {
    res.send('hello');
});

//******  POST API ******* */

app.post('/adduser', (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const app_id = req.body.app_id;
    const token = req.body.token;
    const password = req.body.password;


    const query = "INSERT INTO   user (fullname,username,email,mobile,app_id,token,password)  VALUES (?,?,?,?,?,?,?)";
    connection.query(query, [fullname, username, email, mobile, app_id, token, password], (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: err.sqlMessage,
                data: []
            });
        } else {
            res.status(200).send(
                {
                    success: true,
                    msg: "successfully Added",
                    data: result
                }
            );
        }
    });
});

//******  POST API ******* */

// nxkszjn
//******  GET API ******* */

app.get('/Alluser', (req, res) => {
    const query = "SELECT * from user where status = 1";
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: "Server error",
                data: []
            });
        } else {
            res.status(200).send(
                {
                    success: true,
                    msg: " show All Details of user ",
                    data: result
                }
            );
        }
    });
});

//******  GET API ******* */

//******  PUT API ******* */

app.put('/user/update/:id', (req, res) => {
    const id = req.params.id;
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const app_id = req.body.app_id;
    const token = req.body.token;
    const password = req.body.password;


    const query = "UPDATE user SET   fullname = ?, username = ?, email = ?, mobile=?, app_id=?, token=? , password=? WHERE id = ?";
    connection.query(query, [fullname, username, email, mobile, app_id, token, password, id], (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: err.sqlMessage,
                data: []
            });
        } else {
            res.status(200).send(
                {

                    success: true,
                    msg: "Successfully updated",
                    data: result.affectedRow
                }
            );
        }
    });


});

//******  PUT API ******* */

//******  DELETE API ******* */

app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM user WHERE id = ?;`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: err.message,
                data: [],
            });
        } else {
            res.status(200).send({
                success: true,
                message: "deleted successfully",
                data: result,
            });
        }
    });
});

//******  DELETE API ******* */


// app.get('/getAccount/:user_id', (req, res) => {
//     const user_id = req.params.user_id;
//     const query = `SELECT * FROM user WHERE id = ${user_id}`;
//     connection.query(query, (err, result) => {

//         if (result.length) {
//             const app_id = result[0].app_id;
//             const token = result[0].token;
//             console.log(app_id, token);
//             getAccount(app_id, token).then((account) => {
//                 console.log(account._data);
//                 res.send({
//                     status: true,
//                     message: "Account successfully",
//                     data: account.email
//                 });
//             }).catch((err) => {
//                 console.error(err);
//                 res.status(500).json({
//                     status: false,
//                     message: err.message
//                 });
//             });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     });
// });hhhhhh



app.get('/getAccount', (req, res) => {
    const query = "SELECT * from user where status = 1";
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: "Server error",
                data: []
            });
        } else {
            res.status(200).send(
                {
                    success: true,
                    msg: " show All Details of user ",
                    data: result
                }
            );
        }
    });
});





//master login
//master login using jwt
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const scheme = req.body.scheme;

    const query = "SELECT  m_id , first,last FROM master WHERE email LIKE ? AND password LIKE ?";
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                msg: "server error",
                data: []
            })
        } else {
            if (result.length) {
                try {
                    const token = jwt.sign({
                        master: result[0]
                    }, jwtpass,

                        { expiresIn: '800d' }
                    );

                    res.status(200).send({
                        success: true,
                        msg: "Login Success",
                        data: token
                    })

                } catch (err) {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        msg: "server error",
                        data: []
                    })
                }
            } else {
                res.status(404).send({
                    success: false,
                    msg: "Wrong username and password.",
                    data: []
                })
            }
        }
    });
});


//master Register
app.post('/regi_master', (req, res) => {
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;


    const query = "INSERT INTO master (first,last,email,mobile,password)  VALUES (?,?,?,?,?)";
    connection.query(query, [first, last, email, mobile, password], (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                msg: err.sqlMessage,
                data: []
            });
        } else {
            res.status(200).send(
                {
                    success: true,
                    msg: "successfully Added",
                    data: result
                }
            );
        }
    });
});



  





async function getAccount(app_id, token) {
    return new Promise(async (resolve, reject) => {
        try {
            api = new DerivAPI({ app_id });
            const account = await api.account(token);
            resolve(account);
        } catch (err) {
            console.error(err);
            reject(err);
        } finally {
            // Close the connection and exit
            // api.basic.disconnect();
        }
    });
}

// getSymbols(36855,"hX22O3OtwFI0jKk");
// async function getSymbols(app_id, token) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let api = new DerivAPI({ app_id });
//             const account = await api.account(token);
//             const symbols = await api.activeSymbols();
//             console.log(symbols);
//             resolve(symbols);
//         } catch (err) {
//             console.error(err);
//             reject(err);
//         } finally {
//             // Close the connection and exit
//             // api.basic.disconnect();
//         }
//     });
// }



app.post('/fall', (req, res) => {
    connection.query("SELECT * FROM user", (err, result) => {
        if (err) return res.json({ err });
        const responses = [];

        // Iterate through each user and process the fall contract
        result.forEach(async (user, index) => {
            const token = user.token;
            const app_id = user.app_id;

            try {
                // Call the function to handle the fall contract
                const fallResponse = await fall(app_id, token, req.body);
                console.log(fallResponse);
                responses.push(fallResponse);
            } catch (error) {
                console.error(error);
                responses.push({ error: error.message });
            }

            // Check if this is the last user in the loop
            if (index === result.length - 1) {
                res.status(200).json(responses);
            }
        });
    });
});

// Function to handle the fall contract
async function fall(app_id, token, order) {
    return new Promise(async (resolve, reject) => {
        try {
            const api = await new DerivAPI({ app_id });
            const account = await api.account(token);
            const contract = await api.contract(order);
            const fall = await contract.fall();
            console.log("fall", fall);
            resolve(fall);
        } catch (err) {
            console.error(err);
            resolve({ error: err.message });
        }
    });
}
////////////////



app.get('/alltrader', (req, res) => {
    const query = "SELECT book_order.id , book_order.contract_type , book_order.currency, book_order.amount , book_order.duration , book_order.duration_unit , book_order.symbol, book_order.basis FROM book_order WHERE 1";
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                success: false,
                msg: "Server error",
                data: []
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: true,
                msg: "No trader details found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            msg: "Show all trader details",
            data: result
        });
    });
});


async function getUsersFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM user"; // Modify the query as needed to retrieve user data
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



app.delete("/deletesell/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM book_order WHERE id = ?;`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: err.message,
                data: [],
            });
        } else {
            res.status(200).send({
                success: true,
                message: "deleted successfully",
                data: result,
            });
        }
    });
});





////****///this api works///// */
app.post('/buy', async (req, res) => {
    connection.query("SELECT * FROM user", async (err, result) => {
        if (err) return res.json({ err });

        const responses = [];

        for (const user of result) {
            try {
                const token = user.token;

                // Fetch the user_id from your API
                const user_id = user.id;
                console.log("User ID:", user_id);

                const app_id = user.app_id;

                const buyResponse = await buyContract(app_id, token, req.body);
                console.log("Buy response:", buyResponse);

                // Insert data into the contracts table
                const contractsQuery = "INSERT INTO contracts (user_id, contract_id) VALUES (?, ?)";
                const contractsValues = [user_id, buyResponse.contract_id];
                console.log(contractsValues);
                // contracts.push(buyResponse.contract_id);
                connection.query(contractsQuery, contractsValues, (contractsErr, contractsResult) => {
                    if (contractsErr) {
                        console.error("Error inserting into contracts:", contractsErr);
                    } else {
                        console.log("Inserted into contracts:", contractsResult);
                    }
                });


                // Insert data into the book_order table
                const bookOrderQuery = "INSERT INTO book_order (contract_type, currency, amount, duration, duration_unit, symbol, basis, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                const bookOrderValues = [req.body.contract_type, req.body.currency, req.body.amount, req.body.duration, req.body.duration_unit, req.body.symbol, req.body.basis, 'active'];

                connection.query(bookOrderQuery, bookOrderValues, (bookOrderErr, bookOrderResult) => {
                    if (bookOrderErr) {
                        console.error("Error inserting into book_order:", bookOrderErr);
                    } else {
                        console.log("Inserted into book_order:", bookOrderResult);
                    }
                });


                responses.push({ user_id, contract_id: buyResponse.contract_id });
            } catch (error) {
                console.error('Error processing user:', error);
                // Handle the error as needed
            }
        }

        res.status(200).json(responses);
    });
});

async function buyContract(app_id, token, order) {
    return new Promise(async (resolve, reject) => {
        try {
            const api = await new DerivAPI({ app_id });
            const account = await api.account(token);

            const contract = await api.contract(order);
            contracts.push(contract);

            const buy = await contract.buy();

            console.log("Buy response:", buy);

            resolve(buy);
        } catch (err) {
            console.error("Error buying contract:", err);
            reject(err);
        }
    });
}

async function getUserIDFromAPI(token) {
    return new Promise(async (resolve, reject) => {
        try {
            // Query your user table to get the user_id based on the token
            const query = "SELECT id AS user_id FROM user WHERE token = ? LIMIT 1";

            connection.query(query, [token], (err, result) => {
                if (err) {
                    console.error('Error querying user table:', err);
                    reject(err);
                } else {
                    if (result.length > 0) {
                        const user_id = result[0].user_id;
                        resolve(user_id);
                        console.log(638 , contracts)
                    } else {
                        // Handle the case where the user is not found in the table
                        const error = 'User not found in the user table';
                        console.error(error);
                        reject(error);
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching user_id from user table:', error);
            reject(error);
        }
    });
}
/////****/////this api works////// */



let contracts = [];


app.get('/sellAll', (req, res) => {
    const resp = [];
    console.log(contracts)
    contracts.forEach(async (contract, index) => {
        try {
            const sell = await contract.sell();
            console.log(sell);
            resp.push(sell);
            if (index === contracts.length - 1) {
                res.status(200).json(resp);
            }
        } catch (error) {
            console.error(error);
            resp.push({ error: error.message });
            if (index === contracts.length - 1) {
                res.status(200).json(resp);
            }
        }
    });
});






app.listen(3000);




// {
//     "contract_type": "CALL",
//     "currency": "USD",
//     "amount": "1",
//     "duration": "1",
//     "duration_unit": "m",
//     "symbol": "R_100",
//     "basis": "payout"
//   }