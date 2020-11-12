const btnFm = document.getElementById('btn-FM')
const contentModalFM = document.getElementById('modal-container-content-FM')

btnFm.addEventListener('click', function () {
  const values = handlerValues(arrIDFM, arrKeysFM, contentModalFM, 'value')

  if (values) {
    const { valorPicoMod, frecuenciaMod, indiceMod, valorPicoPort, frecuenciaPort } = values

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
