const express = require('express');
const app = express();
const path = require('path');

app.listen(8080, function() {
  console.log('listening on 8080');
})

// ajax
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'gpt-english/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'gpt-english/build/index.html'));
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'gpt-english/build/index.html'));
})


// ChatGPT API 통신
require("dotenv").config(); 

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function sendChat() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
}



app.get('/getChatGPT', function(req, res) {
  // sendChat();

  res.json({res: req})
  // res.json({})
})