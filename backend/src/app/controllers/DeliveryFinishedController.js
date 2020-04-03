import { Op } from 'sequelize';

import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliveryFinishedController {
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
        end_date: { [Op.not]: null },
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
}

export default new DeliveryFinishedController();
