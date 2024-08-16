require('dotenv').config();
const express = require('express');
const {router} = require ('./src/routes');
const cors = require('cors');

const app = express();

const rateLimit = require("express-rate-limit");
const helmet  = require('helmet');

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
app.use(limiter);
app.use(helmet());
app.disable('x-powered-by')

module.exports = app;

const port = process.env.PORT || 1234;

app.use(cors());

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin: *');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })

app.use(express.json());

router(app);

// custom 404
app.use((req, res, next) => {
  res.status(404).json({message:"Désolé, nous ne pouvons pas trouver cela !"})
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Quelque chose a mal tourné !')
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

