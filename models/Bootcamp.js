const mongoose = require('mongoose');


// match: we can only put relavent data thats match regex
// trim : remove blank spaces
// slug: create user-friendly link for user using name 
// enum: only put data from the array, enum: ['2233', '233', '3344']

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is must'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name must not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Description is must'],
        maxlength: [500, 'Description must not be more than 500 characters']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Points
        type: {
            type: String,
            enum: ['points'] // emun : only available values
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    
    careers: {
        type: [String],
        require: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
          ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Minimum rating should be 1'],
        max: [10, 'Maximum rating should not more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('bootcamp', bootcampSchema);