$(function() {

var Router = Backbone.Router.extend ({
	routes: {
		'': 'home',
		'new': 'editProfile'
	}
}); 

var UserProfile = Backbone.Model.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

var UserList = Backbone.Collection.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

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
	}
});

var UserView = Backbone.View.extend ({
	render: function(){
		var that = this; 
		userProfile = new UserProfile();
		userProfile.fetch({
			success: function(){
				console.log('Test');
			}
		})
	}
});

var newUserView = new NewUserView();
var homeView = new HomeView();
var userView = new UserView();
var router = new Router;
	
router.on('route:home', function(){
	homeView.render();
});
router.on('route:editProfile', function(){
	newUserView.render();
});

Backbone.history.start();
});