import store from '../store'

export default {
  bind (el, binding) {
    let source = el.getAttribute('href')
    let title = el.getAttribute('title')
    let group = binding.value
    let id = store.addPicture(group, title, source)
    el.addEventListener('click', (e) => {
      e.preventDefault()
      store.open(group, id)
    })
  },
}
