$(function() {

var Router = Backbone.Router.extend ({
	'': 'home',
	'new': 'editProfile'
}); 

var UserProfile = Backbone.Model.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

var UserList = Backbone.Collection.extend ({
	localStorage: new Backbone.LocalStorage('users')
});

var NewUserView = Backbone.View.extend ({
	render: function({
	
	})
});

var router = new Router;
	
router.on('route:home', function(){
	
};
router.on('route:editProfile', function() {
	
};

Backbone.history.start();
}