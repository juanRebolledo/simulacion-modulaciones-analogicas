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

function calcularSeñalPortadora(valorPico, frecuencia, tiempo) {
  return valorPico * sinOfTwoPIFrTi(frecuencia, tiempo)
}

// // Señal Moduladora
function calcularSeñalModuladora(vM, fM, t) {
  return vM * sinOfTwoPIFrTi(fM, t)
}

function sinOfTwoPIFrTi(frecuencia, tiempo) {
  return Math.sin((twoPI) * (frecuencia) * (tiempo))
}

function calcularSeñalModuladaAM(frecuenciaM, frecuenciaP, indice, tiempo, valorPicoPort) {
  // y = Ac * (1 + m * sin(2*pi*fa*t))    *sin(2*pi*fc*t);
  return valorPicoPort * (1 + indice * sinOfTwoPIFrTi(frecuenciaM, tiempo)) * sinOfTwoPIFrTi(frecuenciaP, tiempo)
}

function calcularSeñalModuladaFM(vP, fP, t, i, fM) {
  return vP * Math.sin((twoPI * fP * t) + (i * Math.cos(twoPI * fM * t)))
  // return vP * Math.sin( (twoPI * fP * t) + (i * (Math.sin(twoPI * fM * t))) )
  // return vP * sinXPiXFXT( ( fP + ((i) * sinXPiXFXT(fM, t)) ) , t)
  // return vP * Math.sin((twoPI) * (fP + (i * Math.sin(twoPI * fM * t))) * (t))
  // return vP * Math.sin((2 * Math.PI * fP * t) + (i * Math.sin(2 * Math.PI * fM * t)))
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
