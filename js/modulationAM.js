const btnAm = document.getElementById('btn-AM')
const contentModalAM = document.getElementById('modal-container-content-AM')

btnAm.addEventListener('click', function () {
  const values = handlerValues(arrIDAM, arrKeysAM, contentModalAM, 'value')

  if (values) {
    const { valorPicoMod, frecuenciaMod, indiceMod } = values

    const frecuenciaPort = frecuenciaMod * 10
    const periodoTiempoMod = 1 / frecuenciaMod
    const valorPicoPort = valorPicoMod / indiceMod

    let tiempos = []
    for (let i = 0; i < 3 * periodoTiempoMod; i = i + (periodoTiempoMod / 225))
      tiempos.push(i)

    let resultadosAM = []
    let resultadosSeñalPortadora = []
    let resultadosSeñalModuladora = []

    tiempos.forEach(tiempo => {
      resultadosAM.push(calcularSeñalModuladaAM(frecuenciaMod, frecuenciaPort, indiceMod, tiempo, valorPicoPort))
      resultadosSeñalModuladora.push(calcularSeñalModuladora(valorPicoMod, frecuenciaMod, tiempo))
      resultadosSeñalPortadora.push(calcularSeñalPortadora(valorPicoPort, frecuenciaPort, tiempo))
    })

    putCavansSignalInHTML(contentModalAM, 'AM')

    const { 
      canvaSeñalAM, canvaSeñalPortadora, canvaSeñalModuladora 
    } = getElementByIdFromDOM(arrIDCanvaAM, arrKeysCanvaAM, 'getContext', '2d')

    const tablaAm = createTable(canvaSeñalAM, resultadosAM, 'Modulación AM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadora, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladora, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
