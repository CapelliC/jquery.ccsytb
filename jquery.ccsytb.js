/**
 * Scroll Your Table Body jQuery plugin
 * 
 * @version 1.0.0
 * @licence: MIT
 * @author: CapelliC, http://www.capellic.it
 * 
 * Implement a scrollable TBODY.
 * Some details from https://jsfiddle.net/hashem/CrSpu/554/
 */
(function($) {
    
    function fix_css($table, options) {

        //const $table = $(this)
        if (options.trace)
            options.trace('tbody_scroll', options, table)

        const $thead = $table.find('thead')
        $thead.css({'display':'block'})

        const $tbody = $table.find('tbody')
        $tbody.css({'display':'block', 'overflow-y':'scroll', 'overflow-x':'hidden'})

        if (options.parent && options.before) {
            const parent = $(options.parent)
            const before = $(options.before)
            const target = $tbody
        }

        if (options.height)
            $tbody.height(options.height)
    }

    $.fn.ccsytb = function(options) {
        ($this = $(this)).each(function() { fix_css($(this), options) })

        // adapted from https://jsfiddle.net/hashem/CrSpu/554/
        
        // Adjust the width of thead cells when window resizes
        $(window).resize(function() {

            $this.each(function() {

                // Change the selector if needed
                const $table = $(this)
                const $bodyCells = $table.find('tbody tr:first').children()

                // Get the tbody columns width array
                const colWidth = $bodyCells.map(function() {
                    return $(this).width()
                }).get()

                if (options.trace)
                    options.trace('resize each', $table, colWidth)

                // Set the width of thead columns
                $(this).find('thead tr').children().each(function(i, v) {
                    $(v).width(colWidth[i])
                })
            })
            
        }).resize() // Trigger resize handler

        return $(this)
    }
    
})(jQuery);
