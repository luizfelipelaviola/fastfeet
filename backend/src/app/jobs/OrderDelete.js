import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'OrderDelete';
  }

  async handle({ data }) {
    const { name, email } = data.deliveryman;
    const { product, id } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Encomenda Deletada',
      template: 'orderDelete',
      context: {
        id,
        name,
        product,
      },
    });
  }
}

export default new CancellationMail();
