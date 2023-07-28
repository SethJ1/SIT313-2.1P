const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = '4de184ba842d30748546843685231caf-73f745ed-640731c2';
const domain = 'sandboxc0a8a00bbf0745d390c4ee76d1d5f749.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey, domain });

app.use(express.static('public'));

app.post('/signup', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required!' });
  }

  const data = {
    from: 'sethj4774@gmail.com',
    to: email,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      console.log(body);
      return res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


