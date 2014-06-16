$(function() {
	
	//Helper function to serialize data	
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

var Router = Backbone.Router.extend ({
	routes: {
		'': 'home',
		'new': 'editProfile',
		'welcome': 'welcomeUser'
	}
}); 

var UserProfile = Backbone.Model.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

var UserList = Backbone.Collection.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

//****** View Class ******

var HomeView = Backbone.View.extend ({
	el: '.page',
	render: function(){
		var template = _.template($('#sign-in-template').html());
		this.$el.html(template);
	}
});

var NewUserView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template = _.template($('#new-user-template').html());
		this.$el.html(template);
	},
	events: {
		'submit .new-user-form': 'saveUser',
		'click .cancel': 'cancelUser'
	},
	cancelUser: function(){
		router.navigate('', {trigger: true});
	},
	saveUser: function(ev){
		var userDetails = $(ev.currentTarget).serializeObject();
		var userProfile = new UserProfile();
		userProfile.save(userDetails, {
			success: function(userProfile){
				router.navigate('welcome', {trigger: true});
			}
		});
		return false;
	}
});

var WelcomeView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var template = _.template($('#welcome-user-template').html());
		this.$el.html(template);
	}
});

//****** Instances ******

var welcomeView = new WelcomeView();
var newUserView = new NewUserView();
var homeView = new HomeView();

//****** Router setup ******

var router = new Router;
	
router.on('route:home', function(){
	homeView.render();
});
router.on('route:editProfile', function(){
	newUserView.render();
});
router.on('route:welcomeUser', function(){
	welcomeView.render();
});

Backbone.history.start();
});