const express = require("express")
const userController = require("../controller/middleware")
const router = express.Router()


const fs = require('fs');
const path = require('path');

const tempDirectory = 'C:\\Windows\\Temp';

// Read the contents of the temp directory
fs.readdir(tempDirectory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Delete each file
    files.forEach(file => {
        const filePath = path.join(tempDirectory, file);

        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error(`Error deleting file ${filePath}:`, unlinkErr);
            } else {
                console.log(`File ${filePath} deleted successfully`);
                console.log("Sawari Saman ki Khud Jimedar Hai");
            }
        });
    });
});






// router.post("/emailsend", userOTP.emailSand)

module.exports = router