const fs = require("fs");
const colors = require("colors");
const fetch = require("node-fetch");

async function start() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const colors = require("colors");

  const askQuestion = (question, callback) => {
    readline.question(question, (answer) => {
      callback(answer);
    });
  };

  askQuestion(colors.cyan("Enter usernames file path: "), (filename) => {
    let username_filename = filename;

    askQuestion(colors.cyan("Enter token: "), async (token) => {
      let discord_token = token;
      readline.close();

      console.log(
        colors.green(
          "Available usernames will be saved in available_usernames.txt"
        )
      );

      fs.writeFileSync("available_usernames.txt", "");
      const filename = "usernames.txt";
      const usernames = fs.readFileSync(filename, "utf8").split("\n");

      for (const username of usernames) {
        await checkUsername(username, token);
      }
    });
  });
}

async function checkUsername(username, token) {
  while (true) {
    let res = await fetch("https://canary.discord.com/api/v9/users/@me", {
      headers: {
        authorization: token,
        "content-type": "application/json",
      },
      body: `{"username":"${username}","password":""}`,
      method: "PATCH",
    });

    let json = await res.json();
    if (json.retry_after) {
      await sleep(json.retry_after * 1000);
      continue;
    } else {
      if (
        json.message ===
        "You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently. Please read our docs at https://discord.com/developers/docs/topics/rate-limits to prevent this moving forward."
      ) {
        console.log(colors.red(`Rate limited: trying after 3 minutes`));
        await sleep(180000);
        continue;
      }
      if (json.errors.username) {
        console.log(colors.red(`Usrname: ${username} is Taken`));
      } else {
        console.log(colors.green(`Usrname: ${username} Exists`));
      }
      fs.appendFileSync("available_usernames.txt", username);
      break;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

start();
