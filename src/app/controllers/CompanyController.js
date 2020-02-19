import * as Yup from 'yup';
import Company from '../models/Company';
import Owner from '../models/Owner';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      occupation: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const companyExists = await Company.findOne({
      where: {
        description: req.body.description,
      },
    });

    if (companyExists) {
      return res.status(400).json({ error: 'Company already exists.' });
    }

    const { id: owner_id } = await Owner.findOne({
      where: {
        user_id: req.user.id,
      },
      attributes: ['id'],
    });

    const { id, description, occupation, created_at } = await Company.create({
      ...req.body,
      owner_id,
    });

    return res.json({
      id,
      owner_id,
      description,
      occupation,
      created_at,
    });
  }
}

export default new CompanyController();
