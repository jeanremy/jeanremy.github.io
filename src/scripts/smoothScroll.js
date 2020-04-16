function anchorLinkHandler(e) {
  const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top)
  e.preventDefault()
  const targetID = this.getAttribute('href').split('#')
  const targetAnchor = targetID[1] ? document.getElementById(targetID[1]) : document.documentElement
  // if (!targetAnchor) return
  const originalTop = distanceToTop(targetAnchor)
  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })
}

document.querySelectorAll('nav a').forEach((e) => (e.onclick = anchorLinkHandler))

const aboutSection = document.getElementById('about')
const nav = document.getElementById('menu')

window.addEventListener('scroll', () => {
  updateMenu()
})

function updateMenu() {
  window.requestAnimationFrame(updateMenu)

  const scroll = document.documentElement.scrollTop
  const aboutTop = aboutSection.offsetTop
  if (scroll >= aboutTop - 1) {
    nav.classList.add('topactive')
  } else {
    nav.classList.remove('topactive')
  }
}

updateMenu()
