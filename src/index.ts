import express from "express";

const app = express();

//Routes
// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

//Public directory
app.use(express.static('public'));





app.listen(3000, () => {
  console.log("Server on port 3000");
});
