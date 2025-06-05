const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { createLink, createBackLink } = require("./util");
const PORT = process.env.PORT || 3333;
const directory = process.argv[2] || "./";

const server = http.createServer((req, res) => {
  const reqPath = decodeURIComponent(req.url);

  if (reqPath === "/") {
    fs.readdir(directory, (err, files) => {
      if (err) {
        res.writeHead(500);
        return res.end("Erro ao ler diretório.");
      }

      const links = files.map(createLink).join("");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(links);
    });
  } else {
    const filePath = path.join(directory, reqPath);

    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        res.writeHead(404);
        return res.end("Arquivo não encontrado.");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`${createBackLink()}<br><br><pre>${content}</pre>`);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
