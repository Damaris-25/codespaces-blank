
// Configuración para el segundo gráfico
Highcharts.chart('segundo_grafico', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Título del segundo gráfico'
    },
    // Resto de configuraciones del gráfico
    series: [{
        name: 'Serie 1',
        data: [10, 15, 20, 25] // Datos de ejemplo
    }]
});
