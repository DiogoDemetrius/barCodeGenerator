const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const fs = require('fs');

// Função para gerar o código de barras e salvar como SVG
function gerarCodigoBarras(produto) {
    // Cria um canvas com contexto SVG
    const canvas = createCanvas(200, 100, 'svg'); // Definindo o tipo de saída para 'svg'

    // Gera o código de barras diretamente no contexto SVG
    JsBarcode(canvas, produto.codigo, {
        format: "EAN13",
        displayValue: true,
    });

    // Extrai os dados SVG diretamente do canvas
    const svgData = canvas.toBuffer();

    // Define o nome do arquivo para salvar
    const nomeArquivo = `${produto.codigo}.svg`;

    // Salva o arquivo SVG na mesma pasta
    fs.writeFileSync(nomeArquivo, svgData);

    console.log(`Arquivo SVG ${nomeArquivo} gerado com sucesso!`);
}

// Função que processa o JSON e gera os códigos de barras
function processarProdutos(jsonInput) {
    const produtos = JSON.parse(jsonInput); // Faz o parse do JSON
    produtos.forEach(produto => {
        gerarCodigoBarras(produto); // Gera o código de barras para cada produto
    });
}

// Exemplo de JSON de entrada
const jsonInput = `
[
    {
        "nome": "Camarão Premium",
        "valor": 39.00,
        "codigo": "123456789012"
    },
    {
        "nome": "Camarão",
        "valor": 11.00,
        "codigo": "987654321098"
    }
]`;

// Chama a função para processar os produtos e gerar os arquivos SVG
processarProdutos(jsonInput);
