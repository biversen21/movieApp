<!DOCTYPE html>
<html>
	<head>
		<title>Movie Production App</title>
		<link rel='stylesheet' type='text/css' href='stylesheets/styles.css'>
		<link rel='stylesheet' type='text/css' href='stylesheets/bootstrap.css'>
	</head>
	
	<body>
		<div class='header'>
			<ul class'navbar'>
				<li class='home'>
					<a href='index.php' class='active'>Home</a>
				</li>
				<li class='tasklist'>
					<a href='/html/tasklist.html'>Tasklist</a>
				</li>
				<li class='budget'>
					<a href='/html/budget.html'>Budget</a>
				</li>
				<li class='schedule'>
					<a href='/html/schedule.html'>Schedule</a>
				</li>
				<li class='multimedia'>
					<a href='/html/multimedia.html'>Multimedia</a>
				</li>
			</ul>
		</div>
		
		<div class='container'>
			<h1>Movie Production Application</h1>
		</div>
		
		<div class='separator'>
		</div>
		
		<div class='page'>
			<h3>Inner</h3>
		</div>
		
		<script type='text/template' id='sign-in-template'>
			<div class='loginInputs existing'>
				<form>
					<legend>User Login</legend>
					<label>User Name</label>
					<input type='text' name='userName' />
					<label>Password</label>
					<input type='password' name='password' />
					<hr />
					<button class='btn'>Login</button>
					<hr />
				</form>
			</div>		
			<div class='loginInputs newUser'>
				<form>
					<legend>New User Sign-Up</legend>
					<a href='#/new' class='btn btn-primary' id='newUser'>New User</a>
					<hr />
				</form>
			</div>
		</script>
		
		<script type='text/template' id='welcome-user-template'>
			<h1>Welcome!</h1>
			<a href='#/profile' class='btn btn-primary' id='profileView'>View Profile</a>
		</script>
		
		<script type='text/template' id='profile-view-template'>
			<h1>Profile</h1>
			<a href='#welcome' class='btn btn-primary'>Back</a>
		</script>
				
		<script type='text/template' id='new-user-template'>
			<form class='new-user-form'>
				<label>First Name</label>
				<input type='text' name='firstName' />
				<label>Last Name</label>
				<input type='text' name='lastName' />
				<label>E-Mail Address</label>
				<input type='email' name='email' />
				<label>UserName</label>
				<input type='text' name='userName'>
				<label>Password</label>
				<input type='password' name='password' />
				<label>Confirm Password</label>
				<input type='password' name='confirmPassword' />
				<hr />
				<button type='submit' class='btn btn-primary'>Sign Up</button>
				<button class='btn cancel'>Cancel</button>
				<hr />
			</form>
		</script>
		
	<script src='js/jquery.js'></script>
	<script src='js/underscore.js'></script>
	<script src='js/backbone.js'></script>
	<script src="js/backbone.localStorage.js"></script>
	<script src='js/index.js'></script>
	</body>
</html>