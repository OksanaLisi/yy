const { Schema, model } = require('mongoose');

const schema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    completed: { type: Boolean, default: false }, // Set default value for completed as false
    important: { type: Boolean, default: false }  // Set default value for important as false
});

module.exports = model('Todo', schema);