const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const os = require("os");

// Use os.tmpdir() to get the system's temporary directory
const tempDirectory = os.tmpdir();
console.log("Temp Dir" , tempDirectory);
// Read the contents of the temp directory
fs.readdir(tempDirectory, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Delete each file
  files.forEach((file) => {
    const filePath = path.join(tempDirectory, file);
    console.log("file path",filePath)

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting file ${filePath}:`, unlinkErr);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  });
});

module.exports = router;
