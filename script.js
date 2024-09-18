// Simulação de transações
let transacoes = [
    { data: '14/09/2024', codigo: '774411', descricao: 'Pedido 774411', valor: '+R$ 120,00' },
    { data: '15/09/2024', codigo: '334455', descricao: 'Compra Fornecedor 1', valor: '-R$ 150,00' },
    { data: '16/09/2024', codigo: '223344', descricao: 'Conta Água', valor: '-R$ 400,00' },
    { data: '01/09/2024', codigo: '123456', descricao: 'Compra Supermercado', valor: '-R$ 150,00' },
    { data: '02/09/2024', codigo: '654321', descricao: 'Pedido 654321', valor: '+R$ 50,00' },
    { data: '05/09/2024', codigo: '112233', descricao: 'Salário Funcionário 1', valor: '-R$ 1300,00' },
    { data: '06/09/2024', codigo: '998877', descricao: 'Pagamento Aluguel', valor: '-R$ 800,00' },
    { data: '28/08/2024', codigo: '445566', descricao: 'Compra Fornecedor 2', valor: '-R$ 200,00' },
    { data: '29/07/2024', codigo: '556677', descricao: 'Pedido 556677', valor: '+R$ 30,00' },
    { data: '25/07/2024', codigo: '667788', descricao: 'Pedido 667788', valor: '+R$ 100,00' }
];

// Função para converter a data
function converterData(data) {
    const [dia, mes, ano] = data.split('/');
    return new Date(`${ano}-${mes}-${dia}`);
}

// Função para formatar a data
function formatarData(data) {
    const partes = data.split('/');
    return `${partes[0]}/${partes[1]}/${partes[2]}`;
}

// Função para exibir as transações na tabela
function exibirTransacoes(transacoes) {
    // Ordena as transações pela data
    transacoes.sort((a, b) => converterData(b.data) - converterData(a.data));

    const tabelaTransacoes = document.getElementById('tabela-transacoes');
    tabelaTransacoes.innerHTML = '';
    transacoes.forEach(transacao => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatarData(transacao.data)}</td>
            <td>${transacao.codigo}</td>
            <td>${transacao.descricao}</td>
            <td class="valor ${transacao.valor.startsWith('-') ? 'saida' : 'entrada'}">${transacao.valor}</td>
        `;
        tabelaTransacoes.appendChild(tr);
    });
}

// Função para filtrar as transações por dias
function filtrarDias(dias) {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() - dias);
    const transacoesFiltradas = transacoes.filter(transacao => {
        const partes = transacao.data.split('/');
        const dataTransacao = new Date(partes[2], partes[1] - 1, partes[0]);
        return dataTransacao >= dataLimite && dataTransacao <= hoje;
    });
    exibirTransacoes(transacoesFiltradas);

    // Atualiza a classe dos botões de filtro
    document.getElementById('filtro-7d').classList.remove('ativo');
    document.getElementById('filtro-30d').classList.remove('ativo');
    document.getElementById('filtro-60d').classList.remove('ativo');
    document.getElementById(`filtro-${dias}d`).classList.add('ativo');
}

// Função para buscar transações
function buscarTransacao() {
    const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
    const transacoesFiltradas = transacoes.filter(transacao => 
        transacao.codigo.toLowerCase().includes(pesquisa) || 
        transacao.data.toLowerCase().includes(pesquisa)
    );
    exibirTransacoes(transacoesFiltradas);
}

// Atualiza a data do dia no header
function atualizarData() {
    const hoje = new Date();
    const dataHoje = hoje.toLocaleDateString('pt-BR');
    document.getElementById('data-hoje').textContent = dataHoje;
}

// Função para exibir ou ocultar o saldo
function exibirOcultarSaldo() {
    const saldoElement = document.getElementById('saldo-atual');
    const toggleButton = document.getElementById('toggle-saldo');

    if (saldoElement.style.display === 'none') {
        saldoElement.style.display = 'block'; // Exibe o saldo
        toggleButton.textContent = 'Ocultar Saldo';
    } else {
        saldoElement.style.display = 'none';  // Oculta o saldo
        toggleButton.textContent = 'Exibir Saldo';
    }
}


// Inicializa a página
window.onload = function() {
    exibirTransacoes(transacoes);
    atualizarData();
    
    
    // Pressionar Enter para busca
    document.getElementById('pesquisa').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarTransacao();
        }
    });
};
