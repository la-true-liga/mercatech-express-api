import { config } from "dotenv";

config();

export default {
    secret: process.env["SECRET"],
    email: process.env["EMAIL"],
    email_pass: process.env["EMAIL_PASS"],
    database_url: process.env["DATABASE_URL"]
};