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

// // Señal Moduladora
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
  // vP * cos ((2PI * fP * t) + (desviacionFase * vM) * sin(2PI * fM * t))
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
