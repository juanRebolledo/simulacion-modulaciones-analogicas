const btnAm = document.getElementById('btn-AM')
const contentModalAM = document.getElementById('modal-container-content-AM')

const getValuesFromDom = () => {
  const { frecuenciaMod, indiceMod, valorPicoMod } = getElementByIdFromDOM(arrIDAM, arrKeysAM, 'value')
  if (isNaN(valorPicoMod) || !valorPicoMod || isNaN(frecuenciaMod) || !frecuenciaMod || isNaN(indiceMod) || !indiceMod) {
    contentModalAM.innerHTML = "<h3>Ingresa valores correctos</h3>"
    return false
  }

  return { valorPicoMod, frecuenciaMod, indiceMod }
}

btnAm.addEventListener('click', function () {
  const results = getValuesFromDom()
  if (results) {
    const { valorPicoMod, frecuenciaMod, indiceMod } = results

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
