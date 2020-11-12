const btnPm = document.getElementById('btn-PM')
const contentModalPM = document.getElementById('modal-container-content-PM')

btnPm.addEventListener('click', function () {
  const values = handlerValues(arrIDPM, arrKeysPM, contentModalPM, 'value')
  if (values) {
    const { desvF, frecuenciaMod, frecuenciaPort, valorPicoMod, valorPicoPort } = values

    let tiempos = []
    for (let i = 0; i < 1; i = i + 0.0025) tiempos.push(+i.toFixed(12))

    let resultadosPM = []
    let resultadosSeñalPortadora = []
    let resultadosSeñalModuladora = []

    tiempos.forEach(tiempo => {
      resultadosPM.push(calcularSeñarModuladaPM(desvF, frecuenciaMod, frecuenciaPort, tiempo, valorPicoMod, valorPicoPort))
      resultadosSeñalModuladora.push(calcularSeñalModuladora(valorPicoMod, frecuenciaMod, tiempo))
      resultadosSeñalPortadora.push(calcularSeñalPortadora(valorPicoPort, frecuenciaPort, tiempo))
    })

    putCavansSignalInHTML(contentModalPM, 'PM')

    const { 
      canvaSeñalPM, canvaSeñalPortadoraPM, canvaSeñalModuladoraPM 
    } = getElementByIdFromDOM(arrIDCanvaPM, arrKeysCanvaPM, 'getContext', '2d')

    const tablaPm = createTable(canvaSeñalPM, resultadosPM, 'Modulación PM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadoraPM, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladoraPM, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
