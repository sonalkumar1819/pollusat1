document.addEventListener('DOMContentLoaded', function () {
    const altitudeCtx = document.getElementById('altitudePlot').getContext('2d');
    const temperatureCtx = document.getElementById('temperaturePlot').getContext('2d');
    const accelerationCtx = document.getElementById('accelerationPlot').getContext('2d');
    const gyroCtx = document.getElementById('gyroPlot').getContext('2d');
    const pressureCtx = document.getElementById('pressurePlot').getContext('2d');
    const co2Ctx = document.getElementById('co2Plot').getContext('2d');
    const no2Ctx = document.getElementById('no2Plot').getContext('2d');
    const so2Ctx = document.getElementById('so2Plot').getContext('2d');
    const o3Ctx = document.getElementById('o3Plot').getContext('2d');
    const ch4Ctx = document.getElementById('ch4Plot').getContext('2d');
    const nh3Ctx = document.getElementById('nh3Plot').getContext('2d');

    function updatePlots() {                  
        const jsonPath = "/pollution_data.json";
    
        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                console.log("Data:", data); // Log fetched data to check if it's correct
    
                const emptyLabels = Array.from({ length: data.altitude.length }, () => ''); // Array of empty strings for labels
                const altitudeData = data.altitude;
                const temperatureData = data.temperature;
                const accelerationData = data.acceleration;
                const gyroData = data.gyro;
                const pressureData = data.pressure;
                const  co2Data=data.co2;
                const no2Data=data.no2;
                const so2Data=data.so2;
                const o3Data=data.o3;
                const ch4Data=data.ch4;
                const nh3Data=data.nh3;
    
                const options = {
                    scales: {
                        x: {
                            display: false,
                            // ticks: {
                            //     font: {
                            //         weight: 'bold' // Set x-axis font weight to bold
                            //     }
                            // }
                        },
                        y: {
                            beginAtZero: true,
                            // ticks: {
                            //     font: {
                            //         weight: 'bold' // Set y-axis font weight to bold
                            //     }
                            // }
                        }
                    }
                };
                
                
    
                // Destroy existing chart instances
                if (window.altitudeChart) {
                    window.altitudeChart.destroy();
                }
                if (window.temperatureChart) {
                    window.temperatureChart.destroy();
                }
                if (window.accelerationChart) {
                    window.accelerationChart.destroy();
                }
                if (window.gyroChart) {
                    window.gyroChart.destroy();
                }
                if (window.pressureChart) {
                    window.pressureChart.destroy();
                }
    
                // Altitude Plot
                window.altitudeChart = new Chart(altitudeCtx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'Altitude',
                            data: altitudeData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
    
                // Temperature Plot
                window.temperatureChart = new Chart(temperatureCtx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'Temperature',
                            data: temperatureData,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
    
                // Acceleration Plot
                window.accelerationChart = new Chart(accelerationCtx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'aX',
                            data: accelerationData.ax,
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }, {
                            label: 'aY',
                            data: accelerationData.ay,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }, {
                            label: 'aZ',
                            data: accelerationData.az,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
    
                // Gyro Plot
                window.gyroChart = new Chart(gyroCtx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'gX',
                            data: gyroData.gx,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }, {
                            label: 'gY',
                            data: gyroData.gy,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'gZ',
                            data: gyroData.gz,
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
    
                // Pressure Plot
                window.pressureChart = new Chart(pressureCtx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'Pressure',
                            data: pressureData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
           
                window.co2Chart = new Chart(co2Ctx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'Co2',
                            data: co2Data,
                            borderColor: 'rgb(83, 75, 192)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
                window.no2Chart = new Chart(no2Ctx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'No2',
                            data: no2Data,
                            borderColor: 'rgb(213, 219, 219)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
                window.so2Ctx  = new Chart(so2Ctx , {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'So2',
                            data:so2Data,
                            borderColor: 'rgb(192, 190, 75)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
                window.o3Ctx = new Chart(o3Ctx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'O^3',
                            data: o3Data,
                            borderColor: 'rgb(155, 192, 75)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
                window.ch4Ctx = new Chart(ch4Ctx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'ch4',
                            data: ch4Data,
                            borderColor: 'rgb(93, 192, 75)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
                window.nh3Ctx = new Chart(nh3Ctx, {
                    type: 'line',
                    data: {
                        labels: emptyLabels,
                        datasets: [{
                            label: 'NH3',
                            data: nh3Data,
                            borderColor: 'rgb(192, 75, 83)',
                            borderWidth: 1
                        }]
                    },
                    options: options
                });
      
    });
    

            
    
            }
    updatePlots(); // Initial update
    setInterval(updatePlots, 5000); // Update every 5 seconds
});
