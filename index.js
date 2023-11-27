const mysql = require("mysql2");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const connection = mysql.createConnection({
  port: 3306,
  host: "192.168.202.233",
  user: "user",
  password: process.env.PASSWORD,
  database: "vibe",
});

connection.connect((err) => {
  if (err) {
    return console.error("Error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

function updateOrInitializeXP(id) {
  const query = `
      INSERT INTO levels (id, xp)
      VALUES (?, 10)
      ON DUPLICATE KEY UPDATE xp = xp + 10;
    `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log("XP updated or initialized", results);
    }
  });
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  message.reply("Hello! You said" + message.content);
});

client.login(process.env.TOKEN);
