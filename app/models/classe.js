const mongoose = require('mongoose');


const classesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Classe', classesSchema)