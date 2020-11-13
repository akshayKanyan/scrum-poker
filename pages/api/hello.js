// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  let arr = { ravish: {}, akshay: {} };
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
