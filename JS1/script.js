function generateMultiplicationTable() {
    const mainTable = document.createElement('table');
    mainTable.classList.add('main-table');

    const row1 = document.createElement('tr'); 
    const row2 = document.createElement('tr');  

    for (let i = 1; i <= 5; i++) {
        const tableContainer = document.createElement('td');

        const table = createMultiplicationTable(i);
        tableContainer.appendChild(table);

        row1.appendChild(tableContainer);
    }

    for (let i = 6; i <= 10; i++) {
        const tableContainer = document.createElement('td');

        const table = createMultiplicationTable(i);
        tableContainer.appendChild(table);

        row2.appendChild(tableContainer);
    }

    mainTable.appendChild(row1);
    mainTable.appendChild(row2);

    document.body.appendChild(mainTable);
}

function createMultiplicationTable(number) {
    const table = document.createElement('table');
    
    const headerRow = document.createElement('tr');
    
    const th = document.createElement('th');
    th.colSpan = 2;  
    th.textContent = `Produto de ${number}`;
    headerRow.appendChild(th);
    table.appendChild(headerRow);

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.textContent = `${number} x ${i}`;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = `${number * i}`;
        row.appendChild(cell2);

        table.appendChild(row);
    }

    return table;
}

generateMultiplicationTable();
