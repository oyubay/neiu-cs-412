const http = require('http')
const fs = require ('fs')
const path = require ('path')

let app = http.createServer((request, response)=>{
    console.log('Request starting...', request.url)

    let filePath = '.'+ request.url
    if (filePath === './')
        filePath = './public/views/index.html'

    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            response.writeHead(404)
            response.end()
        } else
            console.log("File exists.")
    })

    fs.readFile(filePath, function (error, content){

        if (error){
            response.writeHead(500)
            response.end()
        }else{
            if (path.extname(filePath)===".js"){
                response.setHeader('Content-type', 'text/javascript')
            }
            if (path.extname(filePath)===".css"){
                response.setHeader('Content-type', 'text/css')
            }
            if (path.extname(filePath)===".html"){
                response.setHeader('Content-type', 'text/html')
            }
            response.writeHead(200)
            response.end(content, 'utf-8')
        }
    })
})
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')