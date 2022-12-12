const { json } = require('body-parser')
const express = require('express')
const studentModel = require('../models/student')

const { response } = require('express')
const { request } = require('http')
const bcrypt = require('bcrypt')
const { traceDeprecation } = require('process')
const student = require('../models/student')

let router = express.Router()


router.get('/me',(request, response) =>{
    console.log(request.session)
    return response.status(200).json({msg:request.session.student})
})

router.post('/login', async (request, response) => {
    const { email,
        password,
    } = request.body

    if ( (typeof email === 'undefined' || email.trim() === "") || (typeof password === 'undefined' ||  password.trim() === "") ){
        return response.status(500).json({
            msg: "Il faut remplir tous les champs !"
        })
    }
    try {
        let exist = await studentModel.findOne({email: email.trim()})

        if (!exist) {
            return response.status(500).json({
                msg: "Pas de email" + error
            })
        }
        else if(exist && await bcrypt.compare(password, exist.password) ){
            request.session.student = exist
            return response.status(200).json(exist)
        }else{
            return response.status(500).json({
                msg: "MDP PAS BON" + error
            })
        }
    } catch (error) {
        return response.status(500).json({
            msg: "ca marche pas du tout" + error
        })
    }
})

router.post('/register', async (request, response) => {
    const { email,
        email_cfg,
        password,
        password_cfg,
        firstname,
        lastname
    } = request.body

    if ( (typeof email === 'undefined' || email.trim() === "") || (typeof password === 'undefined' ||  password.trim() === "") ){
        return response.status(500).json({
            msg: "Il faut remplir tous les champs !"
        })
    }

    if (email !== email_cfg || password !== password_cfg){
        return response.status(500).json({
            msg: "Les confirmations ne sont pas bonnes!"
        })
    }

    let exist = await studentModel.findOne({email})

    if (exist) {
        return response.status(500).json({
            msg: "L'email existe déja mdr"
        })
    }
    let student = await studentModel.create({
        email: typeof email !== 'undefined' ? email.trim() : "",
        password: bcrypt.hashSync(password.trim(), 10),
        firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
        lastname: typeof lastname !== 'undefined' ? lastname.trim() : "",
    })
    return response.status(200).json(student)
})

router.post('/', async(req, res) =>{
    const {firstname, lastname} = req.body

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined'){
        return res.status(500).json({
            "msg": "Vous devez entrer un nom et un prénom !"
        })
    }
    try {
        let student = await studentModel.create({
            firstname,
            lastname
        })
        return res.status(200).json(student)
    }catch (error){
        return res.status(500).json({
            "msg": "Il y a eu une erreur: " + erreur
        })
    }
})

//LIRE
router.get('/', async (req, res) => {
    try {
        let student = await classeStudent.find()
        return res.status(200).json(student)
    } catch(error){
        return res.status(500).json({
            msg: error
        })
    }
}),
//LIRE MAIS AVEC UN ID PRECIS
    router.get('/:id', async (req, res) => {
        const {id} = req.params

        try{
            let student = await classeStudent.findById(id)
            return res.status(200).json(student)
        } catch(error){
            return res.status(500).json({
                msg: error
            })
        }
    }),
//SUPPRIMER UN ID
    router.delete('/:id', async (req,res) => {
        const {id} = req.params
        try{
            let student = await classeStudent.findByIdAndRemove(id)
            return res.status(200).json(student)
        } catch(error){
            return res.status(500).json({
                msg: error
            })
        }
    })

//MODIFIER UN NOM DANS UN ID
    router.put('/:id', async (req,res) =>{
        const {id} = req.params
        const {name} = req.body
        try {
            let student = await classeStudent.findByIdAndUpdate(id,
                {
                    name
                },{
                    new: true
                })
            return res.status(200).json({
                student,
                msg: "Classe bien modifiée !"
            })
        }catch (error) {
            return res.status(500).json(error)
        }
    })



module.exports = router