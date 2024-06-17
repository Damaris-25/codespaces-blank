Highcharts.chart('primer_grafico', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Título del primer gráfico'
    },
    // Resto de configuraciones del gráfico
    series: [{
        name: 'Serie 1',
        data: [5, 10, 15, 20] // Datos de ejemplo
    }]
});

