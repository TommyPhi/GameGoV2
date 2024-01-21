const express = require('express');
const app = express()
const game = require('./utils/game')
const connection = require('./database')
const bcrypt = require('bcrypt');
const cors = require('cors')

const corsOptions ={
    origin:'*', 
    credentials:true,     
    optionSuccessStatus:200,
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    game().then(result => {
        res.send(result)
    })
})

app.get('/database', (req, res) => {
    const selectQuery = `
    SELECT *
    FROM products;
    `

    connection.query(selectQuery, (err, data) => {
        if(err) {
            throw err;
        }
        res.send(data);
    })
})

// app.get('/database', (req, res) => {
//     fetch('http://localhost:5000/api')
//         .then(response => response.json())
//         .then(result => {

//             result.forEach(game => {
//                 const insertQuery = `
//             INSERT INTO products (name, developer, publisher, release_date, genres, game_modes, rating, summary, game_cover_url, artworks, video_link)
//             VALUES ("${game.name}", "${game.developer}", "${game.publisher}", "${game.release_date}", "${game.genres.toString().split(',').join(', ')}", "${game.game_modes.toString().split(',').join(', ')}", "${game.rating}", "${game.summary.replaceAll('"', "'")}", "${game.game_cover_url}", "${game.artworks}", "${game.video_link}")
//             `

//                 connection.query(insertQuery, (err, data) => {
//                     if(err) {
//                         throw err;
//                     }
//                 })
//             })
//         })
//     })

app.post('/getCartProducts', (req, res) => {
    const cartArray = req.body.cart;
    if(!cartArray || cartArray.length == 0 || cartArray[0] === '') {
        return res.send({error: 'Empty Cart'})
    }

    let selectQuery = `
    SELECT id, name, price, game_cover_url
    FROM products
    WHERE id = `

    cartString = cartArray.join(` OR id = `)

    selectQuery += cartString;

    connection.query(selectQuery, (err, data) => {
        if(err) {
            throw err;
        } else {
            res.send(data)
        }
    })
})

app.get('/product', (req, res) => {
  const id = req.query.id;
  
  const selectQuery = `
  SELECT * FROM products
  WHERE products.id = ${id}
  `

  connection.query(selectQuery, (err, data) => {
      if(err) {
          throw err;
      }
      res.send(data)
  })
})

app.get('/filter', (req, res) => {
  const query = req.query.search;
  const filterQuery = `
  SELECT * from products
  WHERE CONCAT_WS('|', name, developer, publisher, release_date, genres, game_modes, rating, summary) LIKE '%${query.replaceAll("'", '"')}%';
  `

  connection.query(filterQuery, (err, data) => {
      if(err) {
          throw err;
      }
      res.send(data);
  })
})

