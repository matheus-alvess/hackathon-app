import Worker from '../models/Worker';

class DisplayController {
  async index(req, res) {
    // const { company_id } = req.user;
    const page = Number(req.query.page);

    const workers = await Worker.findAll({
      where: {
        // company_id,
      },
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(workers);
  }
}

export default new DisplayController();
