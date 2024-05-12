const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const { client, checkUserSession } = require('./middleware');
const controller = require('./controller/auth.controller');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
client.connect();
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const axios = require('axios');
// Import necessary modules
const express = require('express');
const app = express();
const { exec } = require('child_process');

// Route for API Endpoint Disclosure Vulnerability Testing
app.get('/api-endpoint-disclosure', (req, res) => {
    // Execute a command to check for API endpoint disclosure vulnerability
    // Example command: nmap --script http-enum <target-IP>
    exec('nmap --script http-enum <target-IP>', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error occurred during vulnerability scan.' });
        } else {
            // Parse the output and send it as response
            const scanResult = stdout; // Example: "Found exposed API endpoints: /api/user, /api/admin"
            res.json({ vulnerability: 'API Endpoint Disclosure', description: 'This vulnerability arises when an API unintentionally exposes information about its endpoints or inner workings to unauthorized users. It can lead to information leakage, making it easier for attackers to understand the API\'s structure and potentially identify vulnerabilities.', prevention: 'To prevent this, organizations should implement proper access controls, authentication, and authorization mechanisms to ensure that sensitive endpoint information is not exposed.', scanResult });
        }
    });
});

// Route for Clickjacking Vulnerability Testing
app.get('/clickjacking-test', (req, res) => {
  // Execute a command to check for clickjacking vulnerability
  // Example command: curl -X GET -H "X-Frame-Options: deny" <target-URL>
  exec('curl -X GET -H "X-Frame-Options: deny" <target-URL>', (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error occurred during vulnerability test.' });
      } else {
          // Parse the output and send it as response
          const testResult = stdout; // Example: "Clickjacking protection enabled: No framing allowed"
          res.json({ testResult });
      }
  });
});
// Route for Directory Traversal Vulnerability Testing
app.get('/directory-traversal-test', (req, res) => {
  // Execute a command to check for directory traversal vulnerability
  // Example command: curl -X GET <target-URL>/../../../etc/passwd
  exec('curl -X GET <target-URL>/../../../etc/passwd', (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error occurred during vulnerability test.' });
      } else {
          // Parse the output and send it as response
          const testResult = stdout; // Example: "Directory traversal vulnerability detected: /etc/passwd accessed"
          res.json({ testResult });
      }
  });
});
function network_monitor(interval=1) {
  setInterval(() => {
      exec('nmap --script http-enum <target-IP>', (err, stdout, stderr) => {
          if (err) {
              console.error(err);
              // Handle error
          } else {
              const scanResult = stdout.trim(); // Trim any whitespace from the output
              console.log("Network Scan Result:", scanResult);
              // Process scan result or send it to any logging system
          }
      });
  }, interval * 1000); // Convert seconds to milliseconds
}

// Start the server
// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    
    // Start network monitoring after server starts
    network_monitor(); 
});const {createCaptchaSync} = require("captcha-canvas");

function checkPasswordStrength(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const commonPasswordRegex = /^(password|123456|12345678|qwerty|abc123|admin|welcome|654321|password1|123123|123456789|123123123|000000|1234567|1234567890|qwertyuiop|myspace1|password123|password12|password1234|welcome1|654321|1q2w3e4r5t|123qwe|123qwe!@#|1q2w3e4r5t6y|abc123!@#|qwerty123|qwerty123!@#|password!@#$%^&*|password!@#$%^&*()_+|password!@#$%^&*()_+{}|password!@#$%^&*()_+{}[]|password!@#$%^&*()_+{}[]\|)$/i;

  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!passwordRegex.test(password)) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character';
  }

  if (commonPasswordRegex.test(password)) {
    return 'Password is too common and easy to guess';
  }

  return 'Password is strong';
}


const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for vulnerability scan
app.get('/vulnerability-scan', (req, res) => {
    exec('npm audit --json', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error occurred during vulnerability scan.' });
        } else {
            const auditReport = JSON.parse(stdout);
            res.json({ auditReport });
        }
    });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the server for testing purposes or other modules
