const express = require('express')
const { v4: uuidv4 } = require('uuid')

let router = express.Router()

let classes = []

router.post('/', (request, response) =>{
    const {name} = request.body

    let classe = {
        id: uuidv4(),
        name
    }

    classes.push(classe)
    response.status(200).json(classes)
})

router.get('/', (request, response) => {
    response.status(200).json(classes)
})

router.get('/:id', (request, response) => {
    const {id} = request.params

    let classe = classe.find(o => o.id === id)

    response.status(200).json(classe)
})

router.delete('/:id', (request,response) => {
    const {id} = request.params
    classes = classes.filter(object => { return object.id !== id})
    
    response.status(200).json(classes)
})

router.put('/:id', (request,response) =>{
    const {id} = request.params
    const {name} = request.body

    let classe = classes.find(item => item.id === id)

    classe.name = name

    response.status(200).json(classe)
})

module.exports = router