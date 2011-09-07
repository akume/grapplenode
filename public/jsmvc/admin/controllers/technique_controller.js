/**
 * @tag controllers, home
 * Displays a table of techniques.	 Lets the user 
 * ["Admin.Controllers.Technique.prototype.form submit" create], 
 * ["Admin.Controllers.Technique.prototype.&#46;edit click" edit],
 * or ["Admin.Controllers.Technique.prototype.&#46;destroy click" destroy] techniques.
 */
$.Controller.extend('Admin.Controllers.Technique',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
 /**
 * When the page loads, gets all techniques to be displayed.
 */
 "{window} load": function(){
	if(!$("#technique").length){
	 $(document.body).append($('<div/>').attr('id','technique'));
		 Admin.Models.Technique.findAll({}, this.callback('list'));
 	}
 },
 /**
 * Displays a list of techniques and the submit form.
 * @param {Array} techniques An array of Admin.Models.Technique objects.
 */
 list: function( techniques ){
	$('#technique').html(this.view('init', {techniques:techniques} ));
 },
 /**
 * Responds to the create form being submitted by creating a new Admin.Models.Technique.
 * @param {jQuery} el A jQuery wrapped element.
 * @param {Event} ev A jQuery event whose default action is prevented.
 */
'form submit': function( el, ev ){
	ev.preventDefault();
	new Admin.Models.Technique(el.formParams()).save();
},
/**
 * Listens for techniques being created.	 When a technique is created, displays the new technique.
 * @param {String} called The open ajax event that was called.
 * @param {Event} technique The new technique.
 */
'technique.created subscribe': function( called, technique ){
	$("#technique tbody").append( this.view("list", {techniques:[technique]}) );
	$("#technique form input[type!=submit]").val(""); //clear old vals
},
 /**
 * Creates and places the edit interface.
 * @param {jQuery} el The technique's edit link element.
 */
'.edit click': function( el ){
	var technique = el.closest('.technique').model();
	technique.elements().html(this.view('edit', technique));
},
 /**
 * Removes the edit interface.
 * @param {jQuery} el The technique's cancel link element.
 */
'.cancel click': function( el ){
	this.show(el.closest('.technique').model());
},
 /**
 * Updates the technique from the edit values.
 */
'.update click': function( el ){
	var $technique = el.closest('.technique'); 
	$technique.model().update($technique.formParams());
},
 /**
 * Listens for updated techniques.	 When a technique is updated, 
 * update's its display.
 */
'technique.updated subscribe': function( called, technique ){
	this.show(technique);
},
 /**
 * Shows a technique's information.
 */
show: function( technique ){
	technique.elements().html(this.view('show',technique));
},
 /**
 *	 Handle's clicking on a technique's destroy link.
 */
'.destroy click': function( el ){
	if(confirm("Are you sure you want to destroy?")){
		el.closest('.technique').model().destroy();
	}
 },
 /**
 *	 Listens for techniques being destroyed and removes them from being displayed.
 */
"technique.destroyed subscribe": function(called, technique){
	technique.elements().remove();	 //removes ALL elements
 }
});