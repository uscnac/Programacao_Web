function createLink(filename) {
  return `<a href="/${filename}">${filename}</a><br>\n`;
}

function createBackLink() {
  return `<a href="/">Voltar</a>`;
}

module.exports = {
  createLink,
  createBackLink
};
