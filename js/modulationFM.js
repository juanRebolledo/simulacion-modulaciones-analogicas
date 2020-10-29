const btnFm = document.getElementById('btn-FM')
const contentModalFM = document.getElementById('modal-container-content-FM')

const getValuesFromDomFM = () => {
  const valorPicoMod = parseFloat(document.getElementById('vM-FM').value)
  const frecuenciaMod = parseFloat(document.getElementById('fM-FM').value)
  const valorPicoPort = parseFloat(document.getElementById('vP-FM').value)
  const frecuenciaPort = parseFloat(document.getElementById('fP-FM').value)
  const indiceMod = parseFloat(document.getElementById('i-FM').value)

  if (isNaN(valorPicoMod) || isNaN(frecuenciaMod) || isNaN(indiceMod) || isNaN(valorPicoPort) || isNaN(frecuenciaPort)) {
    contentModalFM.innerHTML = "<h3>Ingresa valores correctos</h3>"
    return false
  }

  return { valorPicoMod, frecuenciaMod, indiceMod, valorPicoPort, frecuenciaPort}
}

const putCavansInHTMLFM = () => {
  contentModalFM.innerHTML = `
    <div class="container-tables">
      <div class="container-table">
        <canvas id="tableMod-FM" width="800" height="350"></canvas>
      </div>
        
      <div class="container-table">
        <canvas id="tablePort-FM" width="800" height="350"></canvas>
      </div>

      <div class="container-table">
        <canvas id="tableFM" width="800" height="350"></canvas>
      </div>
    </div>
  `
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

    putCavansInHTMLFM()

    const canvaSeñalFM = document.getElementById('tableFM').getContext('2d');
    const canvaSeñalPortadoraFM = document.getElementById('tablePort-FM').getContext('2d');
    const canvaSeñalModuladoraFM = document.getElementById('tableMod-FM').getContext('2d');

    const tablaFm = createTable(canvaSeñalFM, resultadosFM, 'Modulación FM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadoraFM, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladoraFM, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
