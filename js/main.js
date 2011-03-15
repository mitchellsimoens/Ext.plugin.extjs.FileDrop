Ext.onReady(function() {
	var panel = new Ext.Panel({
		renderTo  : Ext.getBody(),
		width     : 400,
		height    : 400,
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
			},
			beforeread: function(cmp, file) {
				var imageType = /image.*/;
				return Ext.isArray(file.type.match(imageType)); //true if an image
			},
			readstart : function(cmp, e, file) {
				console.log("Starting to rRad");
			},
			read     : function(cmp, e, file) {
				console.log("Read File");
			},
			readend   : function(cmp, e, file) {
				console.log("End of Reading");
			},
			readabort : function(cmp, e, file) {
				console.log("Aborted Reading");
			},
			readerror : function(cmp, e, file) {
				console.log("Error Reading");
			}
		}
	});
});