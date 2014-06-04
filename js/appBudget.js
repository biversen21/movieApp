$(function() {
	
var budgetEstimate = 0;
$('#budgetSub').on('click', function(){
	budgetEstimate = $('#budgetEst').val();
	console.log(budgetEstimate);
});
	
var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});
	
var BudgetList = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("todoItems")
});
	
var BudgetListView = Backbone.View.extend({
	el: '.budgetList',
	render: function(){
		var budgetList = new BudgetList();
		var that = this;
		budgetList.fetch({
			success: function(todoList){
				var template = _.template($('#production-budget-template').html(), {budgetList: budgetList.models});
				that.$el.html(template);
			}
		});
	}
});
	
var budgetListView = new BudgetListView();
	
var router = new Router;
	
router.on('route:home', function (){
	budgetListView.render();
});
	
Backbone.history.start();

});