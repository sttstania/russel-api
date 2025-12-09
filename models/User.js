const express = require('express');
const  moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters long'],
        trim: true,
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        },
        lowercase: true,
        trim: true
    },
    passwordHash:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, { timestamps: true });  // Automatically manage createdAt and updatedAt fields

// Unique index on email
userSchema.index({ email: 1 }, { unique: true });




module.exports = moongoose.model('User', userSchema);