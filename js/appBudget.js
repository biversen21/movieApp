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
	localStorage: new Backbone.LocalStorage("todoItems"),
	sortAttribute: 'taskID',
	sortDirection: 1,
	sortTable: function(attr) {
		this.sortAttribute = attr;
		this.sort();
	},
	comparator: function(a, b) {
		var a = parseInt(a.get(this.sortAttribute)),
				b = parseInt(b.get(this.sortAttribute));
		if (a == b) return 0;
		if (this.sortDirection == 1) {
			return a > b ? 1 : -1;
		} else {
			return a < b ? 1 : -1;
		}
	}
});

// ****** View Class ******

var BudgetTrackView = Backbone.View.extend({
	el: '.budgetDeltas',
	render: function(){
		var html = '<h4>Total Estimate: $' + this.model.get('budget') + '</h4><h5>Remaining Projected Budget: $' + 
			(this.model.get('budget')-totalProjected) + '</h5><h5>Remaining Actual Budget: $' + 
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
				var totalRow = "<tr id='totalRow'><td>" + "</td><td>" + "</td><td>Budgeted: $" + totalProjected + 
					"</td><td>Actual: $" + totalActual + "</td><td class='delta'>Delta: $" + totalDelta + "</td></tr>";
				$('table', this.el).append(totalRow);
				return this;
			}
		});
	}
});

var BudgetEstimator = Backbone.View.extend({
	el: '.estimate',
	render: function(){
		budgetTrack = new BudgetTrack({id:1});
		var that = this;
		budgetTrack.fetch({
			success: function(){
				var template = _.template($('#budget-estimate-template').html());
				that.$el.html(template);
			}
		});
	},
	events: {
		'click #budgetSub': 'saveEstimate'
	},
	saveEstimate: function(){
		var budgetEstimate = $('#budgetEst').val();
		budgetTrack.set({budget: budgetEstimate});
		budgetTrack.save();
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
			totalDelta += (parseInt(budgetItem['budgetDelta'] == 0 ? 0 : parseInt(budgetItem['budgetDelta'])));
		});
	}
});

// ***** Instances *****

var budgetEstimator = new BudgetEstimator();
var budgetListView = new BudgetListView();
var router = new Router;

var budgetTrack = new BudgetTrack({id: 1});
budgetTrack.fetch({});

var budgetTrackView = new BudgetTrackView({model: budgetTrack});


// ***** Router set *****

router.on('route:home', function (){
	budgetEstimator.render();
	budgetTrackView.render();
	budgetListView.render();
});
	
Backbone.history.start();

});