
function gerarTabela() {
    const container = document.getElementById('multiplicacao');
    
    
    for (let i = 1; i <= 10; i++) {
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        
       
        const cabecalho = document.createElement('thead');
        const linhaCabecalho = document.createElement('tr');
        const th = document.createElement('th');
        th.colSpan = 2;
        th.textContent = `Produtos de ${i}`;
        linhaCabecalho.appendChild(th);
        cabecalho.appendChild(linhaCabecalho);
        tabela.appendChild(cabecalho);
        
        
        const corpoTabela = document.createElement('tbody');
        for (let j = 1; j <= 10; j++) {
            const linha = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = `${i} x ${j}`;
            const td2 = document.createElement('td');
            td2.classList.add('resultado');  
            td2.textContent = i * j;
            linha.appendChild(td1);
            linha.appendChild(td2);
            corpoTabela.appendChild(linha);
        }
        
        tabela.appendChild(corpoTabela);
        container.appendChild(tabela);
    }
}


gerarTabela();
