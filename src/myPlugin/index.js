export const MyPlugin = {
  install: function (Vue, options) {
    Vue.prototype.circleAnimate = (e) => {
      let pi = document.documentElement.clientWidth / 375 * 100
      let x = e.clientX
      let y = e.clientY
      let newDiv = document.createElement('div')
      let newDiv1 = document.createElement('div')
      newDiv.className = 'math-cube-c'
      newDiv.style.left = x + 'px'
      newDiv.style.top = y + 'px'
      newDiv1.className = 'math-cube'
      document.body.appendChild(newDiv)
      newDiv.appendChild(newDiv1)
      newDiv.addEventListener('webkitTransitionEnd', function (event) {
        if (event.target === this) {
          document.body.removeChild(newDiv)
        }
      })
      setTimeout(() => {
        newDiv.style.transform = 'translateX(-' + (x - 0.4 * pi) + 'px)'
        newDiv1.style.transform = 'translateY(' + (document.documentElement.clientHeight - y - 0.5 * pi) + 'px)'
      }, 0)
    }
  }
}
