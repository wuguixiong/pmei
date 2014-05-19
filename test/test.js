var attrs = {
	a: 8,
	b: '',
	c: function() {
		'';
	},
	d: [],
	f: true,
	g: false
};

var C = function(param){
	init(this, attrs, param);
}

construct(C, attrs);