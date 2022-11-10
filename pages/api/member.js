import mongoose from "mongoose";

// Connect Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then((_) => console.log("Database is Connected"))
  .catch((_) => console.log("Database isn't Connected"));

// Schema of each Team
const teamsSchema = new mongoose.Schema(
  {
    teamName: { type: String, require: true },
    id: { type: String, unique: true, require: true },
    name: {
      ar: String,
      en: String,
    },
    email: String,
    phone: String,
    faculty: String,
    university: String,
    academicYear: Number,
    members: [
      {
        name: {
          ar: String,
          en: String,
        },
        email: String,
        phone: String,
        faculty: String,
        university: String,
        academicYear: Number,
      },
    ],
  },
  { timestamps: true, strict: true }
);
const Team = mongoose.models.team || mongoose.model("team", teamsSchema);

// API Calls
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const teams = await Team.find({});
        const str = req.body.teamName
          .split(" ")
          .map((word) => {
            if (word[0].toUpperCase() !== word[0].toLowerCase()) return word[0];
          })
          .join("")
          .toUpperCase();

        const id = (str.length ? str : "A") + teams.length;
        const teamDoc = await Team.create({
          ...req.body,
          id: id,
        });
        res.json({ id: teamDoc.id, teamName: teamDoc.teamName });
      } catch (err) {
        res.json({ error: err.message });
      }
      break;

    default:
      break;
  }
}
