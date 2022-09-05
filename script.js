const url = 'https://api-pacientes.herokuapp.com/pacientes'
const body = document.querySelector('body')
const tbody = document.querySelector('tbody')
let inputName = document.getElementById('inputName')
let inputWeight = document.getElementById('inputWeight')
let inputHeight = document.getElementById('inputHeight')
let inputFat = document.getElementById('inputFat')
let inputImc = document.getElementById('inputImc')
let form = document.getElementById('form')
const buttonForm = document.getElementById('buttonForm')
const table = document.querySelector('.table')
const filter = document.getElementById('filtrar-tabela')
const eraseButton = document.getElementById('apagar')
let modal = document.getElementById('id01')

buttonForm.addEventListener('click',(event)=>{
    event.preventDefault()
    id++
    let name = inputName.value
    let weight = inputWeight.value
    let height = inputHeight.value
    let fat = inputFat.value
    
    let imc = calcularImc(inputHeight.value, inputWeight.value)
    criarTd(id,name, weight, height, fat, imc )
    form.reset()
})

let id = 0

const calcularImc = (altura, peso) => {
    let imc =  peso / altura ** 2
    return imc.toFixed(2)
}


const decisions = ((event) =>{
    alvo = event.target
    var paiDoAlvo = alvo.parentNode
    modal.style.display='block'

    modal.addEventListener('click', (event)=>{
        if(event.target == modal){
            modal.style.display='none'
        }
    })
    return paiDoAlvo
})
table.addEventListener('dblclick', decisions)

const erasePaciente= ((event) =>{
    paiDoAlvo = alvo.parentNode;
    paiDoAlvo.classList.add('FadeOut')
    setTimeout(()=>{
        paiDoAlvo.remove()
    },500)
    modal.style.display='none'
})

eraseButton.addEventListener('click', erasePaciente)

// api getting data
const getApi = new Promise((resolve, reject) =>{
    fetch(url).then((response)=>{
        return response.json()
    }).then((data) =>{
        resolve(data)
        data.forEach((element) =>{
            id ++
            criarTd(id, element.nome, element.peso, element.altura, element.gordura, element.imc)

        })
    }).catch((error) =>{
        reject(error)
        console.log(error)
    })
})

// creating tr
const criarTd = (id, nome, peso, altura, gordura, imc) =>{
    let thId = document.createElement('th')
    let tdPeso = document.createElement('td')
    let tdNome = document.createElement('td')
    let tdAltura = document.createElement('td')
    let tdGordura = document.createElement('td')
    let tdImc = document.createElement('td')
    criandoTr = criarTr()

    thId.innerText = id
    thId.setAttribute('scope', 'row')
    tdNome.innerText = nome
    tdNome.setAttribute('class', 'info-nome')
    tdPeso.innerText = peso
    tdAltura.innerText = altura
    tdGordura.innerText = gordura
    tdImc.innerText = imc

    criandoTr.append(thId, tdNome, tdPeso, tdAltura, tdGordura, tdImc)
    tbody.append(criandoTr)
    return tbody
}
const criarTr = () =>{
    let criaTr = document.createElement('tr');
    criaTr.setAttribute('class', 'paciente');
    return criaTr;
}

filter.addEventListener("input",function(){
    var pacientes = document.querySelectorAll(".paciente");
    if (this.value.length > 0){
        for(var i = 0; i < pacientes.length; i++){
            var paciente = pacientes[i]
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;
            var expressao = new RegExp(this.value,"i");
            if (!expressao.test(nome)){
                paciente.classList.add("fadeSearch");
            }else{
                paciente.classList.remove("fadeSearch");
            };
            };
            }else{
                for (var i = 0; i < pacientes.length; i++) {
                    var paciente = pacientes[i];
                    paciente.classList.remove("fadeSearch");
            }
    }
    });
