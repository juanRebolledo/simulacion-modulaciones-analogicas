const twoPI = Math.PI * 2

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

function sinOfTwoPIFrTi(frecuencia, tiempo) {
  return Math.sin((twoPI) * (frecuencia) * (tiempo))
}