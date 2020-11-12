function getElementByIdFromDOM(arrID, arrKeys, property, paramFunc) {
  const elements = {}
  arrID.forEach((valueId, index) => {
    const element = document.getElementById(valueId)
    elements[arrKeys[index]] = property ? paramFunc ? element[property](paramFunc) : parseFloat(element[property]) : element
  })
  return elements
}

function getElementByIdFromDOM2(arrID, arrKeys, property, paramFunc) {
  const elements = []
  arrID.forEach((valueId, index) => {
    const element = document.getElementById(valueId)
    elements.push({
      [arrKeys[index]] : property ? paramFunc ? element[property](paramFunc) : parseFloat(element[property]) : element
    })
  })
  return elements
}
