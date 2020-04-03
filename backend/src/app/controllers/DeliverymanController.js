import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    // Retrieve the page from query params
    const { page = 1, q = null } = req.query;

    // Set items per page
    const perPage = 20;

    // Get row amount
    const amount = await Deliveryman.count({
      ...(q && {
        where: {
          name: {
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

    // Searches deliverymans in database
    const deliverymans = await Deliveryman.findAll({
      ...(q && {
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        },
      }),
      attributes: ['id', 'name', 'email', 'avatar_id', 'updated_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      offset: (page - 1) * perPage,
      limit: 20,
      order: [['updated_at', 'DESC']],
    });

    // Send data
    return res.json({ deliverymans, pages });
  }

  async show(req, res) {
    // Searches for the deliveryman
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    // If not found, send error message
    if (!deliveryman)
      return res.status(400).json({ error: 'Entregador não encontrado' });

    // Send deliveryman data
    return res.json(deliveryman);
  }

  async store(req, res) {
    // Set a data schema to be validated
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches the email in the database
    const deliverymanExists = await Deliveryman.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email already registered, send error message
    if (deliverymanExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um entregador com este e-mail' });
    }

    // Register data in database and retrieve some elements
    const { id, name, email } = await Deliveryman.create(req.body);

    // Return new deliveryman data
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    // Set a data schema to be validated
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches the email in the database
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    // Send error if deliveryman not exists
    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Check if the email was changed, if true, check if already registered
    if (req.body.email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (deliverymanExists) {
        return res.status(403).json({
          error: 'Já existe um entregador com este e-mail registrado',
        });
      }
    }

    // Update data and retrieve some elements
    const { id, name, email } = await deliveryman.update(req.body);

    // Return deliveryman data
    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    // Searches the email in the database
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    // Send error if deliveryman not exists
    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Try to delete deliveryman, if fails, send error message
    if (!deliveryman.destroy()) {
      return res.status(500).json({ error: 'Falha ao deletar entregador' });
    }

    return res.json({ message: 'Entregador deletado com sucesso' });
  }
}

export default new DeliverymanController();
