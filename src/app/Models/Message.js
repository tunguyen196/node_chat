const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    users: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    created_at: Date,
});

module.exports = mongoose.model('Message', Message);