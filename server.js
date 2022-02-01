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

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // console.log(date.includes('-'));
  if (!date) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  }
  const date_string = date.includes('-') ? date : +date;
  const d = new Date(date_string);
  const unix = d.getTime();
  const utc = d.toUTCString();
  if (!unix) {
    return res.json({
      error: 'Invalid Date',
    });
  }
  return res.json({
    unix,
    utc,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
