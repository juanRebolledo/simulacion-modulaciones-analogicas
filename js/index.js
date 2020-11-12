const {
  containerAmTarget,
  containerFmTarget,
  containerPmTarget,
  itemRouteAmTarget,
  itemRouteFmTarget,
  itemRoutePmTarget
} = getElementByIdFromDOM(arrIdElements, arrKeysElements)

containerFmTarget.style.display='none'
containerPmTarget.style.display='none'

itemRouteAmTarget.addEventListener( 'click', () => {
  handlerClassLists(itemRouteAmTarget, itemRouteFmTarget, itemRoutePmTarget)
  handlerViews(containerAmTarget, containerFmTarget, containerPmTarget)
})

itemRouteFmTarget.addEventListener('click', () => {
  handlerClassLists(itemRouteFmTarget, itemRoutePmTarget, itemRouteAmTarget)
  handlerViews(containerFmTarget, containerAmTarget, containerPmTarget)
})

itemRoutePmTarget.addEventListener('click', () => {
  handlerClassLists(itemRoutePmTarget, itemRouteFmTarget, itemRouteAmTarget)
  handlerViews(containerPmTarget, containerAmTarget, containerFmTarget)
})
