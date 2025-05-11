const express = require('express');
const Bug = require('../model/Bug');

const bugRouter = express.Router();

bugRouter.get('/', async(req, res) => {
    try {
        const bugs = await Bug.find();
        if(bugs.length === 0)
            return res.status(200).json({message: 'No bugs to show!'});
        res.status(200).json({message: 'Bugs found', success: true, data: bugs});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

bugRouter.post('/', async(req, res) => {
    try {
        const bug = new Bug(req.body);
        await bug.save();        
        res.status(201).json({message: 'Bug reported!', success: true, data: bug});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

bugRouter.get('/:id', async(req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);
        if(!bug)
            return res.status(404).json({success: false, message: 'No bug found!'});
        res.status(200).json({success: true, data: bug});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

bugRouter.patch('/:id', async(req, res) => {
    try {
        const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedBug)
            return res.status(400).json({success: false, message: 'Bug not fixed!'});
        res.status(200).json({success: true, data: updatedBug});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

bugRouter.delete('/:id', async(req, res) => {
    try {
        const deletedBug = await Bug.findByIdAndDelete(req.params.id);
        if(!deletedBug)
            return res.status(400).json({success: false, message: 'Bug not deleted!'});
        res.status(200).json({success: true, message: 'Bug deleted!'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = bugRouter;