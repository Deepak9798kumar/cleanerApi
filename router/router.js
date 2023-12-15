const express = require("express")
const router = express.Router()

const fs = require('fs');
const path = require('path');

const tempDirectory = 'C:\\Windows\\Temp';

// Define a route that triggers the file deletion
router.get('/delete-files', (req, res) => {
    // Read the contents of the temp directory
    fs.readdir(tempDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error: Unable to read directory');
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
                }
            });
        });

        // Send a response once all files are deleted
        res.send('Files deleted successfully');
    });
});

module.exports = router;
