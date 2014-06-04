$(function() {
	
var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'new': 'editUser' 
	}
});

var TodoItem = Backbone.Model.extend({
	defaults: {
		description: 'Empty todo...',
		statusCheck: 'incomplete'
	},
	toggleStatus: function(){
		if(this.get('statusCheck') === 'incomplete'){
			this.set({'statusCheck': 'complete'});
		} else {
			this.set({'statusCheck': 'incomplete'});
		}
		this.save();
	}
});

var TodoList = Backbone.Collection.extend({
	model: TodoItem,
	localStorage: new Backbone.LocalStorage("todoItems"),
});

var TodoListView = Backbone.View.extend({
	render: function(){
		var that = this;
		var todoList = new TodoList();
		todoList.fetch({
			success: function(todoList) {
				var template = _.template($('#item-template').html(), {todoList: todoList.models});
				that.$el.html(template);
			}
		}) 
	}
});

var TodoView = Backbone.View.extend({
	tagName: 'article',
	id: 'todo-view',
	className: 'todo',
	template: _.template('<div class="viewer">' + '<h3 class="<%= statusCheck %>" >' + '<input type=checkbox ' + 
	'<% if(statusCheck === "complete") print("checked") %>/>' + '<%= description %><h3>' + '<img class="destroy" src="../images/delete.png">' +
	'<img class="move" src="../images/move.png">' + 
	'<p class="<%= statusCheck %>">Owner: <%= owner %> || Schedule: <%= schedule %> || Budget: <%= budget %><p>' + '</div>' + 
	'<input name=description class="edit" value="<%= description %>"/>' + '<input name=owner class="edit" value="<%= owner %>"/>' + 
	'<input name=schedule class="edit" value="<%= schedule %>"/>' + '<input name=budget class="edit" value="<%= budget %>"/>'),		
	events: {
		'change input': 'toggleStatus',
		'dblclick .incomplete': 'edit',
		'keypress .edit': 'updateOnEnter',
		'click img.destroy': 'clear',
		'click img.move': 'move'
	},
	edit: function(){
		this.$el.addClass("editing");
	},
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
		this.model.on('hide', this.remove, this)
	},
	toggleStatus: function(){
		this.model.toggleStatus();
	},
	clear: function(){
		this.model.destroy();
	},
	close: function(){
		this.$el.removeClass('editing');
		var newDescription = this.$('input[name=description]').val();
		var newOwner = this.$('input[name=owner]').val();
		var newSchedule = this.$('input[name=schedule]').val();
		var newBudget = this.$('input[name=budget]').val();
		var incomplete = 'incomplete';
		this.model.set({description: newDescription, owner: newOwner, schedule: newSchedule, budget: newBudget});
		this.model.set({statusCheck: 'incomplete'});
		this.model.save();
	},
	updateOnEnter: function(e){
		if (e.keyCode == 13) this.close();
	},
	render: function(){
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
		return this;
	}
});

var TodoForm = Backbone.View.extend({
	template: _.template('<form>' + '<input name=description placeholder="<%= description %>" />' + 
	'<input name=owner placeholder="<%= owner %>"/>' + '<input name=schedule placeholder="<%= schedule %>"/>' +
	'<input name=budget placeholder="<%= budget %>"/>' + '<button>Save</button></form>'),
	events: {
		submit: 'save'
	},
	save: function(e){
		e.preventDefault();
		var newDescription = this.$('input[name=description]').val();
		var newOwner = this.$('input[name=owner]').val();
		var newSchedule = this.$('input[name=schedule]').val();
		var newBudget = this.$('input[name=budget]').val();
		this.model.set({description: newDescription, owner: newOwner, schedule: newSchedule, budget: newBudget});
		todoList.add(this.model);
		this.model.save();
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var todoListView = new TodoListView({collection: todoList});

var todoFormItem = new TodoItem({description: 'Next to do?', 
								owner: 'Owner?', 
								schedule: 'Due Date?', 
								budget: "Budget?"});

var todoForm = new TodoForm({model: todoFormItem});

var router = new Router; 

router.on('route:home', function(){
	todoListView.render();
	$('.view').append(todoListView.el);
});

router.on('route:editUser', function(){
	$('.taskLists').html(todoForm.render().el);
});

Backbone.history.start();

});