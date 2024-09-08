const http = require("http");
setInterval(function() {
    http.get("http://harrisonhemstreet.herokuapp.com");
}, 300000); // every 5 minutes (300000)

const contactForm = document.querySelector(".contact-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

contactForm.addEventListener("submit", e => {
	e.preventDefault();

	let formData = {
		name: name.value,
		email: email.value,
		subject: subject.value,
		message: message.value
	}
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function(){
		console.log(xhr.responseText, xhr);
		if(xhr.responseText === "success") {
			alert("EMAIL SENT");
			name.value = "";
			email.value = "";
			subject.value = "";
			message.value = "";
		}
		else {
			console.log(formData);
			console.log(xhr.responseText);
			alert("SOMETHING WENT WRONG!");
		}
	}

	xhr.send(JSON.stringify(formData));
});

