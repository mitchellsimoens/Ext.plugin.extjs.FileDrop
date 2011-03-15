Ext.define("Ext.plugin.extjs.FileDrop", {
	extend   : "Ext.AbstractPlugin",
	alias    : "plugin.filedrop",

	init : function(cmp) {
		var me = this;

		cmp.addEvents({
			dragover : true,
			drop     : true
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

		var cmp = this.cmp;
		cmp.fireEvent("drop", cmp, e);
	}
});