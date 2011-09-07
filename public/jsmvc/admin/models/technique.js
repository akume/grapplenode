/**
 * @tag models, home
 * Wraps backend technique services.  Enables 
 * [Admin.Models.Technique.static.findAll retrieving],
 * [Admin.Models.Technique.static.update updating],
 * [Admin.Models.Technique.static.destroy destroying], and
 * [Admin.Models.Technique.static.create creating] techniques.
 */
$.Model.extend('Admin.Models.Technique',
/* @Static */
{
	/**
 	 * Retrieves techniques data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped technique objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/techniques/',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error
			//fixture: "//admin/fixtures/techniques.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Updates a technique's data.
	 * @param {String} id A unique id representing your technique.
	 * @param {Object} attrs Data to update your technique with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/techniques/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a technique's data.
 	 * @param {String} id A unique id representing your technique.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/techniques/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a technique.
	 * @param {Object} attrs A technique's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/techniques/',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: "-restCreate" //uses $.fixture.restCreate for response.
		});
	}
},
/* @Prototype */
{});