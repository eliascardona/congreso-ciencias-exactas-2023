console.log("Javascript funcionando")

const myform = document.getElementById("my-form")
const nom = document.getElementById("form-nombre")
const ap = document.getElementById("form-apellido")

myform.addEventListener("submit", (e) => {
	e.preventDefault()
	nom.innerText = e.target.nombre.value
	ap.innerText = e.target.apellido.value
})
