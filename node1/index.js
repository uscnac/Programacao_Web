const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { createFileName, createBackLink } = require("./util");
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

      // Exibe os nomes dos arquivos sem os links
      const fileNames = files.map(createFileName).join("<br>");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<pre>${fileNames}</pre>`);
    });
  } else {
    const filePath = path.join(directory, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.writeHead(404);
        return res.end("Arquivo não encontrado.");
      }

      if (stats.isDirectory()) {
        // Se for um diretório, mostra os arquivos dentro dele
        fs.readdir(filePath, (err, files) => {
          if (err) {
            res.writeHead(500);
            return res.end("Erro ao ler diretório.");
          }
          const fileNames = files.map(createFileName).join("<br>");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<pre>${fileNames}</pre>`);
        });
      } else {
        // Se for um arquivo, não permita que seja exibido
        res.writeHead(403);
        res.end("Acesso ao conteúdo do arquivo proibido.");
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

