const tmi = require('tmi.js');
const notifier = require('node-notifier');
const path = require('path');
const config = require('./config.js');

//channelBot

const opts = {
  identity: {
    username: config.channelBot.username,
    password: config.channelBot.password,
  },
  connection: {
    reconnect: true
  }
};
const client = new tmi.client(opts);

client.connect();
client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port} ` + config.channelBot.username);
  client2.connect();
});
client.on("disconnected", (reason) => {
  console.log(config.channelBot.username + ' ' + reason);
});
client.on("whisper", (from, userstate, message, self) => {
  if (self) return;

  if (userstate["emotes-raw"] === "25:0-4") {
    notifier.notify({
      title: 'Golden Kappa Bot',
      message: 'No golden kappa today',
      icon: path.join(__dirname, 'kappa.png'),
      sound: false
    });
    console.log('Normal Kappa');
    client.disconnect();
  }
  if (userstate["emotes-raw"] === "80393:0-4") {
    notifier.notify({
      title: 'Golden Kappa Bot',
      message: 'YOU HAVE A GOLDEN KAPPA!',
      icon: path.join(__dirname, 'goldenkappa.png'),
      sound: true
    });
    console.log('Golden Kappa');
    client.disconnect();
  }
});

//channel

const opts2 = {
  identity: {
    username: config.channel.username,
    password: config.channel.password
  },
  connection: {
    reconnect: true
  }
};
const client2 = new tmi.client(opts2);

client2.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port} ` + config.channel.username);
  client2.whisper(config.channelBot.username, "Kappa " + time() )
  .then((data) => {
      console.log(`Whisper sent to ` + config.channelBot.username);
      client2.disconnect();
  }).catch((err) => {
      console.log(err);
  });
});
client2.on("disconnected", (reason) => {
  console.log(config.channel.username + ' ' + reason);
});

function time() {
var time = new Date();
var year = time.getFullYear(); var month = time.getMonth()+1; var day = time.getDate();
var hour = time.getHours(); var minute = time.getMinutes(); var second = time.getSeconds();
if(day<10) day = "0" + day; if(month<10) month = "0" + month; if(hour<10) hour = "0" + hour; if(minute<10) minute = "0" + minute; if(second<10) second = "0" + second;
return day + "-" + month + "-" + year + " " + hour +":" + minute + ":"+ second;
}