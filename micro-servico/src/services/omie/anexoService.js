const { compactFile } = require("../../utils/fileHandler");
const apiOmie = require("../../config/apiOmie");

const incluir = async (appKey, appSecret, tabela, id, nomeArquivo, tipoArquivo, arquivo) => {
  try {
    const arquivoCompactado = await compactFile(arquivo, nomeArquivo);

    const param = {
      cCodIntAnexo: "",
      cTabela: tabela,
      nId: id,
      cNomeArquivo: nomeArquivo,
      cTipoArquivo: tipoArquivo,
      cArquivo: arquivoCompactado.base64File,
      cMd5: arquivoCompactado.md5,
    };

    const body = {
      call: "IncluirAnexo",
      app_key: appKey,
      app_secret: appSecret,
      param: [param],
    };

    const response = await apiOmie.post("geral/anexo/", body);
    return response.data;
  } catch (error) {
    console.log("anexoService.incluir: ", error); 
    throw "Erro ao incluir anexo: " + error;
  }
};

// const listarAnexo = async (omieAuth, tabela, id) => {
//   try {
//     const param = {
//       nPagina: 1,
//       nRegPorPagina: 50,
//       nId: id,
//       cTabela: tabela,
//     };

//     const body = {
//       call: "ListarAnexo",
//       app_key: omieAuth.appKey,
//       app_secret: omieAuth.appSecret,
//       param: [param],
//     };

//     const response = await apiOmie.post("geral/anexo/", body);
//     return response.data;
//   } catch (error) {
//     throw "Erro ao listar anexos: " + error;
//   }
// };

// const obterAnexo = async (omieAuth, cTaebla, nId, nIdAnexo) => {
//   try {
//     const param = {
//       cTabela: cTaebla,
//       nId: nId,
//       nIdAnexo: nIdAnexo,
//     };

//     const body = {
//       call: "ObterAnexo",
//       app_key: omieAuth.appKey,
//       app_secret: omieAuth.appSecret,
//       param: [param],
//     };

//     const response = await apiOmie.post("geral/anexo/", body);
//     return response.data;
//   } catch (error) {
//     throw "Erro ao obter anexo: " + error;
//   }
// };

// const listarAnexoBuffer = async (omieAuth, idOrdemServico) => {
//   try {
//     const anexos = await anexoService.listarAnexo(omieAuth, "ordem-servico", idOrdemServico);
//     if (!anexos || !anexos.listaAnexos) return [];

//     const listaAnexos = anexos.listaAnexos;

//     const listaAnexosBuffer = await Promise.all(
//       listaAnexos.map(async (anexo) => {
//         const { cNomeArquivo, cLinkDownload } = await anexoService.obterAnexo(
//           omieAuth,
//           anexo.cTabela,
//           anexo.nId,
//           anexo.nIdAnexo
//         );

//         const resposta = await fetch(cLinkDownload);
//         const fileBuffer = await resposta.buffer();

//         return {
//           filename: cNomeArquivo,
//           fileBuffer: fileBuffer,
//         };
//       })
//     );

//     return listaAnexosBuffer;
//   } catch (error) {
//     throw "Erro ao listar anexos em buffer: " + error;
//   }
// };

const anexoService = { incluir };
module.exports = anexoService;
