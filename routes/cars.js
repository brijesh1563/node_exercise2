const { Cars } = require('../models/car');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('Could not get the cars');
    const car = await Cars.find().sort('company');
    res.send(car);
});

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = new Car({
        company: req.body.company,
        model: req.body.model,
    });

    await car.save();

    res.send(car);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = await Cars.findByIdAndUpdate(req.body.id, {
        company: req.body.company,
        model: req.body.model,
    },
    { new: true });

    await car.save();

    res.send(car);
});

router.delete('/:id', async (req, res) => {
    const result = await Cars.findOneAndDelete( req.body.id );

    res.send(result);
});

const validateCourse = (name) => {
    const schema = {
        company: Joi.string().required(),
        model: Joi.string().required()
    };

    return Joi.validate(name, schema);
}

module.exports = router;