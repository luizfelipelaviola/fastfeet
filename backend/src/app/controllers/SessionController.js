import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: {
        id,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Código inválido' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    // Set a data schema to be validated
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Get email and password from request body
    const { email, password } = req.body;

    // Searches for the user in database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ error: 'E-mail não corresponde a uma conta' });
    }

    // Check if password is correct
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Get the id and name from the database search result
    const { id, provider } = user;

    // Check if is admin
    if (provider) {
      return res.status(401).json({
        error: 'Somente administradores possuem acesso ao FastFeet web',
      });
    }

    // Create the session key and send data
    return res.json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
