const { json } = require('body-parser')
const express = require('express')
const studentModel = require('../models/student')
const bcrypt = require("bcrypt");

let router = express.Router();

router.post('/register', async (request, response) =>{

    const {email, email_cfg, password, password_cfg, firstname, lastname} = request.body;

    if( (typeof email === "undefined" || email.trim() === "") ||
        (typeof password === "undefined" || password.trim() === "")
    ){
        return response.status(500).json({
            msg: "Il faut remplir tous les champs"
        });
    }

    if ( email !== email_cfg || password !== password_cfg){
        return response.status(500).json({
            msg: "Les confirmations ne sont pas exactes"
        });
    }

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined') {
        return response.status(500).json({
            "msg": "vous devez entrer un nom et un prénom"
        });
    }

    try {
        if (await studentModel.findOne({email})){
            return response.status(500).json({
                msg: "Le compte existe déjà"
            });
        }

        let student =  await studentModel.create({
            email: email.trim(),
            password: await bcrypt.hash(password, 10),
            firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
            lastname: typeof lastname !== 'undefined' ? lastname.trim() : "",
        })
    }catch (error){
        return response.status(500).json({
            msg: error
        });
    }

    return response.status(200).json({
        msg: "page register"
    });
})

router.get('/login', async (request, response) => {
    const {email, password} = request.body;

    if( (typeof email === "undefined" || email.trim() === "") ||
        (typeof password === "undefined" || password.trim() === "")
    ){
        return response.status(500).json({
            msg: "Il faut remplir tous les champs"
        });
    }

    try {
        let student =  await studentModel.findOne({email})
        if(student) {
            if (await bcrypt.compare(password, student.password)) {
                return response.status(200).json(student)
            } else {
                return response.status(500).json({
                    msg: "Mauvais mot de passe"
                });
            }
        }else {
            return response.status(500).json({
                msg: "Mauvais email"
            });
        }
    }catch (error){
        console.log(error)
        return response.status(500).json({
            msg: error
        });
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
            msg: "Etudiant bien supprimé !"
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