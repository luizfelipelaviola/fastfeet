import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  // Set a data schema to be validated
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Searches the email in the database
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email already registered, send error message
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com este e-mail' });
    }

    // Register data in database and retrieve some elements
    const { id, name, email, provider } = await User.create(req.body);

    // Return new user data
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // Set a data schema to be validated
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Validates the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    // Get data from the request body
    const { email, oldPassword } = req.body;

    // Searches user id from database
    const user = await User.findByPk(req.userId);

    // Check if user is changing his email
    if (email && email !== user.email) {
      // Searches the new email in database
      const userExists = await User.findOne({ where: { email } });

      // If the new email is already registered, send error message
      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este e-mail' });
      }
    }

    // Check if user is changing his password and if true, check if both password matches
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Update data
    const { id, name, provider } = await user.update(req.body);

    // Return updated data
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
