import { config } from "dotenv";

config();

export default {
    secret: process.env.SECRET,
    email: process.env.EMAil,
    email_pass: process.env.EMAIL_PASS
};