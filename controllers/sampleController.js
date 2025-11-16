export default {
  example: (req, res) => {
    res.json({
      message: "This is an example controller response",
      timestamp: new Date().toISOString(),
    });
  }
};
