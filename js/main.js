Ext.onReady(function() {
	var panel = new Ext.Panel({
		renderTo  : Ext.getBody(),
		width     : 400,
		height    : 400,
		html      : "Test",
		title     : "File Droppable",
		plugins   : [
			{ ptype : "filedrop" }
		],
		listeners : {
			dragover : function(cmp, e) {
				console.log("Dragging");
			},
			drop     : function(cmp, e) {
				console.log("Drop");
			}
		}
	});
});