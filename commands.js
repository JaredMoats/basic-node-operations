const fs = require("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function errorHandler() {
  process.stdout.write('Error: Command not found');
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch(command) {
    case "echo":
       //we will add the functionality of echo next within the object commandLibrary
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      errorHandler();
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  //the echo command
  "echo": function(userInput) {
    done(userInput);
  },
  //the cat command
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (error, data) => {
      if(error)
        throw error;

      done(data);
    });
  },
  //The head command
  "head": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (error, data) => {
      if(error)
        throw error;

      //convert unicode to utf8
      let fileText = data.toString('utf8');
      //Only select the first ten lines
      let firstTenLines = fileText.split('\n').slice(0,10).join("\n");
      //convert the the text back to unicode to display in terminal
      let bufferedText = Buffer.from(firstTenLines, 'utf8');

      done(bufferedText);
    });
  },
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (error, data) => {
      if(error)
        throw error;

      let fileText = data.toString('utf8');
      let lastTenLines = fileText.split('\n').slice(-10).join('\n');
      let bufferedText = Buffer.from(lastTenLines, 'utf8');

      done(bufferedText);
    });
  }
};

exports.commandLibrary = commandLibrary;
exports.evaluateCmd = evaluateCmd;
