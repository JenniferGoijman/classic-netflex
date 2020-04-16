const {
    Order
} = require('../models/index.js');

const OrderController = {
    getAll(req, res) {
        Order.findAll()
            .then(orders => res.send(orders))
    },
    getByUser(req, res) {
        Order.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            .then(orders => res.send(orders))
    },
    insert(req, res) {
        Order.create({
                date: req.body.date,
                status: req.body.status,
                UserId: req.user.id,
                movieId: req.body.movieId,
                days: req.body.days,
                amount: req.body.amount,
                estimatedDeliveryDay: req.body.estimatedDeliveryDay
            })
            .then(order => res.send(order) );
    }
}

module.exports = OrderController;