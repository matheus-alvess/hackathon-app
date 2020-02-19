class RatingController {
  async store(req, res) {
    const { id, company_id } = req.user;
    return res.json();
  }
}

export default new RatingController();
