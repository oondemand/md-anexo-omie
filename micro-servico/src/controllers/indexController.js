const anexoService = require("../services/omie/anexoService");

const test = (req, res) => {
  res.send({ message: `${process.env.SERVICE_NAME} funcionando...` });
};

const incluirAnexo = async (req, res) => {
  const { appKey, appSecret, tabela, id, nomeArquivo, tipoArquivo, arquivo } = req.body;

  if (!arquivo || !arquivo.data) {
    return res.status(400).send({ message: "Arquivo ou dados do arquivo não fornecidos." });
  }

  const buffer = Buffer.from(arquivo.data);

  try {
    await anexoService.incluir(appKey, appSecret, tabela, id, nomeArquivo, tipoArquivo, buffer);
    res.send({ message: "Anexo incluído com sucesso!" });
  } catch (error) {
    console.log("indexController.incluirAnexo: ", error);
    res.status(400).send({ message: "Erro ao incluir anexo: " + error.message });
  }
};

const IndexController = { test, incluirAnexo };
module.exports = IndexController;