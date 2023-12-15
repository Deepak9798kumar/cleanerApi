const express = require("express");
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const tempDirectory = path.join('C:', 'Windows', 'Temp');

// Define a route that triggers the file deletion
router.get('/delete-files', async (req, res) => {
    try {
        // Read the contents of the temp directory
        const files = await fs.readdir(tempDirectory);

        // Delete each file
        for (const file of files) {
            const filePath = path.join(tempDirectory, file);
            try {
                await fs.unlink(filePath);
                console.log(`File ${filePath} deleted successfully`);
            } catch (unlinkError) {
                console.error(`Error deleting file ${filePath}:`, unlinkError.message);
            }
        }

        // Send a response once all deletions are attempted
        res.send('Deletion attempted for all files');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
});

module.exports = router;
