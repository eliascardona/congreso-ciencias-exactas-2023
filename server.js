const http = require('http')
const fs = require('fs')
const path = require('path')
const httpStatus = require('http-status-codes')
const sendError = require('./errors.js')

function customReadFile(file_path, res) {
  console.log(`response file location: ${file_path}`)
  console.log("========================================================")

  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        console.log(error);
        sendError(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendError(res);
  }
}

server = http.createServer((request, response) => {
	let url = request.url
	console.log(`request url: ${url}`)

	if(url === "/") {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/html"
		})
		customReadFile(path.join(__dirname, 'views', 'index.html'), response)
	}

	else if(url.indexOf(".js") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/javascript"
		})
		customReadFile(path.join(__dirname, url), response)

	} else if(url.indexOf(".css") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/css"
		})
		customReadFile(path.join(__dirname, url), response)

	} else if(url.indexOf(".jpg") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "image/jpeg"
		})
		customReadFile(path.join(__dirname, url), response)
	} else {
		sendError(response)
	}
})

const port = 4242
server.listen(port)
console.log(`The server is listening on port: ${port}`)