module.exports = server;

const rootDirectory = __dirname; // This assumes the root directory is the current directory


//Security verification for email account and body content validation:
const validation = require('deep-email-validator')

const storeItems = new Map([[
  1, { priceInCents: 100, name: "donation"}
]])
app.use(express.json({limit: '10mb'}));
// Use helmet middleware to set security headers

// app.use(helmet());
// Function to sanitize and normalize file paths
// function sanitizeFilePath(filePath) {
//   // Use path.normalize to ensure the path is in normalized form
//   const normalizedPath = path.normalize(filePath);

//   // Use path.join to join the normalized path with the root directory
//   const rootDirectory = __dirname; // This assumes the root directory is the current directory of the script
//   const absolutePath = path.join(rootDirectory, normalizedPath);

//   // Ensure that the resulting path is still within the root directory
//   if (absolutePath.startsWith(rootDirectory)) {
//     return absolutePath;
//   } else {
//     // If the path goes outside the root directory, return null or handle the error as needed
//     return null;
//   }
// }

//This API endpoint is fetched when the user clicks the donate button.
//This endpoint generates a new checkout session using Stripe.
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body.items);
    const session = await stripe.checkout.sessions.create({
      submit_type: 'donate',
      customer_email: req.body.userEmail,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: storeItem.name,
            },
            //Conversion
            unit_amount: item.quantity * 100,
          },
          quantity: 1,
        }
      }),
      success_url: "http://localhost:8080", //`${process.env.CLIENT_URL}`,
      cancel_url: "http://localhost:8080"//`${process.env.CLIENT_URL}`,
    })
    console.log("two");
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

