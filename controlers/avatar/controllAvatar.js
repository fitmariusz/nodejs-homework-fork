const getAvatar = async (req, res) => {
      const imageP =
        `/avatars/${req.params.name}`;
      console.log(imageP);
      const data = { greeting: imageP };
      console.log(data);
  res.render("showAvatar", data);
};

module.exports = { getAvatar };
