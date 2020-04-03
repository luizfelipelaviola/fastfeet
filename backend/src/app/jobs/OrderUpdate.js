import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'OrderUpdate';
  }

  async handle({ data }) {
    const { name, email } = data.deliveryman;
    const {
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zipcode,
    } = data.recipient;
    const { product, id } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Encomenda Atualizada',
      template: 'orderUpdate',
      context: {
        id,
        name,
        product,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        zipcode,
      },
    });
  }
}

export default new CancellationMail();
