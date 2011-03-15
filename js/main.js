Ext.onReady(function() {
	var panel = new Ext.Panel({
		renderTo  : Ext.getBody(),
		width     : 400,
		height    : 400,
		title     : "File Droppable",
		plugins   : [
			{
				ptype    : "filedrop",
				readType : "DataURL"
				//default - DataURL
				//BinaryString
				//Text
				//ArrayBuffer
			}
		],
		listeners : {
			dragover : function(cmp, e) {
				console.log("Dragging");
			},
			drop     : function(cmp, e) {
				console.log("Drop");
			},
			beforeload: function(cmp, file) {
				var imageType = /image.*/;
//				return Ext.isArray(file.type.match(imageType)); //true if an image
			},
			loadstart : function(cmp, e, file) {
				console.log("Starting to Read");
			},
			load     : function(cmp, e, file) {
				console.log("Done Reading");
			},
			loadend   : function(cmp, e, file) {
				console.log("End of Reading");
			},
			loadabort : function(cmp, e, file) {
				console.log("Aborted Reading");
			},
			loaderror : function(cmp, e, file) {
				console.log("Error Reading");
			}
		}
	});
});