import * as Yup from 'yup';
import User from '../models/User';
import Worker from '../models/Worker';
import Owner from '../models/Owner';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      is_owner: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email, is_owner } = await User.create(req.body);

    if (is_owner) {
      await Owner.create({ user_id: id });
    } else {
      await Worker.create({ user_id: id });
    }

    return res.json({
      id,
      name,
      email,
      is_owner,
    });
  }
}
export default new UserController();
