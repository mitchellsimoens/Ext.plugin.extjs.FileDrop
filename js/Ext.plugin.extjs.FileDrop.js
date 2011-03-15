Ext.define("Ext.plugin.extjs.FileDrop", {
	extend   : "Ext.AbstractPlugin",
	alias    : "plugin.filedrop",

	init : function(cmp) {
		var me = this;

		var events = {
			dragover   : true,
			drop       : true,
			beforeread : true,
			read       : true,
			readstart  : true,
			readend    : true,
			readabort  : true,
			readerror  : true
		};

		if (Ext.isGecko) {
			Ext.apply(events, {
				progress : true
			});
		}

		cmp.addEvents(events);

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

		reader.onload = Ext.bind(me.onFileRead, me, [file], true);
		reader.onprogress = Ext.bind(me.onFileProgress, me, [file], true);
		reader.onloadstart = Ext.bind(me.onFileReadStart, me, [file], true);
		reader.onloadend = Ext.bind(me.onFileReadEnd, me, [file], true);
		reader.onabort = Ext.bind(me.onFileAbort, me, [file], true);
		reader.onerror = Ext.bind(me.onFileError, me, [file], true);
		reader.readAsDataURL(file);
	},

	onFileProgress: function(e, file) {
		var cmp = this.cmp;

		if (Ext.isGecko) {
			cmp.fireEvent("progress", cmp, e, file);
		}
	},

	onFileRead: function(e, file) {
		var cmp = this.cmp;

		cmp.fireEvent("read", cmp, e, file);
	},

	onFileReadStart: function(e, file) {
		var cmp = this.cmp;

		cmp.fireEvent("readstart", cmp, e, file);
	},

	onFileReadEnd: function(e, file) {
		var cmp = this.cmp;

		cmp.fireEvent("readend", cmp, e, file);
	},

	onFileAbort: function(e, file) {
		var cmp = this.cmp;

		cmp.fireEvent("readabort", cmp, e, file);
	},

	onFIleError: function(e, file) {
		var cmp = this.cmp;

		cmp.fireEvent("readerror", cmp, e, file);
	}
});