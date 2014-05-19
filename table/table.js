/**
 * 1、列头支持调整大小
 * 2、列支持text、checkbox、radio、select、link、image、html、custom
 * 3、支持列过滤
 * 4、支持普通分页、滚动分页
 */
(function () {
	// 构造函数
	var Table = function (options) {
		// 处理入参数据，转化为表格数据
		validate(options);
		this.headers = setHeaderFn(options.headers);
		this.rows = filterData(options.data, this.headers);
		this.el = $('<div/>');
		bindEvents(this);
		$(options.container).append(this.el);
		this.event = $({});
	};
	Table.prototype.render = function () {
		// 处理模板
		var html = sky.templates.table({
			headers: this.headers,
			rows: this.rows
		});
		// 添加到容器
		this.el.append(html);
		bindEvents(this);
	};

	Table.prototype.on = function (type /*,data*/ , callback) {

	};

	var COLUMN_TYPE = {
		checkbox: 'isCheckbox',
		radio: 'isRadio',
		select: 'isSelect',
		link: 'isLink',
		html: 'isHtml',
		text: 'isText'
	};
	function getColumnType(type) {

	}

	function validate(options) {
		if (options.data && options.headers.length !== options.data.length) {
			throw new Error('column number and data number is not the same.');
		}
	}

	// 设置列数据的定义函数
	function setHeaderFn(headers) {
		return $.map(headers, function (header) {
			if ($.type(header.contentType) === 'function') {
				header.contentFn = header.contentType;
			} else {
				header.contentFn = COLUMN_TYPE[header.contentType] || COLUMN_TYPE['text'];
			}

			return header;
		});
	}

	// 入参为以列为准的数据，转化为以行为准的数据
	function filterData(data, headers) {
		var rows = [];
		$.each(data || [], function (colIndex, column) {
			$.each(column, function (rowIndex, cell) {
				if (!rows[rowIndex]) {
					rows[rowIndex] = [];
				}
				rows[rowIndex][colIndex] = headers[colIndex].contentFn(cell);
			});
		});
		return rows;
	}

	function bindEvents(table) {
		table.el.on('click', '.sky-tr', function (e, element) {
		
		});
	}

	window.sky = window.sky || {};
	sky.Table = Table;
})();