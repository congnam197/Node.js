var http = require("http");
var fs = require("fs");
const port =8080;
//tạo server từ http
var server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);// trả dữ liệu lên trang web
    res.end();
  });

  //ghi " học NodeJS" vào file note.txt
  fs.appendFile("note.txt", "học NodeJs", function (err) {
    if (err) throw err;
    console.log("updated!");
  });
});
server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)});