app.get('/sort', (req, res) => {
    const sortQuery = req.query.sortBy;
    switch(sortQuery) {
        case 'priceLowToHigh':
            const sortPriceLowToHigh = `
            SELECT *
            FROM products
            ORDER BY price asc
            `
            connection.query(sortPriceLowToHigh, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
        case 'priceHighToLow':
            const sortPriceHighToLow = `
            SELECT *
            FROM products
            ORDER BY price desc
            `
            connection.query(sortPriceHighToLow, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
        case 'nameA-Z':
            const sortNameA_Z = `
            SELECT *
            FROM products
            ORDER BY name
            `
            connection.query(sortNameA_Z, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
        case 'nameZ-A':
            const sortNameZ_A = `
            SELECT *
            FROM products
            ORDER BY name desc
            `
            connection.query(sortNameZ_A, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
        case 'ratingHighToLow':
            const ratingHighToLow = `
            SELECT *
            FROM products
            ORDER BY rating desc
            `
            connection.query(ratingHighToLow, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
        case 'ratingLowToHigh':
            const ratingLowToHigh = `
            SELECT *
            FROM products
            ORDER BY rating asc
            `
            connection.query(ratingLowToHigh, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send(data)
            })
            break;
    }
})

app.get('filterBy', (req, res) => {
    const filterQuery = req.query.category;
    switch(filterQuery) {
        case 'Singleplayer':
            const query = `
            SELECT *
            FROM products
            WHERE game_modes LIKE '%Single player%'
            `

            connection.query(query, (err, data) => {
                if(err) {
                    throw err
                }
                res.send(data)
            })
            break;
    }
})

app.post('/createUser', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const matchingUsernameQuery = `
    SELECT username
    FROM users
    WHERE username = '${username}'
    `
    const matchingEmailQuery = `
    SELECT email
    FROM users
    WHERE email = '${email}'
    `

    if(!username) {
        return res.send({error: 'Please enter a username.'})
    } else if(!email) {
        return res.send({error: 'Please enter a email.'})
    } else if(!password) {
        return res.send({error: 'Please enter a password.'})
    } else if(!confirmPassword) {
        return res.send({error: 'Please confirm your password'})
    } else if(password !== confirmPassword) {
        return res.send({error: 'Passwords do not match.'})
    } else {
        const saltRounds = 10;

        connection.query(matchingUsernameQuery, (err, data) => {
            if(!data.length) {
                connection.query(matchingEmailQuery, (err, data) => {
                    if(err) {
                        throw err;
                    } else if(data.length > 0) {
                        return res.send({error: 'Email has already been taken!'})
                    } else {
                        bcrypt.hash(password, saltRounds, function(err, hash) {
                            if(err) {
                                throw err;
                            }
                            const insertQuery = `
                            INSERT INTO users (username, email, password_hash)
                            VALUES ('${username}', '${email}', '${hash}')
                            `
                            connection.query(insertQuery, (err, data) => {
                                if(err) {
                                    throw err;
                                } else {
                                    return res.send({success: 'Thank you for signing up!'})
                                }
                            })
                        })
                    }
                })
            } else {
                res.send({error: 'Username has already been taken!'})
            }
        })
    }
})

app.post('/userLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const selectQuery = `
    SELECT id, username, email, password_hash from users
    WHERE username = '${username}'
    `

    connection.query(selectQuery, (err, data) => {
        if(!data.length) {
            return res.send({error: 'Username or password is incorrect'})
        } else if(err) {
            throw err;
        } else {
            bcrypt.compare(password, data[0].password_hash, function(err, result) {
                if(!result) {
                    return res.send({error: 'Username or password is incorrect'})
                } else {
                    const getCartQuery = `
                    SELECT cartlist
                    FROM carts
                    WHERE userid = ${data[0].id}
                    `
                    connection.query(getCartQuery, (err, cartData) => {
                        if(err) {
                            throw err
                        } else if(cartData.length > 0) {
                            return res.send({username: data[0].username, email: data[0].email, userID: data[0].id, cartList: cartData[0].cartlist})
                        } else {
                            return res.send({username: data[0].username, email: data[0].email, userID: data[0].id})
                        }
                    })
                }
            });
        }
    })
})

// 

app.post('/saveCart', (req, res) => {
    const id = req.body.id
    const cartList = req.body.cartList
    
    const insertQuery = `
    INSERT INTO carts (userid, cartlist)
    VALUES ('${id}', '${cartList}')
    `

    const existingCartQuery = `
    SELECT cartlist
    FROM carts
    WHERE userid = '${id}'
    `

    const setNewCartQuery = `
    UPDATE carts
    SET cartlist = '${cartList}'
    WHERE userid = '${id}'
    `

    connection.query(existingCartQuery, (err, data) => {
        if(err) {
            throw err
        } else if(data.length > 0) {
            connection.query(setNewCartQuery, (err, data) => {
                if(err) {
                    throw err
                } else {
                    return res.send({success: 'Cart saved successfully'})
                }
            })
        } else {
            connection.query(insertQuery, (err, data) => {
                if(err) {
                    throw err
                } else {
                    return res.send({success: 'Cart saved successfully'})
                }
            })
        }
    })
})

app.post('/changeName', (req, res) => {
    const id = req.body.id;
    const username = req.body.username;

    if(username === "") {
        return res.send({error: 'Please insert a new username'})
    }
    
    const altarQuery = `
    UPDATE users
    SET username = '${username}'
    WHERE id = '${id}'
    `

    const matchQuery = `
    SELECT id, username
    FROM users
    WHERE id != '${id}' AND username = '${username}'
    `

    connection.query(matchQuery, (err, data) => {
        if(err) {
            throw err;
        } else if(data.length > 0) {
            return res.send({error: 'Username is already taken!'})
        } else {
            connection.query(altarQuery, (err, data) => {
                if(err) {
                    throw err;
                } else {
                    res.send({newName: username})
                }
            })
        }
    })
})

app.post('/changeEmail', (req, res) => {
    const email = req.body.email;
    const id = req.body.id

    if(email === "") {
        return res.send({error: 'Please insert your new email'})
    }
    
    const altarQuery = `
    UPDATE users
    SET email = '${email}'
    WHERE id = '${id}'
    `

    const matchQuery = `
    SELECT id, email
    FROM users
    WHERE id != '${id}' AND email = '${email}'
    `

    connection.query(matchQuery, (err, data) => {
        if(err) {
            throw err;
        } else if(data.length > 0) {
            return res.send({error: 'Email is already taken!'})
        } else {
            connection.query(altarQuery, (err, data) => {
                if(err) {
                    throw err;
                } else {
                    res.send({newEmail: email})
                }
            })
        }
    })
})

app.post('/changePassword', (req, res) => {
    const currentPass = req.body.currentPassword;
    const newPass= req.body.newPassword;
    const confirmPass = req.body.confirmPass;
    const id = req.body.id;

    const findUserQuery = `
    SELECT password_hash
    FROM users
    WHERE id = '${id}'
    `

    if(currentPass == '' || newPass == '' || confirmPass == '') {
        return res.send({error: "You're missing a field!"})
    } else if(newPass !== confirmPass) {
        return res.send({error: 'Your new passwords do not match!'})
    } else {
        connection.query(findUserQuery, (err, data) => {
            if(err) {
                throw err;
            } else {
                bcrypt.compare(currentPass, data[0].password_hash, (err, result) => {
                    if(err) {
                        throw err;
                    } else if(!result) {
                        return res.send({error: 'You have inputted the wrong password!'})
                    } else {
                        bcrypt.hash(newPass, 10, (err, hash) => {
                            if(err) {
                                throw err;
                            } else {
                                const altarQuery = `
                                UPDATE users
                                SET password_hash = '${hash}'
                                WHERE id = '${id}'
                                `
                                connection.query(altarQuery, (err, data) => {
                                    if(err) {
                                        throw err
                                    } else {
                                        res.send({sucess: 'You have successfully changed your password!'})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

app.listen(4000, () => {
    console.log("server started on port 4000")
})