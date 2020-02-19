import * as Yup from 'yup';
import Company from '../models/Company';
import Goal from '../models/Goal';
import GoalsWorkers from '../models/GoalsWorkers';

class GoalController {
  async index(req, res) {
    const goals = await GoalsWorkers.findAll({
      include: [
        {
          model: Goal,
          as: 'goalsworkers',
          where: {
            owner_id: req.user.ownerId,
            status: 'open',
          },
        },
      ],
    });

    return res.json(goals);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      deadline_at: Yup.string().required(),
      checklist: Yup.string().required(),
      team: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { ownerId } = req.user;

    const { id: company_id } = await Company.findOne({
      where: {
        owner_id: ownerId,
      },
      attributes: ['id'],
    });

    const { name, description, deadline_at, checklist, team } = req.body;

    const goalInserted = await Goal.create({
      owner_id: ownerId,
      company_id,
      name,
      description,
      status: 'open',
      checklist,
      deadline_at,
    });

    team.forEach(async worker_id => {
      await GoalsWorkers.create({
        worker_id,
        goal_id: goalInserted.id,
      });
    });

    return res.json(goalInserted);
  }
}
export default new GoalController();
