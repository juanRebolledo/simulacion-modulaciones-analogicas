const tableOptions = {
  backgroundColor: 'rgba(108,99,255, 0.1)',
  borderColor: 'rgb(108,99,255)',
  type: 'line',
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  }
}

const createTable = (canva, data, label, labels) => new Chart(canva, {
  type: tableOptions.type,
  data: {
    labels: labels,
    datasets: [{
      label: label,
      data: data,
      backgroundColor: tableOptions.backgroundColor,
      borderColor: tableOptions.borderColor,
    }]
  },
  options: tableOptions.options
})

function putCavansSignalInHTML(canva, canvaSignal) {
  canva.innerHTML = `
    <div class="container-tables">
      <div class="container-table">
        <canvas id="tableMod-${canvaSignal}" width="800" height="350"></canvas>
      </div>
        
      <div class="container-table">
        <canvas id="tablePort-${canvaSignal}" width="800" height="350"></canvas>
      </div>

      <div class="container-table">
        <canvas id="table-${canvaSignal}" width="800" height="350"></canvas>
      </div>
    </div>
  `
}
