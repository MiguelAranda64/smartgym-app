import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const RealTimeChart = () => {
  const [chartData, setChartData] = useState({ timeStamp: [], pasos: [], max_bpm: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:8000/0321101263/valores');
        const data = response.data.data;
        const timeStamp = data.map(item => item.date);
        const pasos = data.map(item => item.pasos);
        const max_bpm = data.map(item => item.max_bpm);

        setChartData({ timeStamp, pasos, max_bpm });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const webViewHTML = `
    <html>
    <head>
        <title>Highcharts Example</title>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
    <div class="container">
    <!-- Cuadro de pasos totales -->
    <div class="card ${styles.card}">
      <div class="card-body">
        <div class="${styles.cardContent}">
          <div class="${styles.cardTitle}">
            Pasos Totales (Último Día)
          </div>
          <div class="${styles.cardValue}">
            ${chartData.pasos.length > 0 ? chartData.pasos[0] : 'N/A'}
          </div>
        </div>
        <div class="${styles.cardIcon}">
          <i class="fas fa-walking"></i>
        </div>
      </div>
    </div>

      <div style="display: flex; flex-direction: column; align-items: center;">
        <div id="container-line" style="width: 100%;"></div>
        <div style="margin-top: 20px;">
            <button onclick="showMessage()">Mostrar Mensaje</button>
        </div>
        <div id="container-pie" style="width: 100%;"></div>
        <div id="container-bpm" style="width: 100%;"></div>
      </div>
      <script>
          Highcharts.setOptions({
              chart: {
                  style: {
                      fontFamily: 'Arial, sans-serif'
                  }
              }
          });

          // Configuración de la gráfica de líneas
          Highcharts.chart('container-line', {
              chart: {
                  type: 'spline'
              },
              title: {
                  text: 'Historial de pasos al día'
              },
              subtitle: {
                  text: 'Datos actualizados al día'
              },
              xAxis: {
                  type: 'datetime',
                  title: {
                      text: 'FECHA'
                  },
                  labels: {
                      rotation: -45,
                      format: '{value:%Y-%m-%d %H:%M}'
                  },
                  categories: ${JSON.stringify(chartData.timeStamp)}
              },
              yAxis: {
                  title: {
                      text: 'Pasos'
                  }
              },
              plotOptions: {
                  spline: {
                      marker: {
                          enabled: true,
                          radius: 4,
                          symbol: 'circle'
                      }
                  }
              },
              colors: ['#FF5733'],
              series: [{
                  name: 'Pasos',
                  data: ${JSON.stringify(chartData.pasos)},
                  enablePolling: true
              }],
              legend: {
                  align: 'right',
                  verticalAlign: 'top',
                  layout: 'vertical'
              }
          });

          // Configuración de la gráfica de pastel
          Highcharts.chart('container-pie', {
              title: {
                  text: 'Pasos Actuales'
              },
              series: [{
                  type: 'pie',
                  name: 'Pasos',
                  data: ${JSON.stringify(chartData.pasos)}
              }]
          });

          // Configuración de la gráfica de barras para ritmo cardíaco
          Highcharts.chart('container-bpm', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Ritmo Cardíaco Máximo'
              },
              xAxis: {
                  categories: ${JSON.stringify(chartData.timeStamp)},
                  title: {
                      text: 'FECHA'
                  }
              },
              yAxis: {
                  title: {
                      text: 'BPM'
                  }
              },
              series: [{
                  name: 'Ritmo Cardíaco Máximo',
                  data: ${JSON.stringify(chartData.max_bpm)}
              }]
          });

          // Función para mostrar el mensaje
          function showMessage() {
              alert('Caminar es una actividad beneficiosa para la salud.');
          }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ html: webViewHTML }} />
    </View>
  );
};

export default RealTimeChart;
