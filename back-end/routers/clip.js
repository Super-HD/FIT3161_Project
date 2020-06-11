/*
Created by Cheng Zeng
Updated on 11/06/2020
In this file, operations of the Clip collection are implemented.
*/

const Clip = require('../models/MotionClip');
const mongoose = require('mongoose');

module.exports = {
    /**
     * Retrieve all clip documents from the Clip collection
     * The 'camera' is populated from its ID to its document
     * The 'cameraClient' is populated from its ID to its document
     * @param {*} req The HTTP request
     * @param {*} res The HTTP respond, it will either contain an error statement or an array of clip json object
     */
    getAll: (req, res) => Clip.find().populate({
        path: 'camera',
        populate: {
            path: 'cameraClient',
            model: 'Client'
        }
    }).exec((err, clips) => {
        if (err) res.status(400).json(err);
        res.json(clips);
    }),

    // A function that creates a new document and save it in Clip collection
    /**
     * Create a new Clip document
     * @param {*} req The HTTP request, it contains a clip json object
     * @param {*} res The HTTP respond, it will contain either an error statement or the result 
     */
    createOne: (req, res) => {
        let newClipDetails = req.body;
        newClipDetails._id = new mongoose.Types.ObjectId();
        Clip.create(newClipDetails, (err, clip) => {
            if (err) res.status(400).json(err);
            res.json(clip);
        });
    },

    /**
     * Search for a Clip document
     * @param {*} req The HTTP request, it contains a parameter which is a clip ID
     * @param {*} res The HTTP respond, it will contain either an error statement or a clip json object 
     */
    getOne: (req, res) => Clip.findOne({ _id: req.params.id }, (err, clip) => {
        if (err) res.status(400).json(err);
        if (!clip) return res.status(400).json();
        res.json(clip);
    }),

    /**
     * Find a Clip document and update its content
     * @param {*} req The HTTP request, it contains a parameter which is a clip ID, and a clip json object
     * @param {*} res The HTTP respond, it will contain either an error statement or a clip json object 
     */
    updateOne: (req, res) => Clip.findOneAndUpdate({ _id: req.params.id }, req.body, (err, clip) => {
        if (err) res.status(400).json(err);
        if (!clip) return res.status(400).json();
        res.json(clip);
    }),

    /**
     * Delete a Clip document
     * @param {*} req The HTTP request, it contains a parameter which is a clip ID
     * @param {*} res The HTTP respond, it will contain either an error statement or nothing
     */
    deleteOne: (req, res) => Clip.findOneAndRemove({_id: req.params.id}, (err) => {
        if (err) res.status(400).json(err);
        res.json();
    })
};