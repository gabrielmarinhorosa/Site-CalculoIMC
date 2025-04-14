// Função para calcular gordura corporal
function calcularGordura() {
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseFloat(document.getElementById("idade").value);
    const genero = document.getElementById("genero").value;

    if (!altura || !peso || !idade) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const imc = peso / ((altura / 100) ** 2);
    
    let gordura;
    if (genero === "masculino") {
        gordura = (1.20 * imc) + (0.23 * idade) - (10.8 * 1) - 5.4;
    } else {
        gordura = (1.20 * imc) + (0.23 * idade) - (10.8 * 0) - 5.4;
    }

    // Exibir resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h3>Seus Resultados:</h3>
        <p>Percentual de Gordura: ${gordura.toFixed(1)}%</p>
        <p>IMC: ${imc.toFixed(1)}</p>
    `;

    // Mostrar opções de cardápio
    const cardapio = [
        {
            refeicao: "Café da manhã",
            opcoes: [
                { nome: "Omelete com claras", calorias: 150, carboidratos: 5, proteinas: 20 },
                { nome: "Pão integral com abacate", calorias: 200, carboidratos: 30, proteinas: 3 },
                { nome: "Frutas frescas", calorias: 50, carboidratos: 15, proteinas: 1 }
            ]
        },
        {
            refeicao: "Lanche da manhã",
            opcoes: [
                { nome: "Iogurte com frutas", calorias: 100, carboidratos: 20, proteinas: 10 },
                { nome: "Nozes", calorias: 150, carboidratos: 5, proteinas: 5 },
                { nome: "Smoothie de frutas", calorias: 120, carboidratos: 30, proteinas: 2 }
            ]
        },
        {
            refeicao: "Almoço",
            opcoes: [
                { nome: "Frango grelhado com salada", calorias: 250, carboidratos: 10, proteinas: 35 },
                { nome: "Arroz integral com feijão e carne", calorias: 400, carboidratos: 60, proteinas: 25 },
                { nome: "Sopa de legumes", calorias: 150, carboidratos: 30, proteinas: 5 }
            ]
        },
        {
            refeicao: "Lanche da tarde",
            opcoes: [
                { nome: "Queijo cottage com frutas", calorias: 150, carboidratos: 5, proteinas: 20 },
                { nome: "Barras de cereais", calorias: 120, carboidratos: 25, proteinas: 3 },
                { nome: "Chá verde com limão", calorias: 0, carboidratos: 0, proteinas: 0 }
            ]
        },
        {
            refeicao: "Jantar",
            opcoes: [
                { nome: "Peixe assado com legumes", calorias: 250, carboidratos: 10, proteinas: 30 },
                { nome: "Macarrão integral com molho de tomate", calorias: 400, carboidratos: 60, proteinas: 15 },
                { nome: "Omelete com vegetais", calorias: 200, carboidratos: 10, proteinas: 20 }
            ]
        }
    ];

    const cardapioDiv = document.getElementById("cardapio");
    cardapioDiv.innerHTML = `
        <h3>Cardápio Completo:</h3>
        ${cardapio.map(refeicao => `
            <h4>${refeicao.refeicao}</h4>
            <ul>
                ${refeicao.opcoes.map(opcao => `
                    <li>
                        <strong>${opcao.nome}</strong> - ${opcao.calorias} kcal
                        <ul>
                            <li>Carboidratos: ${opcao.carboidratos}g</li>
                            <li>Proteínas: ${opcao.proteinas}g</li>
                        </ul>
                    </li>
                `).join('')}
            </ul>
        `).join('')}
    `;
}

// Função para calcular TMB
function calcularTMB() {
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseFloat(document.getElementById("idade").value);
    const genero = document.getElementById("genero").value;

    if (!altura || !peso || !idade) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let tmb;
    if (genero === "masculino") {
        tmb = 66.5 + (13.75 * peso) + (5.003 * altura / 100) - (6.75 * idade);
    } else {
        tmb = 655.1 + (9.563 * peso) + (1.850 * altura / 100) - (4.676 * idade);
    }

    // Exibir resultado
    const tmbResultadoDiv = document.getElementById("tmb-resultado");
    tmbResultadoDiv.innerHTML = `
        <h3>Sua Taxa Metabólica Basal (TMB):</h3>
        <p>${tmb.toFixed(1)} kcal</p>
    `;
}

// Função para gerar PDF
function gerarPDF() {
    const cardapio = [
        {
            refeicao: "Café da manhã",
            opcoes: [
                { nome: "Omelete com claras", calorias: 150, carboidratos: 5, proteinas: 20 },
                { nome: "Pão integral com abacate", calorias: 200, carboidratos: 30, proteinas: 3 },
                { nome: "Frutas frescas", calorias: 50, carboidratos: 15, proteinas: 1 }
            ]
        },
        {
            refeicao: "Lanche da manhã",
            opcoes: [
                { nome: "Iogurte com frutas", calorias: 100, carboidratos: 20, proteinas: 10 },
                { nome: "Nozes", calorias: 150, carboidratos: 5, proteinas: 5 },
                { nome: "Smoothie de frutas", calorias: 120, carboidratos: 30, proteinas: 2 }
            ]
        },
        {
            refeicao: "Almoço",
            opcoes: [
                { nome: "Frango grelhado com salada", calorias: 250, carboidratos: 10, proteinas: 35 },
                { nome: "Arroz integral com feijão e carne", calorias: 400, carboidratos: 60, proteinas: 25 },
                { nome: "Sopa de legumes", calorias: 150, carboidratos: 30, proteinas: 5 }
            ]
        },
        {
            refeicao: "Lanche da tarde",
            opcoes: [
                { nome: "Queijo cottage com frutas", calorias: 150, carboidratos: 5, proteinas: 20 },
                { nome: "Barras de cereais", calorias: 120, carboidratos: 25, proteinas: 3 },
                { nome: "Chá verde com limão", calorias: 0, carboidratos: 0, proteinas: 0 }
            ]
        },
        {
            refeicao: "Jantar",
            opcoes: [
                { nome: "Peixe assado com legumes", calorias: 250, carboidratos: 10, proteinas: 30 },
                { nome: "Macarrão integral com molho de tomate", calorias: 400, carboidratos: 60, proteinas: 15 },
                { nome: "Omelete com vegetais", calorias: 200, carboidratos: 10, proteinas: 20 }
            ]
        }
    ];

    const conteudo = `
        <h1>Cardápio Completo</h1>
        ${cardapio.map(refeicao => `
            <h2>${refeicao.refeicao}</h2>
            <ul>
                ${refeicao.opcoes.map(opcao => `
                    <li>
                        <strong>${opcao.nome}</strong> - ${opcao.calorias} kcal
                        <ul>
                            <li>Carboidratos: ${opcao.carboidratos}g</li>
                            <li>Proteínas: ${opcao.proteinas}g</li>
                        </ul>
                    </li>
                `).join('')}
            </ul>
        `).join('')}
    `;

    const janela = window.open('', '_blank');
    janela.document.write(conteudo);
    janela.print();
    janela.close();
}

// Dados globais para calorias consumidas e peso
let dadosCalorias = [
    { semana: 'Semana 1', calorias: 2500, peso: 70 },
    { semana: 'Semana 2', calorias: 2200, peso: 68.5 },
    { semana: 'Semana 3', calorias: 2000, peso: 67 },
    { semana: 'Semana 4', calorias: 2300, peso: 66.5 }
];

// Função para calcular gordura corporal
function calcularGordura() {
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseFloat(document.getElementById("idade").value);
    const genero = document.getElementById("genero").value;

    if (!altura || !peso || !idade) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const imc = peso / ((altura / 100) ** 2);
    
    let gordura;
    if (genero === "masculino") {
        gordura = (1.20 * imc) + (0.23 * idade) - (10.8 * 1) - 5.4;
    } else {
        gordura = (1.20 * imc) + (0.23 * idade) - (10.8 * 0) - 5.4;
    }

    // Exibir resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h3>Seus Resultados:</h3>
        <p>Percentual de Gordura: ${gordura.toFixed(1)}%</p>
        <p>IMC: ${imc.toFixed(1)}</p>
    `;

    // Atualizar dados do gráfico com peso inicial

    atualizarDadosGrafico(peso, 0); // Calorias iniciais são zero
}

