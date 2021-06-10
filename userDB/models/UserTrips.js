const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema ({
    email: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true},
    publishDate: { type: Date, required: true},
    distance: {type: Number, required: true},
    allMarkers: { type: [Array], required: true}
})

const Trip = mongoose.model('Trip', TripSchema, 'tripInfo');

module.exports = Trip;