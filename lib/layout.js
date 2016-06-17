/** 
** Main mirror application. 
** Config is global (loaded via separate file in /config/config.js) 
**/

var Layout = (function () {
    
    var detailViewCol = config.widget.summary.width + config.widget.detail.offset,
        detailViewRow = config.widget.detail.row,
        serialization = [
            {
                id: 'clock',
                col: 1,
                row: 1,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            },
            {
                id: 'weather',
                col: 1,
                row: 2,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            },
            {
                id: 'news',
                col: 1,
                row: 3,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            },
            {
                id: 'email',
                col: 1,
                row: 4,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            },
            {
                id: 'facebook',
                col: 1,
                row: 5,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            },
            {
                id: 'selwyn',
                col: 1,
                row: 6,
                size_x: config.widget.summary.width,
                size_y: config.widget.summary.height
            }
        ];

    console.log("Window dimensions (WxH): " + window.innerWidth + "x" + window.innerHeight);
    
    var previousWidget,
        margin = config.widget.margin,
        units = config.widget.units,
        gridster = $('.gridster ul').gridster({
            widget_base_dimensions: [
                (window.innerWidth / units) - (margin * 2),
                (window.innerWidth / units) - (margin * 2)],
            widget_margins: [margin, margin],
            serialize_params: function ($w, wgd) {
                  return {
                      /* add element ID to data*/
                      id: $w.attr['id'],

                      /* defaults */
                      col: wgd.col,
                      row: wgd.row,
                      size_x: wgd.size_x,
                      size_y: wgd.size_y
                  };
            }
        }).data('gridster');
    
    var closeDetails = function () {
        console.log("Closing detail view...");
        gridster.mutate_widget_in_gridmap(
            previousWidget.el,
            { col: detailViewCol, row: detailViewRow, size_x: config.widget.detail.width, size_y: config.widget.detail.height },
            { col: previousWidget.col, row: previousWidget.row, size_x: previousWidget.size_x, size_y: previousWidget.size_y }
        );
    };
    
    var openDetails = function ($widget) {
        /* The selected widget */
        var currentWidget = gridster.dom_to_coords($widget);
        
        /* Check if there is already a widget in the detail-view foreground - if so close it */
        if (gridster.is_widget(detailViewCol, detailViewRow) && previousWidget) {
            console.log("Previous element present...");
            closeDetails();
        }

        /* Tried previousWidget = currentWidget  but that doesn't have the intended results with summary-to-detail swapping */
        previousWidget = gridster.dom_to_coords($widget);
        
        /* Move widget to detail-view foreground */
        gridster.mutate_widget_in_gridmap(
            $widget,
            { col: previousWidget.col, row: previousWidget.row, size_x: previousWidget.size_x, size_y: previousWidget.size_y },
            { col: detailViewCol, row: detailViewRow, size_x: config.widget.detail.width, size_y: config.widget.detail.height }
        );
        
        /* Move all summmary column widgets up to reduce the space taken up */
        gridster.remove_empty_cells(previousWidget.col, previousWidget.row, previousWidget.size_x, previousWidget.size_y, $widget);
    };
    
    return {
        init: function () {
            /* clear all the widgets */
            //gridster.remove_all_widgets();

            /* Sort serialization then add widget to layout */
            serialization = Gridster.sort_by_row_and_col_asc(serialization);

            $.each(serialization, function () {
                gridster.add_widget('<li id="' + this.id + '">' + this.id + '</li>', this.size_x, this.size_y, this.col, this.row);
            });

            gridster.$el.on('click', '> li', function () {
                
                var currentWidget = gridster.dom_to_coords($(this));
                
                /* Check if the click was on the current detail-view widget */
                if (currentWidget && currentWidget.col === detailViewCol && currentWidget.row === detailViewRow) {
                    closeDetails();
                } else {
                    openDetails($(this));
                }
            });
        },
        
        closeDetailView: function () {
            closeDetails();
        },
        
        openDetailView: function($widget) {
            openDetails($widget);
        }
    };
    
})();

Layout.init();