# Discord Username Checker

This is a simple Discord username checker script that checks the availability of usernames on Discord. It utilizes the Discord API to check if a username is taken or available.

## Prerequisites

Before running the script, make sure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the script file `username_checker.js` to your local machine.
2. Open a terminal or command prompt and navigate to the directory where the script is located.
3. Run the following command to install the required dependencies:

   ```shell
   npm install fs colors node-fetch
   ```

## Usage

1. Open the `username_checker.js` file in a text editor.
2. Replace the existing code with your own code or use the provided code.
3. Save the file.

To run the script, open a terminal or command prompt and navigate to the directory where the script is located. Then, run the following command:

```shell
node username_checker.js
```

The script will prompt you to enter the path of the usernames file and your Discord token. Follow the instructions and provide the required information.

The script will check each username in the file against the Discord API to determine its availability. The results will be displayed in the terminal, and the available usernames will be saved in the `available_usernames.txt` file.

**Note:** Ensure that the usernames file is in the same directory as the script and follows the format of one username per line.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code according to the terms of the license.