//This API endpoint fetches the "charges", AKA donations, from the Stripe account.
//It returns a json object of all the charges
app.get('/donations', async(req,res) => {
  let charges;
  try{
    while (true) {
      nextPage = null;
      firstPage = false;
      if(firstPage == false){
        charges = await stripe.charges.list({
          limit: 100,
        });
        firstPage = true;
      }
      
      if (!charges.has_more) {
        break; // Exit the loop when there are no more pages
      }
      nextPage = charges[charges.length() - 1]
      charges = await stripe.charges.list({
        limit: 100,
        starting_next: nextPage
      });
      firstPage = true;
    }
    res.json({ charges });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
//This endpoint retrieves the donation amounts from the associated stripe account
//it adds up the amounts to return a cumulative total. Used on admin dashboard.
app.get('/cumulativeDonations', async(req, res) => {
  let cumulativeTotal = 0;
  try{
    while (true) {
      nextPage = null;
      firstPage = false;
      let charges;
      if(firstPage == false){
        charges = await stripe.charges.list({
          limit: 100,
        });
        firstPage = true;
      }
      
    charges.data.forEach(charge => {
        cumulativeTotal += charge.amount;
    });
    if (!charges.has_more) {
      break; // Exit the loop when there are no more pages
    }
    nextPage = charges[charges.length() - 1]
    charges = await stripe.charges.list({
      limit: 100,
      starting_next: nextPage
    });
      firstPage = true;
    }
    
    cumulativeTotal = cumulativeTotal / 100;
    cumulativeTotal = cumulativeTotal.toFixed(2);
    
    console.log('Cumulative Total:', cumulativeTotal);
    res.json({ cumulativeTotal });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
})

app.get('/data/captcha', (req, res) => {
  const {image, text} = createCaptchaSync(300,100); // Use the package's functionality
  fs.writeFileSync("./public/captchaImg.png", image);
  console.log("text: ", text);
  console.log("Image: ", image);
  res.json({image, text});
});

// serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public'), { index: path.join(__dirname, 'public/login.html')}))

var corsOptions = {
  origin: ["http://localhost:8081", "*"]
};

app.use(cors(corsOptions))

//bodyParser to make sure post form data is read
const bodyParser = require("express");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

//const serveIndex = require('serve-index'); 
//app.use('/images/bio', serveIndex(express.static(path.join(__dirname, '/images/bio'))));

app.use(
  cookieSession({
    name: "echo-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'echodatabytes@gmail.com',
    pass: 'ltzoycrrkpeipngi'
  }
});

// Function to escape special characters to HTML entities
function escapeHtmlEntities(input) {
  return input.replace(/[\u00A0-\u9999<>&]/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });
}

async function testEmail(input) {
  let res = await validation.validate(input)
  return {result: res.valid, response: res.validators}
  
}

app.post("/send_email", async (req, res) => {
  const { email, query } = req.body;
  const validationResult = await testEmail(email);
  if (validationResult.result){
      // Validate the email address
      // If email validation is successful, proceed to send the email
      let html_text = '<div>';
      html_text += '<h2>A new query has been received for Project Echo HMI</h2>';
      html_text += '<img src="cid:logo@echo.hmi" style="height: 150px; width: 150px; display: flex; margin: auto;"/>';
      html_text += '<p>Sender: \t ' + email + '</p>'; // Convert sender's email to HTML entities
      html_text += '<p>Query: \t ' + escapeHtmlEntities(query) + '</p>'; // Convert query to HTML entities
      html_text += '<hr>';
      html_text += '<p>Yes, this mailbox is active. So please feel free to reply to this email if you have other queries.</p>';
      html_text += '</div>';

      let mailOptions = {
        from: email,
        to: `echodatabytes@gmail.com, ${email}`,
        subject: 'New query received!',
        text: query,
        html: html_text,
        attachments: [{   // stream as an attachment
          filename: 'image.png',
          content: fs.createReadStream(path.join(__dirname, 'public/images/tabIcons/logo.png')),
          cid: 'logo@echo.hmi' //same cid value as in the html
        }]
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.send('<script> alert("user query sent! Please check your mailbox for further communication"); window.location.href = "/"; </script>')
        }
      });
    } else {
      return res.status(400).send("<script> alert(`Sender's email is not valid!`)</script>");
    }
    
  }
);

  app.get("/send_email", (req,res) => {
    setTimeout(() => res.redirect("/"), 5000)
  });


var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function genPass(length) {
  let password = "";
  for (var i = 0; i <= parseInt(length); i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

app.post("/request_access", async (req, res) => {
  console.log("email: ", req.body.email);
  const { email } = req.body;
  //Generate Guest credentials + timestamp
  let salt = '';
  while (salt.length < 8) {
    salt = crypto.getRandomValues(new Uint32Array(1)).toString();
  }
  let username = 'guest_' + email.split('@')[0] + "_" + salt;
  let password = genPass(12);
  let timestamp = new Date(Date.now() + 1800000) //Set time to live of 1800000 ms = 1800 s = 30 mins
  let request = {
    "username": username,
    "email": req.body.email,
    "password": password,
    "timestamp": timestamp
  }
  console.log("Guest details: ", request)
  try {
    //Sending that to Guest signup
    const response = await controller.guestsignup(request);

    setTimeout(() => {
      console.log("response is back! ", response);
      //Send email to user when success
      if (response && response.status === 'success') {
        let html_text = '<div>';
        html_text += '<h2>Echo HMI Temporary Access Requested!</h2>'
        html_text += '<img src="cid:logo@echo.hmi" style="height: 150px; width: 150px; display: flex; margin: auto;"/>'
        html_text += '<p>Dear \t <strong>' + req.body.email + '</strong></p>';
        html_text += '<hr>';
        html_text += '<p>Thank you for your patience, here is your login credential </p>'
        html_text += '<p><strong>Username:</strong> \t ' + username + '</p>'
        html_text += '<p><strong>Password:</strong> \t ' + password + '</p>'
        html_text += '<br><p>Please take in mind that this account will only be valid until ' + timestamp.toString() + ' (Subject to change based on development)</p>'
        html_text += '</div>';
        let mailOptions = {
          from: email,
          to: `echodatabytes@gmail.com, ${email}`,
          subject: 'Guest User Access Granted!',
          html: html_text,
          attachments: [{   // stream as an attachment
            filename: 'image.png',
            content: fs.createReadStream(path.join(__dirname, 'public/images/tabIcons/logo.png')),
            cid: 'logo@echo.hmi' //same cid value as in the html
          }]
        }
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.send('<script> alert("Temporary credential granted! Please check your mailbox."); window.location.href = "/login"; </script>')
          }
        });
      } else {
        console.log("Something happened for Guest Access Granting: ", response);
        let error_box = document.getElementById("request-access-email-error");
        error_box.innerHTML = `Exception error occured: ${response.message}`;
        error_box.style.display = "block"
        setTimeout(() => {
          error_box.innerHTML = '';
          error_box.style.display = "none";
        }, 3000)
      }

    }, 200)

  } catch (error) {
    res.status(500).send({ message: 'An error occurred while sending the request access: ' + error });
  }
})

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/map.routes')(app);
app.get('*', checkUserSession);
app.get("/", async (req, res) => {
  console.log("token: ", await client.get('JWT', (err, storedToken) => {
          if (err) {
            return `Error retrieving token from Redis: ${err}`
          } else {
            return storedToken
          }
  }))
  let role = await client.get('Roles', (err, storedToken) => {
    if (err) {
      return `Error retrieving user role from Redis: ${err}`
    } else {
      return storedToken
    }
  })

  if (role.toLowerCase().includes("admin")) {
    res.redirect("/admin-dashboard")
  } else {
    res.redirect("/map")
  }
})
//Serve the admin dashboard
app.get("/admin-dashboard", (req,res)=> {
  return res.sendFile(path.join(__dirname, 'public/admin/dashboard.html'));
})

