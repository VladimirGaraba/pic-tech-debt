$(function() {
    var options = {
		disableDrag: false,
		disableResize: false,
		staticGrid: true
	};
    $('.grid-stack').gridstack(options);
    new function() {

        this.grid = $('.grid-stack').data('gridstack');

        this.loadGrid = function() {
            this.grid.removeAll();

            const URL = `//${window.location.hostname}/dashboard/getDashboard`;
            const context = this;
            $.getJSON(URL, function(items) {
                _.each(items, function(node) {
                    context.grid.addWidget($(node.el),
                        node.x, node.y, node.width, node.height, true, 4, 12, 1, 8, node.id);
                }.bind(this));
            });
            return false;
        }.bind(this);

        this.saveGrid = function() {
            this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function(el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height
                };
            });
            $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
            return false;
        }.bind(this);

        this.clearGrid = function() {
            this.grid.removeAll();
            return false;
        }.bind(this);
        $('#save-grid').click(this.saveGrid);
        $('#load-grid').click(this.loadGrid);
        $('#clear-grid').click(this.clearGrid);
        this.loadGrid();
    };
});
