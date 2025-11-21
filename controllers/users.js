export default {
  login(req, res) {
    try {
      console.log(req.body);
      res.json({
        status: 'ok',
        route: 'login'
      })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  profile(req, res) {
    try {
      console.log(req.body);
      res.render('profile', {
        title: "Profile",
        user: {
          name: req.query.userName || 'Valod'
        }
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
