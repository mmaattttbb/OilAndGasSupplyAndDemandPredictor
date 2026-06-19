async function loadCharts() {
    try {
        const res  = await fetch('/api/production');
        const data = await res.json();
        const labels        = data.map(row => new Date(row["Date"]).toLocaleDateString('en-CA', { year: 'numeric', month: 'short' }));
        const albertaPrice  = data.map(row => row["Alberta Price $/MMCF"] ? parseFloat(row["Alberta Price $/MMCF"]).toFixed(2) : null);
        const canadaPrice   = data.map(row => row["Historical Price Canada $/MMCF"] ? parseFloat(row["Historical Price Canada $/MMCF"]).toFixed(2) : null);
        const citygatePrice = data.map(row => row["Citygate Price NY $/MMCF"] ? parseFloat(row["Citygate Price NY $/MMCF"]).toFixed(2) : null);
        const residentialNY = data.map(row => row["Residential Price NY $/MMCF"] ? parseFloat(row["Residential Price NY $/MMCF"]).toFixed(2) : null);
        const bcExports          = data.map(row => row["British Columbia-Exports"] ? parseFloat(row["British Columbia-Exports"]).toFixed(2) : null);
        const albertaExports     = data.map(row => row["Alberta-Exports"] ? parseFloat(row["Alberta-Exports"]).toFixed(2) : null);
        const chippawaExports    = data.map(row => row["Chippawa-export"] ? parseFloat(row["Chippawa-export"]).toFixed(2) : null);
        const iroquoisExports    = data.map(row => row["Iroquois-export"] ? parseFloat(row["Iroquois-export"]).toFixed(2) : null);
        const niagaraExports     = data.map(row => row["Niagara-export"] ? parseFloat(row["Niagara-export"]).toFixed(2) : null);
        const ontarioExports     = data.map(row => row["Ontario-Exports"] ? parseFloat(row["Ontario-Exports"]).toFixed(2) : null);
        const pennsylvaniaWith   = data.map(row => row["Pensylvania Withdrawals"] ? parseFloat(row["Pensylvania Withdrawals"]).toFixed(2) : null);
        const westVirginiaWith   = data.map(row => row["West-Virginia Withdrawals"] ? parseFloat(row["West-Virginia Withdrawals"]).toFixed(2) : null);
        const bcClosingInv       = data.map(row => row["British Columbia-Closing inventory"] ? parseFloat(row["British Columbia-Closing inventory"]).toFixed(2) : null);
        const easternTriangle    = data.map(row => row["Eastern Triangle - NOL Receipts"] ? parseFloat(row["Eastern Triangle - NOL Receipts"]).toFixed(2) : null);
        const chippawaImport     = data.map(row => row["Chippawa-import"] ? parseFloat(row["Chippawa-import"]).toFixed(2) : null);
        const iroquoisImport     = data.map(row => row["Iroquois-import"] ? parseFloat(row["Iroquois-import"]).toFixed(2) : null);
        const niagaraImport      = data.map(row => row["Niagara-import"] ? parseFloat(row["Niagara-import"]).toFixed(2) : null);
        const ns                 = data.map(row => row["NS"] ? parseFloat(row["NS"]).toFixed(2) : null);
        const nb                 = data.map(row => row["NB"] ? parseFloat(row["NB"]).toFixed(2) : null);
        const ontario            = data.map(row => row["Ontario"] ? parseFloat(row["Ontario"]).toFixed(2) : null);
        const sask               = data.map(row => row["Sask"] ? parseFloat(row["Sask"]).toFixed(2) : null);
        const alberta            = data.map(row => row["Alberta"] ? parseFloat(row["Alberta"]).toFixed(2) : null);
        const bc                 = data.map(row => row["BC"] ? parseFloat(row["BC"]).toFixed(2) : null);
        const territories        = data.map(row => row["Territories"] ? parseFloat(row["Territories"]).toFixed(2) : null);
        const canada             = data.map(row => row["Canada"] ? parseFloat(row["Canada"]).toFixed(2) : null);
        const importsPerDay      = data.map(row => row["ImportsPerDay"] ? parseFloat(row["ImportsPerDay"]).toFixed(2) : null);
        const ontarioResCons     = data.map(row => row["Ontario-Residential consumption"] ? parseFloat(row["Ontario-Residential consumption"]).toFixed(2) : null);
        const ontarioClosingInv  = data.map(row => row["Ontario-Closing inventory"] ? parseFloat(row["Ontario-Closing inventory"]).toFixed(2) : null);
        const albertaClosingInv  = data.map(row => row["Alberta-Closing inventory"] ? parseFloat(row["Alberta-Closing inventory"]).toFixed(2) : null);
        const importsFromUSA     = data.map(row => row["ImportsFromUSA"] ? parseFloat(row["ImportsFromUSA"]).toFixed(2) : null);
        const temperature        = data.map(row => row["temperature_2m_mean"] ? parseFloat(row["temperature_2m_mean"]).toFixed(2) : null);
        const precipitation      = data.map(row => row["precipitation_sum"] ? parseFloat(row["precipitation_sum"]).toFixed(2) : null);
        const allData = [
            albertaPrice, canadaPrice, citygatePrice, residentialNY,           
            bcExports, albertaExports, chippawaExports, iroquoisExports,        
            niagaraExports, ontarioExports, pennsylvaniaWith, westVirginiaWith, 
            bcClosingInv, easternTriangle, chippawaImport, iroquoisImport,      
            niagaraImport, ns, nb, ontario, sask, alberta, bc, territories,    
            canada, importsPerDay, ontarioResCons, ontarioClosingInv,           
            albertaClosingInv, importsFromUSA,                                  
            temperature, precipitation                                           
        ];
        const datasetMeta = [
            { label: 'Alberta Price $/MMCF',               color: '#4CAF50' },
            { label: 'Historical Price Canada $/MMCF',     color: '#2196F3' },
            { label: 'Citygate Price NY $/MMCF',           color: '#FF9800' },
            { label: 'Residential Price NY $/MMCF',        color: '#FF5722' },
            { label: 'BC Exports',                         color: '#9C27B0' },
            { label: 'Alberta Exports',                    color: '#00BCD4' },
            { label: 'Chippawa Exports',                   color: '#8BC34A' },
            { label: 'Iroquois Exports',                   color: '#E91E63' },
            { label: 'Niagara Exports',                    color: '#FFC107' },
            { label: 'Ontario Exports',                    color: '#607D8B' },
            { label: 'Pennsylvania Withdrawals',           color: '#F44336' },
            { label: 'West-Virginia Withdrawals',          color: '#3F51B5' },
            { label: 'BC Closing Inventory',               color: '#009688' },
            { label: 'Eastern Triangle NOL Receipts',      color: '#FF5722' },
            { label: 'Chippawa Import',                    color: '#795548' },
            { label: 'Iroquois Import',                    color: '#9E9E9E' },
            { label: 'Niagara Import',                     color: '#CDDC39' },
            { label: 'NS',                                 color: '#00E5FF' },
            { label: 'NB',                                 color: '#FF4081' },
            { label: 'Ontario',                            color: '#69F0AE' },
            { label: 'Sask',                               color: '#FFD740' },
            { label: 'Alberta',                            color: '#40C4FF' },
            { label: 'BC',                                 color: '#E040FB' },
            { label: 'Territories',                        color: '#FF6D00' },
            { label: 'Canada',                             color: '#00B0FF' },
            { label: 'Imports Per Day',                    color: '#76FF03' },
            { label: 'Ontario Residential Consumption',    color: '#FF1744' },
            { label: 'Ontario Closing Inventory',          color: '#651FFF' },
            { label: 'Alberta Closing Inventory',          color: '#F50057' },
            { label: 'Imports From USA',                   color: '#FFAB40' },
            { label: 'Temperature 2m Mean',                color: '#FFC107' },
            { label: 'Precipitation Sum',                  color: '#03A9F4' },
        ];
        window.productionChart = new Chart(document.getElementById('productionChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Alberta Price $/MMCF',                          data: albertaPrice,         borderColor: '#4CAF50', backgroundColor: 'rgba(76,175,80,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Ontario Price $/MMCF',                          data: canadaPrice,          borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Citygate Price NY $/MMCF',                      data: citygatePrice,        borderColor: '#FF9800', backgroundColor: 'rgba(255,152,0,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Residential Price NY $/MMCF',                   data: residentialNY,        borderColor: '#FF5722', backgroundColor: 'rgba(255,87,34,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'BC Exports',                                    data: bcExports,            borderColor: '#9C27B0', backgroundColor: 'rgba(156,39,176,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Alberta Exports',                               data: albertaExports,       borderColor: '#00BCD4', backgroundColor: 'rgba(0,188,212,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Chippawa Exports',                              data: chippawaExports,      borderColor: '#8BC34A', backgroundColor: 'rgba(139,195,74,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Iroquois Exports',                              data: iroquoisExports,      borderColor: '#E91E63', backgroundColor: 'rgba(233,30,99,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Niagara Exports',                               data: niagaraExports,       borderColor: '#FFC107', backgroundColor: 'rgba(255,193,7,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Ontario Exports',                               data: ontarioExports,       borderColor: '#607D8B', backgroundColor: 'rgba(96,125,139,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Pennsylvania Withdrawals',                      data: pennsylvaniaWith,     borderColor: '#F44336', backgroundColor: 'rgba(244,67,54,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'West-Virginia Withdrawals',                     data: westVirginiaWith,     borderColor: '#3F51B5', backgroundColor: 'rgba(63,81,181,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'BC Closing Inventory',                          data: bcClosingInv,         borderColor: '#009688', backgroundColor: 'rgba(0,150,136,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Eastern Triangle NOL Receipts',                 data: easternTriangle,      borderColor: '#FF5722', backgroundColor: 'rgba(255,87,34,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Chippawa Import',                               data: chippawaImport,       borderColor: '#795548', backgroundColor: 'rgba(121,85,72,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Iroquois Import',                               data: iroquoisImport,       borderColor: '#9E9E9E', backgroundColor: 'rgba(158,158,158,0.1)',  tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Niagara Import',                                data: niagaraImport,        borderColor: '#CDDC39', backgroundColor: 'rgba(205,220,57,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'NS',                                            data: ns,                   borderColor: '#00E5FF', backgroundColor: 'rgba(0,229,255,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'NB',                                            data: nb,                   borderColor: '#FF4081', backgroundColor: 'rgba(255,64,129,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Ontario',                                       data: ontario,              borderColor: '#69F0AE', backgroundColor: 'rgba(105,240,174,0.1)',  tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Sask',                                          data: sask,                 borderColor: '#FFD740', backgroundColor: 'rgba(255,215,64,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Alberta',                                       data: alberta,              borderColor: '#40C4FF', backgroundColor: 'rgba(64,196,255,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'BC',                                            data: bc,                   borderColor: '#E040FB', backgroundColor: 'rgba(224,64,251,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Territories',                                   data: territories,          borderColor: '#FF6D00', backgroundColor: 'rgba(255,109,0,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Canada',                                        data: canada,               borderColor: '#00B0FF', backgroundColor: 'rgba(0,176,255,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Imports Per Day',                               data: importsPerDay,        borderColor: '#76FF03', backgroundColor: 'rgba(118,255,3,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Ontario Residential Consumption',               data: ontarioResCons,       borderColor: '#FF1744', backgroundColor: 'rgba(255,23,68,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Ontario Closing Inventory',                     data: ontarioClosingInv,    borderColor: '#651FFF', backgroundColor: 'rgba(101,31,255,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Alberta Closing Inventory',                     data: albertaClosingInv,    borderColor: '#F50057', backgroundColor: 'rgba(245,0,87,0.1)',     tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Imports From USA',                              data: importsFromUSA,       borderColor: '#FFAB40', backgroundColor: 'rgba(255,171,64,0.1)',   tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Temperature 2m Mean',                           data: temperature,          borderColor: '#FFC107', backgroundColor: 'rgba(255,193,7,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                    { label: 'Precipitation Sum',                             data: precipitation,        borderColor: '#03A9F4', backgroundColor: 'rgba(3,169,244,0.1)',    tension: 0.3, spanGaps: true, fill: true, hidden: true },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            filter: (item, chart) => !chart.datasets[item.datasetIndex].hidden
                        }
                    },
                    title: { display: true, text: 'General Data', color: '#e8e8f0'}
                },
                scales: {
                    x: { display: true, title: { display: true, text: 'Date', color: '#8888a0' }, ticks: { maxTicksLimit: 12, maxRotation: 45, minRotation: 45, color: '#8888a0'}, grid: { color: 'rgba(255,255,255,0.05)' }},
                    y: { display: true, title: { display: true, text: 'Value', color: '#8888a0' }, ticks: { color: '#8888a0' }, grid: { color: 'rgba(255,255,255,0.05)' }}
                }
            }
        });
        const parsedDates = data.map(row => new Date(row["Date"]));
        const yearColors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A'];
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        function buildYoyDatasets(activeIndices) {
            if (activeIndices.length === 0) return [];
            const yearSet = new Set(parsedDates.map(d => d.getFullYear()));
            const years = Array.from(yearSet).sort(); 
            const datasets = [];
            years.forEach((year, yi) => {
                activeIndices.forEach((dsIndex, si) => {
                    const seriesData = new Array(12).fill(null);
                    parsedDates.forEach((d, i) => {
                        if (d.getFullYear() === year) {
                            seriesData[d.getMonth()] = allData[dsIndex][i];
                        }
                    });
                    const baseColor = activeIndices.length === 1
                        ? yearColors[yi % yearColors.length]           
                        : datasetMeta[dsIndex].color;                  
                    const opacity = 0.4 + (yi / Math.max(years.length - 1, 1)) * 0.6;
                    const hex = baseColor;
                    const seriesLabel = activeIndices.length > 1
                        ? `${datasetMeta[dsIndex].label} — ${year}`
                        : `${year}`;
                    datasets.push({
                        label: seriesLabel,
                        data: seriesData,
                        borderColor: hex,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: yi === 0 ? [] : yi === 1 ? [6,3] : yi === 2 ? [3,3] : [8,3,2,3],
                        tension: 0.3,
                        spanGaps: true,
                        fill: false,
                        pointRadius: 3,
                        globalAlpha: opacity,
                    });
                });
            });
            return datasets;
        }
        window.yoyChart = new Chart(document.getElementById('productionChart2'), {
            type: 'line',
            data: {
                labels: monthNames,
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#e8e8f0', boxWidth: 24 }
                    },
                    title: { display: true, text: 'Year-over-Year' , color: '#e8e8f0' }
                },
                scales: {
                    x: {
                        display: true,
                        title: { display: true, text: 'Month', color: '#8888a0' },
                        ticks: { color: '#8888a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        display: true,
                        title: { display: true, text: 'Value', color: '#8888a0' },
                        ticks: { color: '#8888a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
        function syncYoyChart() {
            const activeIndices = window.productionChart.data.datasets
                .map((ds, i) => ds.hidden ? null : i)
                .filter(i => i !== null);
            window.yoyChart.data.datasets = buildYoyDatasets(activeIndices);
            window.yoyChart.update();
        }
        window.syncYoyChart = syncYoyChart;

        // ── Scatter plot: x = first selected toggle, y = second selected toggle ──
        window.scatterChart = new Chart(document.getElementById('scatterPlot'), {
            type: 'scatter',
            data: { datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: '#e8e8f0' } },
                    title: { display: true, text: 'Select two toggles to compare', color: '#e8e8f0' }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: { display: true, text: 'X', color: '#8888a0' },
                        ticks: { color: '#8888a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        title: { display: true, text: 'Y', color: '#8888a0' },
                        ticks: { color: '#8888a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });

        // Tracks the order in which checkboxes were checked (not just which are checked)
        window.selectedOrder = [];

        function syncScatterChart() {
            const chart = window.scatterChart;
            const picked = window.selectedOrder.slice(0, 2);

            if (picked.length < 2) {
                chart.data.datasets = [];
                chart.options.plugins.title.text = 'Select two toggles to compare';
                chart.options.scales.x.title.text = 'X';
                chart.options.scales.y.title.text = 'Y';
                chart.update();
                return;
            }

            const [xIndex, yIndex] = picked;
            const xSeries = allData[xIndex];
            const ySeries = allData[yIndex];
            const points = [];
            for (let i = 0; i < xSeries.length; i++) {
                const xVal = xSeries[i];
                const yVal = ySeries[i];
                if (xVal !== null && yVal !== null) {
                    points.push({ x: parseFloat(xVal), y: parseFloat(yVal) });
                }
            }

            chart.data.datasets = [{
                label: `${datasetMeta[yIndex].label} vs ${datasetMeta[xIndex].label}`,
                data: points,
                backgroundColor: datasetMeta[yIndex].color,
                borderColor: datasetMeta[yIndex].color,
                pointRadius: 4,
                pointHoverRadius: 6
            }];
            chart.options.plugins.title.text = `${datasetMeta[yIndex].label} vs ${datasetMeta[xIndex].label}`;
            chart.options.scales.x.title.text = datasetMeta[xIndex].label;
            chart.options.scales.y.title.text = datasetMeta[yIndex].label;
            chart.update();
        }
        window.syncScatterChart = syncScatterChart;

        document.querySelectorAll('.section-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const index = parseInt(checkbox.dataset.dataset);
                window.productionChart.data.datasets[index].hidden = !checkbox.checked;
                window.productionChart.update();
                syncYoyChart();

                if (checkbox.checked) {
                    if (!window.selectedOrder.includes(index)) {
                        window.selectedOrder.push(index);
                    }
                } else {
                    window.selectedOrder = window.selectedOrder.filter(i => i !== index);
                }
                syncScatterChart();
            });
        });
        const slider = document.getElementById('dataRange');
        const rangeValue = document.getElementById('rangeValue');
        slider.max = labels.length;
        slider.value = slider.min;
        slider.dispatchEvent(new Event('input'));
        slider.addEventListener('input', () => {
            const inverted = parseInt(slider.max) - parseInt(slider.value) + parseInt(slider.min);
            const isAll = inverted === parseInt(slider.max);
            rangeValue.textContent = isAll ? 'All' : inverted;
            window.productionChart.data.labels = labels.slice(-inverted);
            window.productionChart.data.datasets.forEach((ds, i) => {
                ds.data = allData[i].slice(-inverted);
            });
            window.productionChart.update();
        });
    } catch (err) {
        console.error('Failed to load chart data:', err);
    }
}
loadCharts();
document.getElementById('resetBtn').addEventListener('click', () => {
    document.querySelectorAll('.section-panel input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    if (window.productionChart) {
        window.productionChart.data.datasets.forEach(ds => ds.hidden = true);
        window.productionChart.update();
    }
    if (window.yoyChart) {
        window.yoyChart.data.datasets = [];
        window.yoyChart.update();
    }
    window.selectedOrder = [];
    if (window.scatterChart) {
        window.scatterChart.data.datasets = [];
        window.scatterChart.options.plugins.title.text = 'Select two toggles to compare';
        window.scatterChart.options.scales.x.title.text = 'X';
        window.scatterChart.options.scales.y.title.text = 'Y';
        window.scatterChart.update();
    }
    document.querySelectorAll('.nav-btn:not(#resetBtn)').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    document.getElementById('resetBtn').blur();
});
document.querySelectorAll('.nav-btn:not(#resetBtn)').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.section;
        document.querySelectorAll('.section-panel').forEach(panel => {
            panel.style.display = panel.id === `section-${target}` ? 'block' : 'none';
        });
    });
});