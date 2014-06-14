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
	el: 'page',
	render: function(){
		var template = _.template($('#sign-in-template').html());//, {userProfile: userProfile.models});
		this.$el.html('<h3>Test</h3>');
		console.log(template);
	}
})

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

var homeView = new HomeView();
var userView = new UserView();
var router = new Router;
	
router.on('route:home', function(){
	homeView.render();
	console.log('test');
});
router.on('route:editProfile', function() {
	userView.render();
});

Backbone.history.start();
});