const express = require('express');
const lessonModel = require('../models/lesson');
const { request, response } = require('express');

let router = express.Router();


router.post('/', async (request, response) => {
    const {label, startDate, endDate, classeId} = request.body;

    if (typeof startDate === 'undefined' || typeof endDate === 'undefined') {
        return response.status(500).json({
            "msg": "Vous devez entrer une date"
        })
    }

    try {
        let lesson = await lessonModel.create({
            label,
            startDate : Date.parse(startDate),
            endDate : Date.parse(endDate),
            classeId
        });

        return response.status(200).json(lesson);
    } catch (error) {
        return response.status(500).json({
            "msg": "il y a eu une erreur: " + error
        });
    }

});

router.post('/add-classe', async (request, response) => {
    const {lessonId, classeId} = request.body;


    try {
        const lesson = await lessonModel.findOneAndUpdate({
            _id: lessonId
        }, {
            $addToSet: {
                classe: [classeId]
            }
        }, {
            new: true

        }).populate('classe')

        return response.status(200).json(lesson);
    } catch (error) {
        return response.status(500).json(error)
    }
});

router.delete('/:id', async (request,response) => {
    const {id} = request.params;

    try {
        await lessonModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "Cours bien supprimée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }
})

router.put('/:id', async (request,response) =>{
    const {id} = request.params;
    const {startDate, endDate, classeId} = request.body;

    try {
        await lessonModel.findByIdAndUpdate(id,
            {
                startDate, endDate, classeId
            },{
                new: true
            })
        return response.status(200).json({
            msg: "Cours bien modifiée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }

})

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let lesson = await lessonModel.findById(id)
        return response.status(200).json(lesson)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.get('/', async (request, response) => {
    try {
        let lesson = await lessonModel.find()
        return response.status(200).json(lesson)
    } catch (error) {
        return response.status(500).json(error)
    }
})


module.exports = router;