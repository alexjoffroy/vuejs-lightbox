class Store {

  constructor () {
    this.state = {
      pictures: {},
      group: false,
      index: false,
    }
  }

  addPicture (group, title, source) {
    group = group || 'default'
    if (!this.state.pictures[group]) {
      this.state.pictures[group] = []
    }
    return this.state.pictures[group].push({
      title: title,
      source: source,
    })
  }

  open (group, id) {
    this.state.group = group || 'default'
    this.state.index = id - 1
    window.history.pushState('lightbox', document.title, window.location.pathname)
    window.addEventListener('popstate', () => {
      this.closeWithoutBackHistory()
    })
  }

  close () {
    this.closeWithoutBackHistory()
    window.history.back()
  }

  closeWithoutBackHistory () {
    this.state.group = false
    this.state.index = false
  }

  prev () {
    if (this.state.index === 0) {
      this.state.index = this.state.pictures[this.state.group].length - 1
    } else {
      this.state.index--
    }
  }

  next () {
    if (this.state.index === this.state.pictures[this.state.group].length - 1) {
      this.state.index = 0
    } else {
      this.state.index++
    }
  }

  currentPicture () {
    return this.state.pictures[this.state.group][this.state.index]
  }

  isVisible () {
    return this.state.index !== false
  }

  counter () {
    return (this.state.index + 1) + ' / ' + this.state.pictures[this.state.group].length
  }

}

export default new Store()
