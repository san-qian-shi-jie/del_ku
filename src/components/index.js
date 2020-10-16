import Vue from "vue"

import addBtn from './addbtn'
import delBtn from './delbtn'

let obj = {
    addBtn,
    delBtn,
}
for (let i in obj) {
    Vue.component(i, obj[i])
}
