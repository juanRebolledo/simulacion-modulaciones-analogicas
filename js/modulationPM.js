const btnPm = document.getElementById('btn-PM')
const contentModalPM = document.getElementById('modal-container-content-PM')

const handlerValuesPM = () => {
  const { 
    desvF, 
    frecuenciaMod, 
    frecuenciaPort, 
    valorPicoMod, 
    valorPicoPort
  } = getElementByIdFromDOM(arrIDPM, arrKeysPM, 'value')
  if (isNaN(desvF) || !desvF || isNaN(frecuenciaMod) || !frecuenciaMod || isNaN(frecuenciaPort) || !frecuenciaPort || isNaN(valorPicoMod) || !valorPicoMod || isNaN(valorPicoPort) || !valorPicoPort) {
    contentModalPM.innerHTML = "<h3>Verifica los datos ingresados</h3>"
    return false
  }

  return { desvF, frecuenciaMod, frecuenciaPort, valorPicoMod, valorPicoPort }
}

btnPm.addEventListener('click', function () {
  const results = handlerValuesPM()
  if (results) {
    const { desvF, frecuenciaMod, frecuenciaPort, valorPicoMod, valorPicoPort } = results

    let tiempos = []
    for (let i = 0; i < 1; i = i + 0.0025) tiempos.push(+i.toFixed(12))

    let resultadosFM = []
    let resultadosSeñalPortadora = []
    let resultadosSeñalModuladora = []

    tiempos.forEach(tiempo => {
      resultadosFM.push(calcularSeñarModuladaPM(desvF, frecuenciaMod, frecuenciaPort, tiempo, valorPicoMod, valorPicoPort))
      resultadosSeñalModuladora.push(calcularSeñalModuladora(valorPicoMod, frecuenciaMod, tiempo))
      resultadosSeñalPortadora.push(calcularSeñalPortadora(valorPicoPort, frecuenciaPort, tiempo))
    })

    putCavansSignalInHTML(contentModalPM, 'PM')

    const { 
      canvaSeñalPM, canvaSeñalPortadoraPM, canvaSeñalModuladoraPM 
    } = getElementByIdFromDOM(arrIDCanvaPM, arrKeysCanvaPM, 'getContext', '2d')

    const tablaPm = createTable(canvaSeñalPM, resultadosFM, 'Modulación PM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadoraPM, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladoraPM, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
