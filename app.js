var express = require('express'); //This Express module is a framework used when creating websites or web apps with JavaScript and Node.js
var path = require('path'); //The Path module is what enables Node.js to find the directories for the website's files
var bodyParser = require('body-parser'); //The Body-Parser module handles POST requests, so this would apply to when a user sends an email
var nodemailer = require('nodemailer'); //The Nodemailer module is what allows a user to send messages via email


var app = express(); 


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //Express is accessing the Bootstrap stylesheet, under the 'public' folder

//When a user enters the website this is the page, they'll be directed to the index.jade, or home page
app.get('/', function(req, res){
	res.render('index',{title: 'Computer Not Working?'});
});

//When a user clicks on 'about', 'contact', etc., they'll "get" access to a jade file, or a view, as a response
app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.get('/virus-removal', function(req, res){
	res.render('virus-removal');
});

app.get('/hardware-issues', function(req, res){
	res.render('hardware-issues');
});

app.get('/software-issues', function(req, res){
	res.render('software-issues');
});

//This email address receives the message that the user sends

//PLEASE ENTER YOUR OWN EMAIL ADDRESS AND PASSWORD
app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail', /*Other examples of services include 'AOL', 'Outlook365', 'iCloud', 'Hotmail', 'Yahoo'.
		The service property specifies the SMTP connection used when sending a message on the website.*/
		auth: {
			user: ,
			pass: ''
		}
	});

	//A confirmation message is sent to this email address when the server receives the message.
	var mailOptions = {
		from: ' <>', //Enter your name. Also, enter the email address, as specified in the above app.post function!
		to: '', //Enter another email address for the confirmation email to be sent to!
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	//If the message is sent properly an error message will appear in the console, otherwise it's sent successfully
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

/*In order for the messaging feature to work properly on the Chrome browser, you may need to go into your Google account
and turn on "Access less secure apps" */

//Localhost:3000 is the server that the website is running on
app.listen(3000);
console.log('Server is running on port 3000...');