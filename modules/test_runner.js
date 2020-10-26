const exec = require("child_process").exec;
const path = require("path");

/**
 * Run python files using exec from child process.
 * @param {String} fileName Name of the file you want to run.
 * @returns {Number|{ Stack: String, Code: Number, Signal: String }} exit code or response error object.
 */
const testRunner = (fileName) => {
  const targetDir = path.join(__dirname, "../runs");
  const process = exec(
    `python ${targetDir}/${fileName}`,
    (error, stdout, stderr) => {
      if (error) {
        return { Stack: error.stack, Code: error.code, Signal: error.signal };
      }
      console.log("Child Process STDOUT: " + stdout);
      console.log("Child Process STDERR: " + stderr);
    }
  );

  process.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
    io.emit("code", code);
  });
};

module.exports = { testRunner };
