require("dotenv").config();
const express = require("express");
const app = express();

const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;
const PASSWORD = process.env.PASSWORD;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	console.log("HELLO!!!!!!!")
	res.sendFile(__dirname + "/public/index.html");
});

app.post('/', (req, res) => {
	console.log(req.body);

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "workhemstreet@gmail.com",
			pass: PASSWORD,
		}
	});

	const mailOptions = {
		from: req.body.email,
		to: "workhemstreet@gmail.com",
		subject: `PORTFOLIO VIEW FROM ${req.body.email}: ${req.body.subject}`,
		text: req.body.message,
	}

	console.log(mailOptions);

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error);
			res.send("error");
		}
		else {
			console.log("EMAIL SENT: " + info.response);
			res.send("success");
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});