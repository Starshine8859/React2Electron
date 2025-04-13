// server.js
const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const { app, BrowserWindow } = require('electron');
// Create Express app
const expressApp = express();
expressApp.use(cors());
expressApp.use(bodyParser.json());

// Serve static files from the "dist" folder
const distPath = path.join(__dirname, 'Frontend');
expressApp.use(express.static(distPath));

// Fallback to serve index.html for React routes
expressApp.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Express server
expressApp.listen(5000, () => {
  console.log('Backend API running on http://localhost:5000');
});

// Electron Main Process
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1800,
    height: 1200,
    webPreferences: {
      nodeIntegration: true, // Allow node.js inside Electron's renderer process
    },
  });

  // Load the React app from the "dist" folder
  win.loadURL('http://localhost:5000'); // React app is served from Express
}

let workers = [];

app.whenReady().then(() => {

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

});


app.on('window-all-closed', () => {
  // stopMongoDB();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
