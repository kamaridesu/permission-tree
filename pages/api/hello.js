export default hi = async (req, res) => {
  res.status(200).json({ name: 'Hello, world!' });
};
