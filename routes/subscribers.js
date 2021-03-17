const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


// routes will be defined below

// getting all subscribers
router.get('/',  async(req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// create one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToService: req.body.subscribedToService
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        // 400 indicates something wrong with the user input, not with the server
        res.status(400).json({ message: error.message })
    }
})

// updating one 
router.patch('/id:', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToService != null) {
        res.subscriber.subscribedToService = req.body.subscribedToService
    }
    try {
        const updatedSubscriber = await res.subscriber.save() 
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// deleting
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message : 'Deleted subscriber successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// create a middleware
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber
    next()
}


module.exports = router