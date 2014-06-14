$(function(){

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'crit': 'criticalPath'
	}
});

var ScheduleTrack = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage("scheduleTrack")
});

var ScheduleList = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("todoItems"),
	sortAttribute: 'schedule',
	sortDirection: 1,
	sortTable: function(attr) {
		this.sortAttribute = attr;
		this.sort();
	},
	comparator: function(a, b) {
		var a = a.get(this.sortAttribute),
				b = b.get(this.sortAttribute);
		if (a == b) return 0;
		if (this.sortDirection == 1) {
			return a > b ? 1 : -1;
		} else {
			return a < b ? 1 : -1;
		}
	}
});

// ****** View Class ******

var ScheduleTrackView = Backbone.View.extend({
	el: '.scheduleDeltas',
	render: function(){
		var html = '<h3>Scheduled Completion: ' + this.model.get('schedule') + '</h3>';
		this.$el.html(html);
	}
});

var ScheduleListView = Backbone.View.extend({
	el: '.scheduleList',
	render: function(){
		scheduleList = new ScheduleList();
		var that = this;
		scheduleList.fetch({
			success: function(todoList){
				var template = _.template($('#schedule-template').html(), {scheduleList: scheduleList.models});
				that.$el.html(template);
			}
		});
	}
});

var CriticalPathView = Backbone.View.extend({
	el: '.scheduleList',
	render: function(){
		criticalList = new ScheduleList();
		var that = this;
		criticalList.fetch({
			success: function(todoList){
				var template = '<h3>Test - Critical Path will go here</h3>';
				that.$el.html(template);
			}
		});
	}
});

// ***** Instances *****

var criticalPathView = new CriticalPathView();
var scheduleListView = new ScheduleListView();
var router = new Router;

// ***** Schedule Track Set *****

var scheduleTrack = new ScheduleTrack({id: 1});
scheduleTrack.fetch();

var scheduleTrackView = new ScheduleTrackView({model: scheduleTrack});
scheduleTrackView.render();

var scheduleEstimate = 0;
$('#scheduleSub').on('click', function(){
	scheduleEstimate = $('#scheduleEst').val();
	scheduleTrack.set({ schedule: scheduleEstimate });
	scheduleTrack.save();
});

// ***** Router Set *****

router.on('route:home', function(){
	scheduleListView.render();
});
router.on('route:criticalPath', function(){
	criticalPathView.render();
});

Backbone.history.start();

});