import { throttle } from 'lodash'

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', anchorLinkHandler))

function anchorLinkHandler(e) {
  e.preventDefault()
  const targetID = this.getAttribute('href').split('#')
  const targetAnchor = targetID[1] ? document.getElementById(targetID[1]) : document.documentElement

  targetAnchor.scrollIntoView({
    behavior: 'smooth',
  })
}

window.addEventListener('scroll', throttle(updateMenu))

function updateMenu() {
  const aboutSection = document.getElementById('about')
  const nav = document.getElementById('menu')

  const scroll = document.documentElement.scrollTop
  const aboutTop = aboutSection.offsetTop - window.innerHeight / 2

  if (scroll >= aboutTop) {
    nav.classList.add('topactive')
    updateUrl('#about')
  } else {
    nav.classList.remove('topactive')
    updateUrl('/')
  }
}

function updateUrl(path) {
  if (history.state && history.state.path === path) {
    return
  }
  history.pushState({ path }, null, path)
}
