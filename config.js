import dotenv from "dotenv";
dotenv.config({ silent: true });
const { PORT, NODE_ENVIROMMENT, DATABASE } = process.env;

export const port = PORT;
