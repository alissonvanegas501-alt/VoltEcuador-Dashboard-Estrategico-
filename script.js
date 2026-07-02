// Cambiar entre pestañas
function mostrar(id) {

    let paginas = document.querySelectorAll(".pagina");

    paginas.forEach(pagina => {
        pagina.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

// Mostrar Inicio al cargar
window.onload = function(){

    mostrar("inicio");

    const ctx = document.getElementById('grafico');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Ventas',
                'Clientes',
                'ROI',
                'Estaciones',
                'Satisfacción',
                'POA'
            ],
            datasets: [{
                label: 'Cumplimiento (%)',
                data: [20, 500, 15, 5, 90, 100]
            }]
        },
        options: {
            responsive:true,
            plugins:{
                legend:{
                    display:false
                }
            },
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }
    });

}