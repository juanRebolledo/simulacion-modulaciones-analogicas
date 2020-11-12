const handlerClassLists = (targetToAdd, fTargetToDelete, sTargetToDelete) => {
  fTargetToDelete.classList.remove('active')
  sTargetToDelete.classList.remove('active')
  targetToAdd.classList.add('active')
}

function handlerValues(arrIDs, arrKeys, contentModal, prop) {
  const values = {}
  const elements = getElementByIdFromDOM2(arrIDs, arrKeys, prop)
  const notCorrect = elements.some((input, index) => isNaN(input[arrKeys[index]]) || !input[arrKeys[index]])
  if (!notCorrect) {
    elements.forEach((input, index) => {
      const value = input[arrKeys[index]]
      values[arrKeys[index]] = value
    })
    return values
  }
  
  contentModal.innerHTML = "<h3>Verifica los datos ingresados</h3>"
  return false
}

const handlerViews = (pageToView, fPageToHide, sPageToHide) => {
  fPageToHide.style.display = 'none'
  pageToView.style.display = 'flex'
  sPageToHide.style.display = 'none'
}
