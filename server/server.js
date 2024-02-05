const express = require("express");
const app = express();
const game = require("./utils/game");
const connection = require("./database");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Cors options
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Endpoint to get the game data from function
app.get("/api", (req, res) => {
  game().then((result) => {
    res.send(result);
  });
});

// Endpoint to get the game data from the database
app.get("/database", (req, res) => {
  const selectQuery = `
    SELECT *
    FROM products;
    `;

  connection.query(selectQuery, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

// Endpoint to get cart products froms carts table from database
app.post("/getCartProducts", (req, res) => {
  const cartArray = req.body.cart;
  if (!cartArray || cartArray.length == 0 || cartArray[0] === "") {
    return res.send({ error: "Empty Cart" });
  }

  let selectQuery = `
    SELECT id, name, price, game_cover_url
    FROM products
    WHERE id = `;

  cartString = cartArray.join(` OR id = `);

  selectQuery += cartString;

  connection.query(selectQuery, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

// Endpoint to get singular game data from the database
app.get("/product", (req, res) => {
  const id = req.query.id;

  const selectQuery = `
  SELECT * FROM products
  WHERE products.id = ${id}
  `;

  connection.query(selectQuery, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

// Endpoint to get games based on search query
app.get("/filter", (req, res) => {
  const query = req.query.search;
  const filterQuery = `
  SELECT * from products
  WHERE CONCAT_WS('|', name, developer, publisher, release_date, genres, game_modes, rating, summary) LIKE '%${query.replaceAll(
    "'",
    '"'
  )}%';
  `;

  connection.query(filterQuery, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

// Endpoint to get games based on the sort query
app.get("/sort", (req, res) => {
  const sortQuery = req.query.sortBy;
  switch (sortQuery) {
    case "Price Low to High":
      const sortPriceLowToHigh = `
            SELECT *
            FROM products
            ORDER BY price asc
            `;
      connection.query(sortPriceLowToHigh, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Price High to Low":
      const sortPriceHighToLow = `
            SELECT *
            FROM products
            ORDER BY price desc
            `;
      connection.query(sortPriceHighToLow, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Name A - Z":
      const sortNameA_Z = `
            SELECT *
            FROM products
            ORDER BY name
            `;
      connection.query(sortNameA_Z, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Name Z - A":
      const sortNameZ_A = `
            SELECT *
            FROM products
            ORDER BY name desc
            `;
      connection.query(sortNameZ_A, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Rating High to Low":
      const ratingHighToLow = `
            SELECT *
            FROM products
            ORDER BY rating desc
            `;
      connection.query(ratingHighToLow, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Rating Low to High":
      const ratingLowToHigh = `
            SELECT *
            FROM products
            ORDER BY rating asc
            `;
      connection.query(ratingLowToHigh, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
  }
});

// Endpoint to get games based on the filter option
app.get("/filterBy", (req, res) => {
  const filterQuery = req.query.category;
  switch (filterQuery) {
    case "Singleplayer":
      const singlePQuery = `
            SELECT *
            FROM products
            WHERE game_modes LIKE '%Single player%'
            `;

      connection.query(singlePQuery, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Multiplayer":
      const multiplayer = `
            SELECT *
            FROM products
            WHERE game_modes LIKE '%${filterQuery}%'
            `;

      connection.query(multiplayer, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "RPG":
      const rpg = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(rpg, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Beat 'em up":
      const hack = `
            SELECT *
            FROM products
            WHERE genres LIKE '%Hack%'
            `;

      connection.query(hack, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Adventure":
      const adventure = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(adventure, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Indie":
      const indie = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(indie, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Shooter":
      const shooter = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(shooter, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Puzzle":
      const puzzle = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(puzzle, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
    case "Simulator":
      const sim = `
            SELECT *
            FROM products
            WHERE genres LIKE '%${filterQuery}%'
            `;

      connection.query(sim, (err, data) => {
        if (err) {
          throw err;
        }
        res.send(data);
      });
      break;
  }
});

// Endpoint to create user data into the database
app.post("/createUser", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const matchingUsernameQuery = `
    SELECT username
    FROM users
    WHERE username = '${username}'
    `;
  const matchingEmailQuery = `
    SELECT email
    FROM users
    WHERE email = '${email}'
    `;

  if (!username) {
    return res.send({ error: "Please enter a username." });
  } else if (!email) {
    return res.send({ error: "Please enter a email." });
  } else if (!password) {
    return res.send({ error: "Please enter a password." });
  } else if (!confirmPassword) {
    return res.send({ error: "Please confirm your password" });
  } else if (password !== confirmPassword) {
    return res.send({ error: "Passwords do not match." });
  } else {
    const saltRounds = 10;

    connection.query(matchingUsernameQuery, (err, data) => {
      if (!data.length) {
        connection.query(matchingEmailQuery, (err, data) => {
          if (err) {
            throw err;
          } else if (data.length > 0) {
            return res.send({ error: "Email has already been taken!" });
          } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
              if (err) {
                throw err;
              }
              const insertQuery = `
                            INSERT INTO users (username, email, password_hash)
                            VALUES ('${username}', '${email}', '${hash}')
                            `;
              connection.query(insertQuery, (err, data) => {
                if (err) {
                  throw err;
                } else {
                  return res.send({ success: "Thank you for signing up!" });
                }
              });
            });
          }
        });
      } else {
        res.send({ error: "Username has already been taken!" });
      }
    });
  }
});

// Endpoint to login user onto website
app.post("/userLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const selectQuery = `
    SELECT id, username, email, password_hash from users
    WHERE username = '${username}'
    `;

  connection.query(selectQuery, (err, data) => {
    if (!data.length) {
      return res.send({ error: "Username or password is incorrect" });
    } else if (err) {
      throw err;
    } else {
      bcrypt.compare(password, data[0].password_hash, function (err, result) {
        if (!result) {
          return res.send({ error: "Username or password is incorrect" });
        } else {
          const getCartQuery = `
                    SELECT cartlist
                    FROM carts
                    WHERE userid = ${data[0].id}
                    `;
          connection.query(getCartQuery, (err, cartData) => {
            if (err) {
              throw err;
            } else if (cartData.length > 0) {
              return res.send({
                username: data[0].username,
                email: data[0].email,
                userID: data[0].id,
                cartList: cartData[0].cartlist,
              });
            } else {
              return res.send({
                username: data[0].username,
                email: data[0].email,
                userID: data[0].id,
              });
            }
          });
        }
      });
    }
  });
});

// Endpoint to save cart data into the database
app.post("/saveCart", (req, res) => {
  const id = req.body.id;
  const cartList = req.body.cartList;

  const insertQuery = `
    INSERT INTO carts (userid, cartlist)
    VALUES ('${id}', '${cartList}')
    `;

  const existingCartQuery = `
    SELECT cartlist
    FROM carts
    WHERE userid = '${id}'
    `;

  const setNewCartQuery = `
    UPDATE carts
    SET cartlist = '${cartList}'
    WHERE userid = '${id}'
    `;

  connection.query(existingCartQuery, (err, data) => {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      connection.query(setNewCartQuery, (err, data) => {
        if (err) {
          throw err;
        } else {
          return res.send({ success: "Cart saved successfully" });
        }
      });
    } else {
      connection.query(insertQuery, (err, data) => {
        if (err) {
          throw err;
        } else {
          return res.send({ success: "Cart saved successfully" });
        }
      });
    }
  });
});

// Endpoint to update name of user in the database
app.post("/changeName", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;

  if (username === "") {
    return res.send({ error: "Please insert a new username" });
  }

  const altarQuery = `
    UPDATE users
    SET username = '${username}'
    WHERE id = '${id}'
    `;

  const matchQuery = `
    SELECT id, username
    FROM users
    WHERE id != '${id}' AND username = '${username}'
    `;

  connection.query(matchQuery, (err, data) => {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      return res.send({ error: "Username is already taken!" });
    } else {
      connection.query(altarQuery, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ newName: username });
        }
      });
    }
  });
});

// Endpoint to update email of user in the database
app.post("/changeEmail", (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

  if (email === "") {
    return res.send({ error: "Please insert your new email" });
  }

  const altarQuery = `
    UPDATE users
    SET email = '${email}'
    WHERE id = '${id}'
    `;

  const matchQuery = `
    SELECT id, email
    FROM users
    WHERE id != '${id}' AND email = '${email}'
    `;

  connection.query(matchQuery, (err, data) => {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      return res.send({ error: "Email is already taken!" });
    } else {
      connection.query(altarQuery, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ newEmail: email });
        }
      });
    }
  });
});

// Endpoint to update password of user in the database
app.post("/changePassword", (req, res) => {
  const currentPass = req.body.currentPassword;
  const newPass = req.body.newPassword;
  const confirmPass = req.body.confirmPass;
  const id = req.body.id;

  const findUserQuery = `
    SELECT password_hash
    FROM users
    WHERE id = '${id}'
    `;

  if (currentPass == "" || newPass == "" || confirmPass == "") {
    return res.send({ error: "You're missing a field!" });
  } else if (newPass !== confirmPass) {
    return res.send({ error: "Your new passwords do not match!" });
  } else {
    connection.query(findUserQuery, (err, data) => {
      if (err) {
        throw err;
      } else {
        bcrypt.compare(currentPass, data[0].password_hash, (err, result) => {
          if (err) {
            throw err;
          } else if (!result) {
            return res.send({ error: "You have inputted the wrong password!" });
          } else {
            bcrypt.hash(newPass, 10, (err, hash) => {
              if (err) {
                throw err;
              } else {
                const altarQuery = `
                                UPDATE users
                                SET password_hash = '${hash}'
                                WHERE id = '${id}'
                                `;
                connection.query(altarQuery, (err, data) => {
                  if (err) {
                    throw err;
                  } else {
                    res.send({
                      sucess: "You have successfully changed your password!",
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

// Listen to port 4000
app.listen(4000, () => {
  console.log("server started on port 4000");
});
