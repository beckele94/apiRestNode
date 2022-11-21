const { json } = require('body-parser');
const express = require('express');
const studentModel = require('../models/student');

let router = express.Router();


//TODO: crud comme classes.js

router.post('/', async(request, response) =>{
    const {firstname, lastname} = request.body;

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined'){
        return response.status(500).json({
            msg: "Veuillez saisir un prenom et un nom valide"
        })
    }

    try {
        let student = await studentModel.create({
            firstname,
            lastname
        });

        return response.status(200).json(student);
    }catch (error){
        return response.status(500).json({
            msg: "Il y a eu une erreur : " + erreur
        })
    }
})

router.get('/', async (request, response) => {
    try {
        let students = await studentModel.find()
        return response.status(200).json(students)
    } catch (error) {
        return response.status(500).json(error)
    }
})

router.get('/:id', async (request, response) => {
    const {id} = request.params

    try {
        let student = await studentModel.findById(id)
        return response.status(200).json(student)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.delete('/:id', async (request,response) => {
    const {id} = request.params

    try {
        let student = await studentModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "Etudiant bien supprimée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }
})

router.put('/:id', async (request,response) =>{
    const {id} = request.params
    const {firstname, lastname} = request.body;

    try {
        let student = await studentModel.findByIdAndUpdate(id,
            {
                firstname,
                lastname
            },{
                new: true
            })
        return response.status(200).json({
            msg: "Etudiant bien modifié !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }
    
})

module.exports = router;