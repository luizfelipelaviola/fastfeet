import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    // Retrieve the page from query params
    const { page = 1, q = null } = req.query;

    // Set items per page
    const perPage = 20;

    // Get row amount
    const amount = await Recipient.count({
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

    // Searches for recipients
    const recipients = await Recipient.findAll({
      ...(q && {
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        },
      }),
      offset: (page - 1) * perPage,
      limit: 20,
      order: [['updated_at', 'DESC']],
    });

    // Send data
    return res.json({ recipients, pages });
  }

  async show(req, res) {
    // Searches for the recipient
    const recipient = await Recipient.findByPk(req.params.id);

    // If not found, send error message
    if (!recipient)
      return res.status(400).json({ error: 'Destinatário não encontrado' });

    // Send recipient data
    return res.json(recipient);
  }

  async store(req, res) {
    // Set a schema to be validated
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    // Check if schema is correct
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Save data
    const recipient = await Recipient.create(req.body);
    if (!recipient) {
      return res.status(400).json({ error: 'Falha no cadastro' });
    }

    // Return recipient data
    return res.json(recipient);
  }

  async update(req, res) {
    // Set a schema to be validated
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    // Check if schema is correct
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Check if recipient exists
    const selected = await Recipient.findByPk(req.params.id);
    if (!selected) {
      return res.status(403).json({ error: 'Destinatário não encontrado' });
    }

    // Update data
    const update = await selected.update(req.body);
    if (!update) {
      return res.status(400).json({ error: 'Falha na atualização' });
    }

    // Return updated recipient data
    return res.json(update);
  }

  async delete(req, res) {
    // Searches for the recipient
    const recipient = await Recipient.findByPk(req.params.id);

    // If not found, send error message
    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não encontrado' });
    }

    // Try to delete recipient, if fails, send error message
    if (!(await recipient.destroy())) {
      return res.status(500).json({ error: 'Falha ao deletar destinatário' });
    }

    // Send success message
    return res.json({ message: 'Destinatário deletado com sucesso' });
  }
}

export default new RecipientController();
