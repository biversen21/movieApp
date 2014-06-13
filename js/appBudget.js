$(function() {
	
var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

var BudgetTrack = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage("budgetTrack"),
});
	
var BudgetList = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("todoItems")
});

// ****** View Class ******

var BudgetTrackView = Backbone.View.extend({
	el: '.budgetDeltas',
	render: function(){
		Backbone.Validation.bind(this);
		var html = '<h4>Total Estimate: $' + this.model.get('budget') + '</h4><h5>Remaining Projected Budget: $' + 
		(this.model.get('budget')-totalProjected) +'</h5><h5>Remaining Actual Budget: $' + 
		(this.model.get('budget')-totalActual) +'</h5';
		this.$el.html(html);
	}
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
				var totalRow = "<tr id='totalRow'><td>" + "</td><td>" + "</td><td>Budgeted: $" + totalProjected + "</td><td>Actual: $" + 
					totalActual + "</td><td>Delta: $" + totalDelta + "</td></tr>";
				$('table', this.el).append(totalRow);
				return this;
			}
		});
	}
});

// ****** Iterator *****

var totalActual = 0;
var totalDelta = 0;
var totalProjected = 0;

var budgetLister = new BudgetList();
budgetLister.fetch({
	success: function(){
		_.each(budgetLister.toJSON(), function(budgetItem){
			totalProjected += parseInt(budgetItem['budget']);
			totalActual += parseInt(budgetItem['actualSpend']);
			totalDelta += (parseInt(budgetItem['actualSpend']) == 0 ? 0 : (parseInt(budgetItem['actualSpend']) - parseInt(budgetItem['budget'])));
		});
	}
});
// ***** Instances *****
	
var budgetListView = new BudgetListView();
var router = new Router;

// ***** Budget set ***** 

var budgetTrack = new BudgetTrack({id: 1});
budgetTrack.fetch({
	success: function(){
		console.log(budgetTrack.get('budget'));
	}
});

var budgetTrackView = new BudgetTrackView({model: budgetTrack});
budgetTrackView.render();

var budgetEstimate = 0;
$('#budgetSub').on('click', function(){	
	budgetEstimate = $('#budgetEst').val();
	budgetTrack.set({ budget: budgetEstimate });
	budgetTrack.save();
});

// ***** Router set *****
router.on('route:home', function (){
	budgetListView.render();
});
	
Backbone.history.start();

});