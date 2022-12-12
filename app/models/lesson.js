const { default: mongoose } = require('mongoose');
const mongoosse = require('mongoose');

const lessonSchema = new mongoosse.Schema({
    label:{
        type: String,
        required: [true, 'Entrez un label'],
    },
    startDate:{
        type: Date,
        require: [true, "Entrez une date de début"],
    },
    endDate:{
        type: Date,
        require: [true, "Entrez une date de fin"],
    },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);