app.get("/admin-template", (req,res)=> {
  return res.sendFile(path.join(__dirname, 'public/admin/template.html'));
})
//Serve the donations tab
app.get("/admin-donations", (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/admin/donations.html'));
})
//Serve the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
})

//API Endpoint for the submission requests
app.post("/api/submit", async (req, res) => {
  let token = await client.get('JWT', (err, storedToken) => {
    if (err) {
      console.error('Error retrieving token from Redis:', err);
      return null
    } else {
      console.log('Stored Token:', storedToken);
      return storedToken
    }
  })
  let schema = req.body;
  //Set the new submission to have a "pending" review status
  schema.status = "pending";
  schema.date = new Date();
  try {
    console.log("Request submission data: ", JSON.stringify(schema));
    const axiosResponse = await axios.post('http://ts-api-cont:9000/hmi/api/submit', JSON.stringify(schema), { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'application/json'}})
    //If successful return a 201 status code
    if (axiosResponse.status === 201) {
      console.log('Status Code: ' + axiosResponse.status + ' ' + axiosResponse.statusText)
      res.status(201).send(`<script> window.location.href = "/login"; alert("Request Submitted successfully");</script>`);
    } else {
      res.status(400).send(`<script> window.location.href = "/login"; alert("Ooops! Something went wrong");</script>`);
    }
  } catch (error) {
    console.error(error.data);
    res.status(500).send("An error occurred");
  }
});

app.post("/api/approve", async (req,res) => {

})
//Navigate to requests tab on admin dashboard
app.get("/requests", (req,res) => {
  res.sendFile(path.join(__dirname, 'public/admin/admin-request.html'))
})

