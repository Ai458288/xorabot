import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "keys.json");

export default function handler(req, res) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  if (req.method === "POST") {
    const { key, user } = req.body;
    data[key] = { user, ip: null };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.json({ success: true });
  }

  if (req.method === "GET") {
    const { key } = req.query;

    if (!data[key]) return res.json({ success: false });

    if (data[key].ip === null) {
      data[key].ip = ip;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return res.json({ success: true, user: data[key].user });
    }

    if (data[key].ip === ip) {
      return res.json({ success: true, user: data[key].user });
    }

    return res.json({ success: false, reason: "ip" });
  }
}
