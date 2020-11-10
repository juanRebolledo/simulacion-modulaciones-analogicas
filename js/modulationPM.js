const btnPm = document.getElementById('btn-PM')
const contentModalPM = document.getElementById('modal-container-content-PM')

const getValuesFromDomPM = () => {
  const desvF = parseFloat(document.getElementById('desvF-PM').value)
  const frecuenciaMod = parseFloat(document.getElementById('fM-PM').value)
  const frecuenciaPort = parseFloat(document.getElementById('fP-PM').value)
  const valorPicoMod = parseFloat(document.getElementById('vM-PM').value)
  const valorPicoPort = parseFloat(document.getElementById('vP-PM').value)

  if (isNaN(desvF) || isNaN(frecuenciaMod) || isNaN(frecuenciaPort) || isNaN(valorPicoMod) || isNaN(frecuenciaPort)) {
    contentModalPM.innerHTML = "<h3>Ingresa valores correctos</h3>"
    return false
  }

  return { desvF, frecuenciaMod, frecuenciaPort, valorPicoMod, valorPicoPort }
}

const putCavansInHTMLPM = () => {
  contentModalPM.innerHTML = `
    <div class="container-tables">
      <div class="container-table">
        <canvas id="tableMod-PM" width="800" height="350"></canvas>
      </div>
        
      <div class="container-table">
        <canvas id="tablePort-PM" width="800" height="350"></canvas>
      </div>

      <div class="container-table">
        <canvas id="table-PM" width="800" height="350"></canvas>
      </div>
    </div>
  `
}

btnPm.addEventListener('click', function () {
  const results = getValuesFromDomPM()
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

    putCavansInHTMLPM()

    const canvaSeñalPM = document.getElementById('table-PM').getContext('2d');
    const canvaSeñalPortadoraPM = document.getElementById('tablePort-PM').getContext('2d');
    const canvaSeñalModuladoraPM = document.getElementById('tableMod-PM').getContext('2d');

    const tablaPm = createTable(canvaSeñalPM, resultadosFM, 'Modulación PM', tiempos)
    const tablaPort = createTable(canvaSeñalPortadoraPM, resultadosSeñalPortadora, 'Señal Portadora', tiempos)
    const tablaMod = createTable(canvaSeñalModuladoraPM, resultadosSeñalModuladora, 'Señal moduladora', tiempos)
  }
})
