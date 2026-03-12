/* =====================
FORM CONFIG
===================== */

const formConfig = {

kalkulator:[
    {label:"Angka 1", name:"num1", type:"number"},
    {label:"Angka 2", name:"num2", type:"number"},
    {label:"Tambah (+)", name:"operator", type:"radio", value:"+"},
    {label:"Kurang (-)", name:"operator", type:"radio", value:"-"},
    {label:"Kali (*)", name:"operator", type:"radio", value:"*"},
    {label:"Bagi (/)", name:"operator", type:"radio", value:"/"}

],

ganjil:[
    {label:"Masukkan angka",name:"angka"}
],

umur:[
    {label:"Tahun lahir",name:"tahun"}
],

bmi:[
    {label:"Berat badan",name:"berat"},
    {label:"Tinggi badan",name:"tinggi"}
]

}



/* =====================
FORM GENERATOR
===================== */

function generateForm(type){

const fields = formConfig[type]

let html=""
let radioGroup = ""

  fields.forEach(field => {
    if(field.type === "radio"){
      radioGroup += `
        <label>
          <input type="radio"
          name="${field.name}"
          value="${field.value}"
          class="form-input"> ${field.label}
        </label>
      `
    } else {
      html += `
        <input type="${field.type || 'number'}"
        name="${field.name}"
        class="form-input"
        placeholder="${field.label}">
      `
    }
  })

  // bungkus semua radio dalam satu grup
  if(radioGroup){
    html += `
      <fieldset class="radio-group">
        <legend>Pilih Operasi</legend>
        ${radioGroup}
      </fieldset>
    `
  }

return html

}



/* =====================
GET FORM DATA
===================== */

function getFormData(card){

const inputs = card.querySelectorAll(".form-input")

const data = {}

inputs.forEach(input => {

 if(input.type === "radio"){
      if(input.checked){
        data[input.name] = input.value
      }
    } else {
      data[input.name] = Number(input.value)
    }

})

return data

}



/* =====================
CALCULATION ENGINE
===================== */

const calculationEngine = {

    kalkulator(data){
        console.log(data)
        switch(data.operator){
            case "+": return data.num1 + data.num2
            case "-": return data.num1 - data.num2
            case "*": return data.num1 * data.num2
            case "/": return data.num2 !== 0 ? data.num1 / data.num2 : "Error: bagi 0"
            default: return "Pilih operator"
        }

    },

    ganjil(data){

        return data.angka % 2 === 0 ? "Genap" : "Ganjil"

    },

    umur(data){

        const year = new Date().getFullYear()

        return year - data.tahun

    },

    bmi(data){

        const tinggi = data.tinggi/100

        return (data.berat/(tinggi*tinggi)).toFixed(2)

    }

}



/* =====================
CARD SYSTEM
===================== */

document.querySelectorAll(".card").forEach(card => {

const select = card.querySelector(".jenis")
const formArea = card.querySelector(".form-area")
const result = card.querySelector(".result")
const proses = card.querySelector(".proses")
const clear = card.querySelector(".clear")


// document.querySelectorAll(".card").forEach(card => {
//   console.log("Card:", card)
//   console.log("Select:", card.querySelector(".jenis"))
// })

// Pastikan hanya card yang punya <select> diproses
//   if(!select) return
// /* CHANGE FORM */

// select.addEventListener("change",function(){


// const type = this.value

// if(!type){
// formArea.innerHTML=""
// return
// }

// formArea.innerHTML = generateForm(type)

// result.innerText=""

// })

if(select){
  select.addEventListener("change", function(){
    const type = this.value
    if(!type){
      formArea.innerHTML=""
      return
    }
    formArea.innerHTML = generateForm(type)
    result.innerText=""
  })
}

// PROSES
  if(proses){
    proses.addEventListener("click", function(){
      const type = select.value
      const data = getFormData(card)
      const output = calculationEngine[type](data)
      result.innerText = output
    })
  }


// CLEAR
  if(clear){
    clear.addEventListener("click", function(){
      const inputs = card.querySelectorAll(".form-input")
      inputs.forEach(input => input.value = "")
      result.innerText = ""
    })
  }


})