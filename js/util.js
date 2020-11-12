const twoPI = Math.PI * 2

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
}

function sinOfTwoPIFrTi(frecuencia, tiempo) {
  return Math.sin((twoPI) * (frecuencia) * (tiempo))
}

function calcularSeñalPortadora(valorPico, frecuencia, tiempo) {
  return valorPico * sinOfTwoPIFrTi(frecuencia, tiempo)
}

function calcularSeñalModuladora(vM, fM, t) {
  return vM * sinOfTwoPIFrTi(fM, t)
}

function calcularSeñalModuladaAM(frecuenciaM, frecuenciaP, indice, tiempo, valorPicoPort) {
  return valorPicoPort * (1 + indice * sinOfTwoPIFrTi(frecuenciaM, tiempo)) * sinOfTwoPIFrTi(frecuenciaP, tiempo)
}

function calcularSeñalModuladaFM(vP, fP, t, i, fM) {
  return vP * Math.sin((twoPI * fP * t) + (i * Math.cos(twoPI * fM * t)))
}

function calcularSeñarModuladaPM(desvF, fM, fP, t, vM, vP) {
  return vP * Math.cos((twoPI * fP * t) + (desvF * vM) * Math.sin(twoPI * fM * t))
}

const createTable = (canva, data, label, labels) => new Chart(canva, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: label,
      data: data,
      backgroundColor: 'rgba(108,99,255, 0.1)',
      borderColor: 'rgba(108,99,255)',
    }]
  },
  options: options
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
