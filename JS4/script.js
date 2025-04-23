function calcular() {
    var raio = parseFloat(document.getElementById("raio").value);

    if (isNaN(raio) || raio <= 0) {
        alert("Por favor, insira um número válido para o raio.");
        return;
    }

    var area = Math.PI * Math.pow(raio, 2);
    var circunferencia = 2 * Math.PI * raio;

    document.getElementById("area").value = area.toFixed(2);
    document.getElementById("circunferencia").value = circunferencia.toFixed(2);
}
