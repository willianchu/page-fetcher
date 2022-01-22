const fs = require('fs');
const request = require('request');
const argv = process.argv.slice(2);

// The Fetch function takes a URL and a callback function as arguments.
const fetcher = function(argv , callback) {
  console.log("argv[0]: ", argv[0]);
  request(argv[0], function(error, response, body) {
    if (!error && response.statusCode === 200 && body !== '[]') {
      const data = (body);
      callback(null, data);
    } else {
      callback(error, 'Error: Invalid URL'); // error, desc
    }
  });
};

// The callback function takes an error and a data argument.
fetcher(argv, (error, data) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    return fileWriter(argv, data);
  }
});


// The fileWriter function takes a path and a data argument and writes the data to a file.
const fileWriter = (content) => {
  fs.writeFile(argv[1], content, err => {
    if (err) {
      console.error(err);
      console.log('Error writing file');
      return false;
    }
    //file written successfully
    console.log('File successfully written');
    // console log the size of the file in bytes
    fs.stat(argv[1], (err, stats) => {
      if (err) {
        console.error(err);
        console.log('Error getting file size');
        return false;
      }
      console.log(`File size: ${stats.size} bytes`);
    });
    
    return true;
  });
};

