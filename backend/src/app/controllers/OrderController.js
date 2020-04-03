import * as Yup from 'yup';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

import Queue from '../../lib/Queue';
import OrderCreate from '../jobs/OrderCreate';
import OrderUpdate from '../jobs/OrderUpdate';
import OrderDelete from '../jobs/OrderDelete';

class OrderController {
  async index(req, res) {
    // Retrieve the page from query params
    const { page = 1, q = null, p = false } = req.query;

    // Set items per page
    const perPage = 20;

    // Get row amount
    const amount = await Order.count({
      ...(q && {
        where: {
          product: {
            [Op.iLike]: `%${q}%`,
          },
        },
      }),
    });

    // Get pages count
    const pages = {
      amount,
      total: Math.floor((amount - 1) / 20 + 1),
    };

    // Searches recipients in database
    const orders = await Order.findAll({
      ...(q && {
        where: {
          product: {
            [Op.iLike]: `%${q}%`,
          },
        },
      }),
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
        ...(p
          ? [
              {
                model: DeliveryProblem,
                as: 'problem',
                required: true,
              },
            ]
          : []),
      ],
      offset: (page - 1) * perPage,
      limit: 20,
      order: [['updated_at', 'DESC']],
    });

    // Send data
    return res.json({
      orders,
      pages,
    });
  }

  async show(req, res) {
    // Searches for the recipient
    const order = await Order.findByPk(req.params.id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });

    // If not found, send error message
    if (!order)
      return res.status(400).json({ error: 'Encomenda não encontrada' });

    // Send recipient data
    return res.json(order);
  }

  async store(req, res) {
    // Set a data schema to be validated
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches for recipient_id
    const recipient = await Recipient.findByPk(req.body.recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado' });
    }

    // Searches for deliveryman_id
    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Protect from invalid data
    req.body.canceled_at = null;
    req.body.start_date = null;
    req.body.end_date = null;

    // Save data
    const { id, recipient_id, deliveryman_id, product } = await Order.create(
      req.body
    );

    // Send email
    await Queue.add(OrderCreate.key, {
      id,
      deliveryman,
      recipient,
      product: req.body.product,
    });

    // Send data
    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async update(req, res) {
    // Searches for the order
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Check if order exists
    if (!order) {
      return res.status(400).json({ error: 'Encomenda não encontrada' });
    }

    // Check if order is terminated
    if (
      order.canceled_at ||
      order.start_date ||
      order.end_date ||
      order.signature_id
    ) {
      return res.status(400).json({
        error:
          'Esta encomenda foi entregue ou está em processo de entrega e não pode ser alterada',
      });
    }

    // Set a data schema to be validated
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches for recipient_id
    const recipient = await Recipient.findByPk(req.body.recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado' });
    }

    // Searches for deliveryman_id
    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Prevent from invalid data
    req.body.deliveryman_id = order.deliveryman_id;

    // Save data
    const { id, recipient_id, deliveryman_id, product } = await order.update(
      req.body
    );

    // Send email
    await Queue.add(OrderUpdate.key, {
      id,
      deliveryman,
      recipient,
      product: req.body.product,
    });

    // Send data
    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async delete(req, res) {
    // Searches for the order
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Check if order exists
    if (!order) {
      return res.status(400).json({ error: 'Encomenda não encontrada' });
    }

    // Check if order is terminated
    if (
      order.canceled_at ||
      order.start_date ||
      order.end_date ||
      order.signature_id
    ) {
      return res.status(400).json({
        error:
          'Esta encomenda foi entregue ou está em processo de entrega e não pode ser deletada',
      });
    }

    // Save data
    if (!(await order.destroy())) {
      return res.status(500).json({ error: 'Falha ao deletar encomenda' });
    }

    // Get data from order
    const { id, deliveryman, product } = order;

    // Send email
    await Queue.add(OrderDelete.key, {
      id,
      deliveryman,
      product,
    });

    // Send data
    return res.json({ message: 'Encomenda deletada com sucesso' });
  }
}

export default new OrderController();
