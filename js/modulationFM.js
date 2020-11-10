const btnFm = document.getElementById('btn-FM')
const contentModalFM = document.getElementById('modal-container-content-FM')

const getValuesFromDomFM = () => {
  const { 
    frecuenciaMod, 
    frecuenciaPort, 
    indiceMod, 
    valorPicoMod, 
    valorPicoPort 
  } = getElementByIdFromDOM(arrIDFM, arrKeysFM, 'value')
  
  if (isNaN(frecuenciaMod) || !frecuenciaMod || isNaN(frecuenciaPort) || !frecuenciaPort || isNaN(indiceMod) || !indiceMod || isNaN(valorPicoMod) || !valorPicoMod || isNaN(frecuenciaPort) || !frecuenciaPort) {
    contentModalFM.innerHTML = "<h3>Ingresa valores correctos</h3>"
    return false
  }

  return { valorPicoMod, frecuenciaMod, indiceMod, valorPicoPort, frecuenciaPort}
}

btnFm.addEventListener('click', function () {
  const results = getValuesFromDomFM()
  if (results) {
    const { valorPicoMod, frecuenciaMod, indiceMod, valorPicoPort, frecuenciaPort } = results

    let tiempos = []
    for (let i = 0; i < 1; i = i + 0.0025) tiempos.push(+i.toFixed(12))

    let resultadosFM = []
    let resultadosSeñalPortadora = []
    let resultadosSeñalModuladora = []

    tiempos.forEach(tiempo => {
      resultadosFM.push(calcularSeñalModuladaFM(valorPicoPort, frecuenciaPort, tiempo, indiceMod, frecuenciaMod))
      resultadosSeñalModuladora.push(calcularSeñalModuladora(valorPicoMod, frecuenciaMod, tiempo))
      resultadosSeñalPortadora.push(calcularSeñalPortadora(valorPicoPort, frecuenciaPort, tiempo))
    })

    putCavansSignalInHTML(contentModalFM, 'FM')

    const { 
      canvaSeñalFM, canvaSeñalPortadoraFM, canvaSeñalModuladoraFM 
    } = getElementByIdFromDOM(arrIDCanvaFM, arrKeysCanvaFM, 'getContext', '2d')

    const tablaFm = createTable(canvaSeñalFM, resultadosFM, 'Modulación FM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadoraFM, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladoraFM, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
