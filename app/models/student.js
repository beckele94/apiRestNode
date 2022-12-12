const { default: mongoose } = require('mongoose');
const mongoosse = require('mongoose');

const studentSchema = new mongoosse.Schema({
    email:{
        type: String,
        required: [true, 'Entrez un email'],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Entrez un password'],
        trim: true
    },
    firstname:{
        type: String,
        required: [true, 'Entrez un prénom'],
        trim: true
    },
    lastname:{
        type: String,
        required: [true, 'Entrez un nom'],
        trim: true
    },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model('Student', studentSchema);