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
            options.trace('tbody_scroll', options, table)

        const $thead = $table.find('thead')
        $thead.css({
            'display':'block',
            //'width':'100%',
        })

        const $tbody = $table.find('tbody')
        $tbody.css({
            'display':'block',
            'overflow-y':'scroll',
            'overflow-x':'hidden',
            //'width':'100%',
        })
    }
    
    // Adjust the width of thead cells when window resizes
    function adjust_header($table, options) {
        const $bodyCells = $table.find('tbody tr:first').children()

        // Get the tbody columns width array
        const colWidth = $bodyCells.map(function() {
            return $(this).width()
        }).get()

        if (options.trace)
            options.trace('resize each', $table, colWidth)

        // Set the width of thead columns
        $table.find('thead tr').children().each(function(i, v) {
            $(v).width(colWidth[i])
        })

        const $tbody = $table.find('tbody')

        // this specify which container we should fill,
        /*/ after which element
        if (options.parent && options.before) {
            const parent = $(options.parent)
            const before = $(options.before)
            const target = $tbody

            const wh = $(window).height()
            if (options.trace)
                options.trace('wh', wh)
            
            const ph = parent.height()
            const pp = parent.position().top
            if (options.trace)
                options.trace('ph, pp', parent, ph, pp)
            
            const th = target.height()
            const tp = target.position().top
            if (options.trace)
                options.trace('th, tp', target, th, tp)
            
            const bh = before.height()
            const bp = before.position().top
            if (options.trace)
                options.trace('bh, bp', before, bh, bp)

            var sumtop = 0 //target.position().top - bh
            target.parents().each(function() {
                sumtop += $(this).position().top
                if (options.trace)
                    options.trace('sumtop', this, sumtop)
            })

            const TH = $(window).height() - tp //.top sumtop - bh - bp
            if (options.trace)
                options.trace('TH', $tbody, TH)
            $tbody.height(TH)
        }
        */
        
        // last resort, specify fixed height
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
        ($this = $(this)).each(function() { fix_css($(this), options) })

        $(window).resize(function() {

            $this.each(function() {
                // Peek current table
                adjust_header($(this), options)
            })
            
        }).resize() // Trigger resize handler

        return $(this)
    }
    
})(jQuery);
