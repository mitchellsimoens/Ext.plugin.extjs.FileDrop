//Spec - http://www.w3.org/TR/FileAPI/

Ext.define("Ext.plugin.extjs.FileDrop", {
	extend   : "Ext.AbstractPlugin",
	alias    : "plugin.filedrop",

	readType : "DataURL",

	init : function(cmp) {
		var me = this;

		cmp.addEvents({
			dragover   : true,
			drop       : true,
			beforeload : true,
			load       : true,
			loadstart  : true,
			loadend    : true,
			loadabort  : true,
			loaderror  : true,
			progress   : true
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
		var me     = this,
			cmp    = me.cmp,
			reader = new FileReader();

		if (!cmp.fireEvent("beforeread", cmp, file)) { return false; }

		reader.onload      = Ext.bind(me.handleFileEvent, me, [file], true);
		reader.onprogress  = Ext.bind(me.handleFileEvent, me, [file], true);
		reader.onloadstart = Ext.bind(me.handleFileEvent, me, [file], true);
		reader.onloadend   = Ext.bind(me.handleFileEvent, me, [file], true);
		reader.onabort     = Ext.bind(me.handleFileEvent, me, [file], true);
		reader.onerror     = Ext.bind(me.handleFileEvent, me, [file], true);

		reader["readAs" + me.readType](file);
	},

	handleFileEvent: function(e, file) {
		var cmp  = this.cmp,
			type = e.type;

		if (type === "load") {
			if (!cmp.fireEvent("before" + e.type, cmp, e, file)) { return false; }
		} else if (type === "abort" || type === "error") {
			type = "load" + type;
		}

		cmp.fireEvent(type, cmp, e, file);
	}
});