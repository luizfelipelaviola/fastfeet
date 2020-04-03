import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import OrderDelete from '../jobs/OrderDelete';

class DeliveryProblemController {
  async index(req, res) {
    // Retrieve the page from query params
    const { page = 1 } = req.query;

    // Set items per page
    const perPage = 20;

    // Get row amount
    const amount = await Order.count({
      include: [
        {
          model: DeliveryProblem,
          as: 'problem',
          required: true,
        },
      ],
      distinct: true,
    });

    // Get pages count
    const pages = {
      amount,
      total: Math.floor((amount - 1) / 20 + 1),
    };

    const deliveries = await Order.findAll({
      include: [
        {
          model: DeliveryProblem,
          as: 'problem',
          required: true,
        },
      ],
      offset: (page - 1) * perPage,
      limit: 20,
      order: [['updated_at', 'DESC']],
    });

    return res.json({ deliveries, pages });
  }

  async show(req, res) {
    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });

    return res.json(problems);
  }

  async store(req, res) {
    // Set a schema to be validated
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches for delivery
    const delivery = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Check if delivery exists
    if (!delivery) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Send data from params to body
    req.body.delivery_id = req.params.id;

    // Save data
    const problem = await DeliveryProblem.create(req.body);

    return res.json(problem);
  }

  async delete(req, res) {
    // Searches for problem and delivery item
    const delivery = await DeliveryProblem.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          as: 'delivery',
        },
      ],
    });

    // Check if exists
    if (!delivery) {
      return res.status(400).json({ error: 'Problema não encontrado' });
    }

    // Searches for the order
    const order = await Order.findOne({
      where: {
        id: delivery.delivery.id,
        canceled_at: null,
      },
    });

    // Check if order already cancelled
    if (!order) {
      return res
        .status(400)
        .json({ error: 'Encomenda não existente ou cancelada' });
    }

    // Set cancelled
    order.canceled_at = new Date();

    // Save data
    order.save();

    // Get data from order
    const { id, product, deliveryman_id } = order;

    // Get deliveryman data
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    // Send email
    await Queue.add(OrderDelete.key, {
      id,
      deliveryman,
      product,
    });

    return res.json({ message: 'Encomenda cancelada' });
  }
}

export default new DeliveryProblemController();
