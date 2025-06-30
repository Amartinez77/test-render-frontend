const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Verify dist directory exists
const distPath = path.join(__dirname, 'dist/test-render-frontend/browser');
if (!fs.existsSync(distPath)) {
  console.error('Error: Build directory does not exist:', distPath);
  console.log('Current directory:', __dirname);
  console.log('Directory contents:', fs.readdirSync(__dirname));
  process.exit(1);
}

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/test-render-frontend/browser')));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/test-render-frontend/browser/index.html'));
});

// Start the app by listening on the default Render port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
