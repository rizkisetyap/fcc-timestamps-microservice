// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date_string?', (req, res) => {
  const { date_string } = req.params;
  let date,
    result = { error: 'Invalid Date' };
  console.log(typeof date_string);
  if (typeof date_string === 'string') {
    if (date_string === '') {
      date = new Date();
    } else if (+date_string == date_string) {
      date = new Date(+date_string);
    } else {
      date = new Date(date_string);
    }
    console.log(date);
    if (!isNaN(date)) {
      result = {
        unix: date.getTime(),
        utc: date.toUTCString(),
      };
    }
  } else {
    date = new Date();
    result = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }

  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
