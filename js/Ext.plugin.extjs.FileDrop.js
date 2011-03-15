Ext.define("Ext.plugin.extjs.FileDrop", {
	extend   : "Ext.AbstractPlugin",
	alias    : "plugin.filedrop",

	init : function(cmp) {
		var me = this;

		cmp.addEvents({
			dragover : true,
			drop     : true,
			read     : true
		});

		cmp.on("afterrender", me.initFileDrop, me);
	},

	initFileDrop: function(cmp) {
		var me = this,
			el = me.el || cmp.getEl();

		el.on("dragover", me.onDragOver, me);
		el.on("drop", me.onDrop, me);
	},

	onDragOver: function(e) {
		e.stopEvent();

		var cmp = this.cmp;
		cmp.fireEvent("dragover", cmp, e);
	},

	onDrop: function(e) {
		e.stopEvent();

		var cmp          = this.cmp,
			browserEvent = e.browserEvent,
			dataTransfer = browserEvent.dataTransfer,
			files        = dataTransfer.files,
			numFiles     = files.length,
			i            = 0,
			file;

		cmp.fireEvent("drop", cmp, e);

		for (; i < numFiles; i++) {
			file = files[i];
			this.readFile(file);
		}
	},

	readFile: function(file) {
		var reader    = new FileReader();
		reader.onload = Ext.bind(this.onFileRead, this);
		reader.readAsDataURL(file);
	},

	onFileRead: function(e) {
		var cmp = this.cmp;

		cmp.fireEvent("read", cmp, e);
	}
});