export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Discord code yok");
  }

  const data = new URLSearchParams({
    client_id: process.env.1474366654350757888,
    client_secret: process.env.2ie5zsIiBKp8-MTz5ZufjD-h8M9SOc_n,
    grant_type: "authorization_code",
    code,
    redirect_uri: "https
