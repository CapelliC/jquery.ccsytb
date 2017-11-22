/**
 * Scroll Your Table Body jQuery plugin
 * 
 * @version 1.0.0
 * @licence: MIT
 * @author: CapelliC, http://www.capellic.it
 * 
 * Minimal implementation of a scrollable TBODY.
 * Some details adapted from https://jsfiddle.net/hashem/CrSpu/554/
 * 
 * https://github.com/CapelliC/jquery.ccsytb
 */
(function($) {

    // Adjust style as needed
    function fix_css($table, options) {

        if (options.trace)
            options.trace('fix_css', $table, options)

        const $thead = $table.find('thead')
        $thead.css({
            'display':'block',
        })

        const $tbody = $table.find('tbody')
        $tbody.css({
            'display':'block',
            'overflow-y':'scroll',
            'overflow-x':'hidden',
        })
    }
    
    // Adjust the width of cells when window resizes
    function adjust_header($table, options) {
        
        function get_widths(sel) {
            const $cells = $table.find(sel).children()
            return $cells.map(function() {
                return $(this).width()
            }).get()
        }

        // Get the columns width arrays
        const cols = get_widths('tbody tr:first')
        const head = get_widths('thead tr')
        const wmax = cols.map((c, i) => Math.max(c, head[i]))
        
        if (options.trace)
            options.trace('cols,head,wmax', cols, head, wmax)

        function set_widths(sel) {
            $table.find(sel).children().each(function(i, v) {
                $(v).width(wmax[i])
            })
        }
        set_widths('tbody tr:first')
        set_widths('thead tr')

        const $tbody = $table.find('tbody')

        // specified fixed height ?
        if (options.height)
            $tbody.height(options.height)
        else {
            const tp = $tbody.position().top
            const dt = options.deltaTop || 8
            const TH = $(window).height() - tp - dt
            if (options.trace)
                options.trace('TH', $tbody, TH, dt)
            $tbody.height(TH)
        }
    }

    $.fn.ccsytb = function(options) {
        ($this = $(this)).each(function() {
            fix_css($(this), options)
            if (options.resize_event)
                $(this).on(options.resize_event, function() {
                    if (options.trace)
                        options.trace('on', options.resize_event, $(this))
                    adjust_header($(this), options)
                })
        })

        $(window).resize(function() {

            $this.each(function() {
                // Peek current table
                adjust_header($(this), options)
            })
            
        }).resize() // Trigger resize handler

        return $(this)
    }
    
})(jQuery);
