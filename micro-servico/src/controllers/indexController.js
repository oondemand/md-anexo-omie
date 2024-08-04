const anexoService = require("../services/omie/anexoService");

const test = async (req, res) => {
  res.send({ message: "md-anexo-omie funcionando..." });
};

const incluirAnexo = async (req, res) => {
  const { appKey, appSecret, tabela, id, nomeArquivo, tipoArquivo, arquivo } = req.body;

  const buffer = Buffer.from(arquivo.data);

  try {
    await anexoService.incluir(appKey, appSecret, tabela, id, nomeArquivo, tipoArquivo, buffer);
    res.send({ message: "Anexo incluído com sucesso!" });
  } catch (error) {
    res.status(400).send({ message: "Erro ao incluir anexo: " + error });
  }
};

const IndexController = { test, incluirAnexo };
module.exports = IndexController;