// Função para calcular TMB
function calcularTMB() {
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const idade = parseFloat(document.getElementById("idade").value);
    const genero = document.getElementById("genero").value;

    if (!altura || !peso || !idade) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let tmb;
    if (genero === "masculino") {
        tmb = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.75 * idade);
    } else {
        tmb = 655.1 + (9.563 * peso) + (1.850 * altura) - (4.676 * idade);
    }

    // Exibir resultado
    const tmbResultadoDiv = document.getElementById("tmb-resultado");
    tmbResultadoDiv.innerHTML = `
        <h3>Sua Taxa Metabólica Basal (TMB):</h3>
        <p>${tmb.toFixed(1)} kcal</p>
    `;
}

// Função para atualizar os dados do gráfico
function atualizarDadosGrafico(peso, caloriasConsumidas) {
    dadosCalorias.push({ calorias: caloriasConsumidas, peso });
    
    // Re-renderizar o gráfico com novos dados
    renderizarGrafico();
}

// Função para renderizar o gráfico
function renderizarGrafico() {
    const ctx = document.getElementById('caloriasPesoChart').getContext('2d');
    
    // Limpar gráfico existente antes de criar um novo
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dadosCalorias.map((_, index) => `semana ${index + 1}`), // semanas no eixo X
            datasets: [
                {
                    label: 'Calorias Consumidas',
                    data: dadosCalorias.map(dado => dado.calorias),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'yCalorias'
                },
                {
                    label: 'Peso (kg)',
                    data: dadosCalorias.map(dado => dado.peso),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'yPeso'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                yCalorias: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Calorias Consumidas'
                    }
                },
                yPeso: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Peso (kg)'
                    },
                    grid: {
                        drawOnChartArea: false // Remove as linhas de grade duplicadas
                    }
                }
            }
        }
    });


    // Exemplo de atualização com base no cardápio selecionado
function selecionarRefeicao(caloriasRefeicao) {
    const pesoAtual = dadosCalorias.length > 0 ? dadosCalorias[dadosCalorias.length - 1].peso : null;
    
    if (!pesoAtual) return alert('Por favor, insira seu peso inicial primeiro!');
    
    atualizarDadosGrafico(pesoAtual - 0.2, caloriasRefeicao); // Simula perda de peso ao consumir menos calorias

    atualizarDadosGrafico(pesoAtual + 0.2, caloriasRefeicao); // Simula ganho de peso ao consumir mais calorias
}

}



;
