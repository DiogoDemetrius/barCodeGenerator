const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const fs = require('fs');

function gerarCodigoBarras(produto) {
    const canvas = createCanvas(200, 100, 'svg');
    JsBarcode(canvas, produto.codigo, {
        format: "EAN13",
        displayValue: true,
    });
    const svgData = canvas.toBuffer();
    const nomeArquivo = `${produto.codigo}.svg`;
    fs.writeFileSync(nomeArquivo, svgData);
    console.log(`Arquivo SVG ${nomeArquivo} gerado com sucesso!`);
}

function processarProdutos(jsonInput) {
    const produtos = JSON.parse(jsonInput);
    produtos.forEach(produto => {
        gerarCodigoBarras(produto);
    });
}

function lerArquivoJSON(caminho) {
    return fs.readFileSync(caminho, 'utf8');
}

const caminhoArquivoJSON = 'produtos.json';
const jsonInput = lerArquivoJSON(caminhoArquivoJSON);
processarProdutos(jsonInput);
