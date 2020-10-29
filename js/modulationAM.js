const btnAm = document.getElementById('btn-AM')
const contentModal = document.getElementById('modal-container-content-AM')

const getValuesFromDom = () => {
  const valorPicoMod = parseFloat(document.getElementById('vP-AM').value)
  const frecuenciaMod = parseFloat(document.getElementById('fP-AM').value)
  const indiceMod = parseFloat(document.getElementById('i-AM').value)

  if (isNaN(valorPicoMod) || isNaN(frecuenciaMod) || isNaN(indiceMod)) {
    contentModal.innerHTML = "<h3>Ingresa valores correctos</h3>"
    return false
  }

  return { valorPicoMod, frecuenciaMod, indiceMod }
}

const putCavansInHTML = () => {
  contentModal.innerHTML = `
    <div class="container-tables">
      <div class="container-table">
        <canvas id="tableMod" width="800" height="350"></canvas>
      </div>
        
      <div class="container-table">
        <canvas id="tablePort" width="800" height="350"></canvas>
      </div>

      <div class="container-table">
        <canvas id="tableAM" width="800" height="350"></canvas>
      </div>
    </div>
  `
}

btnAm.addEventListener('click', function () {
  const results = getValuesFromDom()
  if (results) {
    const { valorPicoMod, frecuenciaMod, indiceMod } = results
    const periodoTiempoMod = 1 / frecuenciaMod

    const frecuenciaPort = frecuenciaMod * 10
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

    putCavansInHTML()

    const canvaSeñalAM = document.getElementById('tableAM').getContext('2d');
    const canvaSeñalPortadora = document.getElementById('tablePort').getContext('2d');
    const canvaSeñalModuladora = document.getElementById('tableMod').getContext('2d');

    const tablaAm = createTable(canvaSeñalAM, resultadosAM, 'Modulación AM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadora, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladora, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
