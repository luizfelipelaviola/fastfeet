import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  isBefore,
} from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(req, res) {
    // Retrieve the page from query params
    const { page = 1 } = req.query;

    // Set items per page
    const perPage = 20;

    // Searches deliveries in database
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
        signature_id: null,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['city'],
        },
      ],
      offset: (page - 1) * perPage,
      limit: 20,
      order: [['updated_at', 'DESC']],
    });

    // Send data
    return res.json(orders);
  }

  async show(req, res) {
    // Searches delivery in database
    const order = await Order.findOne({
      where: {
        id: req.params.deliveryid,
        deliveryman_id: req.params.id,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    // Send error if delivery not found
    if (!order) {
      return res.status(400).json({ error: 'Encomenda não encontrada' });
    }

    // Send data
    return res.json(order);
  }

  async update(req, res) {
    // Set date to current time
    const date = new Date();

    // Start delivery
    if (req.body.start) {
      // Searches for deliveryman
      const deliveryman = await Deliveryman.findOne({
        where: {
          id: req.params.id,
        },
      });

      // Check if deliveryman exists
      if (!deliveryman) {
        return res.status(400).json({ error: 'Entregador não encontrado' });
      }

      // Searches for delivery
      const delivery = await Order.findOne({
        where: {
          id: req.params.deliveryid,
          deliveryman_id: req.params.id,
        },
      });

      // Check if delivery exists
      if (!delivery) {
        return res.status(400).json({ error: 'Encomenda não encontrada' });
      }

      // Check if delivery is cancelled, already started or finished
      if (delivery.canceled_at !== null) {
        return res.status(403).json({ error: 'Encomenda cancelada' });
      }
      if (delivery.end_date !== null) {
        return res.status(403).json({ error: 'Encomenda finalizada' });
      }
      if (delivery.start_date !== null) {
        return res.status(403).json({ error: 'Encomenda já foi retirada' });
      }

      // Check if date is between 08:00 AM and 06:00 PM
      const startHour = setSeconds(setMinutes(setHours(date, 8), 0), 0);
      const endHour = setSeconds(setMinutes(setHours(date, 18), 0), 0);
      if (!(isAfter(date, startHour) && isBefore(date, endHour))) {
        return res
          .status(403)
          .json({ error: 'Você só pode realizar retiradas entre 08h e 18h' });
      }

      // Check if delivery man reaches day limit
      const limit = Order.count({
        where: {
          deliveryman_id: req.params.id,
          start_date: {
            [Op.between]: [startOfDay(date), endOfDay(date)],
          },
        },
      });

      // If he reaches the limit, send error message
      if (limit > 5) {
        return res.status(403).json({
          error: 'Você pode fazer no máximo 5 retiradas por dia',
        });
      }

      // Set start date to current time
      delivery.start_date = new Date();

      // Save data
      delivery.save();

      return res.json(delivery);
    }
    if (req.body.end) {
      // Searches for deliveryman
      const deliveryman = await Deliveryman.findOne({
        where: {
          id: req.params.id,
        },
      });

      // Check if deliveryman exists
      if (!deliveryman) {
        return res.status(400).json({ error: 'Entregador não encontrado' });
      }

      // Searches for delivery
      const delivery = await Order.findOne({
        where: {
          id: req.params.deliveryid,
          deliveryman_id: req.params.id,
        },
      });

      // Check if delivery exists
      if (!delivery) {
        return res.status(400).json({ error: 'Encomenda não encontrada' });
      }

      // Check if delivery is cancelled, already started or finished
      if (delivery.canceled_at !== null) {
        return res.status(403).json({ error: 'Encomenda cancelada' });
      }
      if (delivery.end_date !== null) {
        return res.status(403).json({ error: 'Encomenda já finalizada' });
      }

      // Set end date to current time
      delivery.end_date = new Date();
      delivery.signature_id = req.body.signature_id;

      // Save data
      delivery.save();

      return res.json(delivery);
    }

    return res.status(400).json({ error: 'Requisição inválida' });
  }
}

export default new DeliveryController();
