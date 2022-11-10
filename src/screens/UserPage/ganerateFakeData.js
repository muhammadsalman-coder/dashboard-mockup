import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  activity: sample(["bought", "sold", "deposited", "widthdraw"]),
  asset: sample(["BTC", "ETH", "SOL", "XRP"]),
  strategy: sample(["Strategy 1", "Strategy 2", "Strategy 3"]),
  time: faker.date.recent(),
  name: faker.name.fullName(),
  amount: faker.finance.amount(0, 50),
  buying: faker.finance.amount(0, 100000),
  value: faker.finance.amount(0, 100000),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  returns: sample(["failed", "completed", "pending"]),
  role: sample([
    "Leader",
    "Hr Manager",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Project Manager",
    "Backend Developer",
    "Full Stack Designer",
    "Front End Developer",
    "Full Stack Developer",
  ]),
}));

export default users;
