import Vue from 'vue'

const truncate = require('truncate-html')

Vue.filter('truncate', (value, length = 50) => {
    return truncate.default(value, length, { byWords: true })
})