//API endpoint for patching the new review status to the newly reviewed edit request
app.patch('/api/requests/:id', async (req, res) => {
  const requestId = req.params.id; // Get the request ID from the URL parameter
  const newStatus = req.body.status; // Get the new status from the request body
  let schema = {requestId:requestId, newStatus: newStatus};
  let token = await client.get('JWT', (err, storedToken) => {
    if (err) {
      console.error('Error retrieving token from Redis:', err);
      return null
    } else {
      console.log('Stored Token:', storedToken);
      return storedToken
    }
  })
  try {
    console.log("Admin Request update data: ", JSON.stringify(schema));
    const axiosResponse = await axios.patch('http://ts-api-cont:9000/hmi/api/requests', JSON.stringify(schema), { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'application/json'}})
    if (axiosResponse.status === 200) {
      console.log('Status Code: ' + axiosResponse.status + ' ' + axiosResponse.statusText)
      res.status(200).send(`<script> window.location.href = "/login"; alert("Request data updated successfully");</script>`);
    } else {
      res.status(400).send(`<script> window.location.href = "/login"; alert("Ooops! Something went wrong with updating request table");</script>`);
    }
  } catch (error) {
    console.error(error.data);
    res.status(500).send({ error: 'Error updating request status' });
  }
});

//API endpoint is responsible for patching the conservation status
//Of the animal within a edit request submission with the new conservation status
//that the request includes.
app.patch('/api/updateConservationStatus/:animal', async (req, res) => {
  const requestAnimal = req.params.animal;
  const newStatus = req.body.status;
  let schema = {requestAnimal:requestAnimal, newStatus: newStatus};
  let token = await client.get('JWT', (err, storedToken) => {
    if (err) {
      console.error('Error retrieving token from Redis:', err);
      return null
    } else {
      console.log('Stored Token:', storedToken);
      return storedToken
    }
  })
  try {
    console.log("Admin update species data: ", JSON.stringify(schema));
    const axiosResponse = await axios.patch('http://ts-api-cont:9000/hmi/api/updateConservationStatus', JSON.stringify(schema), { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'application/json'}})
    if (axiosResponse.status === 200) {
      console.log('Status Code: ' + axiosResponse.status + ' ' + axiosResponse.statusText)
      res.status(200).send(`<script> window.location.href = "/login"; alert("Species Data updated successfully");</script>`);
    } else {
      res.status(400).send(`<script> window.location.href = "/login"; alert("Ooops! Something went wrong with updating species data");</script>`);
    }
  } catch (error) {
    console.error(error.data);
    res.status(500).send({ error: 'Error updating species status' });
  }
});
//Fetch the requests for the admin dashboard
app.get('/api/requests', async (req, res) => {
  try {

    let token = await client.get('JWT', (err, storedToken) => {
      if (err) {
        console.error('Error retrieving token from Redis:', err);
        return null
      } else {
        console.log('Stored Token:', storedToken);
        return storedToken
      }
    })

    const axiosResponse = await axios.get('http://ts-api-cont:9000/hmi/requests', { headers: {"Authorization" : `Bearer ${token}`}})
  
    if (axiosResponse.status === 200) {
      res.json(axiosResponse.data);
    } else {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } catch (err) {
    console.log('Requests error: ', err)
    res.status(401).redirect('/admin-dashboard')
  }
});
//Page Direction to Welcome page after logging in
app.get("/welcome", async (req,res) => {
  try {
    console.log("token: ", await client.get('JWT', (err, storedToken) => {
            if (err) {
              return `Error retrieving token from Redis: ${err}`
            } else {
              return storedToken
            }
    }))
    let role = await client.get('Roles', (err, storedToken) => {
      if (err) {
        return `Error retrieving user role from Redis: ${err}`
      } else {
        return storedToken
      }
    })
    //If the user that has just logged in is an admin, direct them
    //to the admin dashboard. Otherwise direct them to the map.
    if (role.toLowerCase().includes("admin")) {
      res.redirect("/admin-dashboard")
    } else {
      res.redirect("/map")
    }
  }
  catch {
    res.send(`<script> alert("No user info detected! Please login again"); window.location.href = "/login"; </script>`);
  }
})
//Page direction to the map
app.get("/map", async(req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});