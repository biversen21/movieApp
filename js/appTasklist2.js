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
	
var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'new': 'editTodo', 
		'edit/:id': 'editTodo',
		'complete/:id': 'completeTodo'
	}
});

var TodoItem = Backbone.Model.extend({
	localStorage: new Backbone.LocalStorage("todoItems"),
	defaults: {
		statusCheck: 'incomplete',
		actualSpend: 0,
		actualComplete: ''
	}
});

var TodoList = Backbone.Collection.extend({
	localStorage: new Backbone.LocalStorage("todoItems")
});

var TodoListView = Backbone.View.extend({
	el: '.page',
	render: function(){
		var todoList = new TodoList();
		var that = this;
		todoList.fetch({
			success: function(todoList){
				var template = _.template($('#todo-list-template').html(), {todoList: todoList.models});
				that.$el.html(template);
			}
		});
	}
});

var CompleteForm = Backbone.View.extend({
	el: '.page',
	render: function(options){
		var that = this;
		that.todoItem = new TodoItem ({id: options});
		that.todoItem.fetch({
			success: function(todoItem){
				var template = _.template($('#complete-list-template').html(), {todoItem: todoItem});
				that.$el.html(template);
			}
		});
	},
	events: {
		'submit .complete-list-form': 'updateTodo'
	},
	updateTodo: function(ev){
		if ((this.todoItem.get('statusCheck')) == 'incomplete') {
			this.todoItem.set({statusCheck: 'complete'});
		} else {
			this.todoItem.set({statusCheck: 'incomplete'});
		}
		var todoDetails = $(ev.currentTarget).serializeObject();
		this.todoItem.save(todoDetails, {
			success: function(todoItem){
				router.navigate('', {trigger: true});
			}
		});
		return false;
	}
});

var NewTodoForm = Backbone.View.extend({
	el: '.page',
	render: function(options){
		var that = this;
		if (options) {
			that.todoItem = new TodoItem ({id: options});
			that.todoItem.fetch({
				success: function(todoItem){
					var template = _.template($('#edit-list-template').html(), {todoItem: todoItem});
					that.$el.html(template);
				}
			});
		} else {
			var template = _.template($('#edit-list-template').html(), {todoItem: null});
			this.$el.html(template);
		}
	},
	events: {
		'submit .edit-todo-form': 'saveTodo',
		'click .delete': 'deleteTodo',
	},
	deleteTodo: function(){
		this.todoItem.destroy({
			success: function(){
				router.navigate('', {trigger: true});
			}
		});
		return false;
	},
	saveTodo: function(ev) {
		var todoDetails = $(ev.currentTarget).serializeObject();
		var todoItem = new TodoItem;
		todoItem.save(todoDetails, {
			success: function(todoItem){
				router.navigate('', {trigger: true});
			}
		});
		return false;
	}
});

var todoListView = new TodoListView();
var newTodoForm = new NewTodoForm();
var completeForm = new CompleteForm();
var router = new Router; 

router.on('route:home', function(){
	todoListView.render();
});
router.on('route:editTodo', function(id){
	newTodoForm.render(id);
});
router.on('route:completeTodo', function(id){
	completeForm.render(id);
});

Backbone.history.start();

});