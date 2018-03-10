// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './css/main.css'
import './sass/main.scss'
// import puppeteer from 'puppeteer'

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle'})
//   await page.pdf({path: 'hn.pdf', format: 'A4'})
//   browser.close()
// })()

import '../mock'
import { store } from './store'

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
