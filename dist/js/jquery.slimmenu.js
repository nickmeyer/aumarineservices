/**
 * jquery.slimmenu.js
 * http://adnantopal.github.io/slimmenu/
 * Author: @adnantopal
 * Copyright 2013, Adnan Topal (atopal.com)
 * Licensed under the MIT license.
 */
;(function ( $, window, document, undefined )
{
    var pluginName = "slimmenu",
        defaults =
        {
            resizeWidth: '900',
            collapserTitle: 'Main Menu',
            animSpeed: 'medium',
            easingEffect: true,
            indentChildren: false,
            childrenIndenter: '&nbsp;&nbsp;'
        };

    function Plugin( element, options )
    {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this.init();
    }

    Plugin.prototype = {

        init: function()
        {
            var $options = this.options,
                $menu = this.$elem,
                $collapser = '<div class="menu-collapser">'+$options.collapserTitle+'<div class="collapse-button"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></div>',
                $menu_collapser;

            $menu.before($collapser);
            $menu_collapser = $menu.prev('.menu-collapser');

            $menu.on('click', '.sub-collapser', function(e)
            {
                e.preventDefault();
                e.stopPropagation();

                var $parent_li = $(this).closest('li');

                if ($(this).hasClass('expanded'))
                {
                    $(this).removeClass('expanded');
                    $(this).find('i').html('&#9660;');
                    $parent_li.find('>ul').slideUp($options.animSpeed, $options.easingEffect);
                }
                else
                {
                    $(this).addClass('expanded');
                    $(this).find('i').html('&#9650;');
                    $parent_li.find('>ul').slideDown($options.animSpeed, $options.easingEffect);
                }
            });

            $menu_collapser.on('click', '.collapse-button', function(e)
            {
                e.preventDefault();
                $menu.slideToggle($options.animSpeed, $options.easingEffect);
            });

            this.resizeMenu({ data: { el: this.element, options: this.options } });
            $(window).on('resize', { el: this.element, options: this.options }, this.resizeMenu);
        },

        resizeMenu: function(event)
        {
            var $window = $(window),
                $options = event.data.options,
                $menu = $(event.data.el),
                $menu_collapser = $('body').find('.menu-collapser');

            $menu.find('li').each(function()
            {
                if ($(this).has('ul').length)
                {
                    if ($(this).has('.sub-collapser').length)
                    {
                        $(this).children('.sub-collapser i').html('&#9660;');
                    }
                    else
                    {
                        $(this).append('<span class="sub-collapser"><i>&#9660;</i></span>');
                    }
                }

                $(this).children('ul').hide();
                $(this).find('.sub-collapser').removeClass('expanded').children('i').html('&#9660;');
            });

            if ($options.resizeWidth >= $window.width())
            {
                if ($options.indentChildren)
                {
                    $menu.find('ul').each(function()
                    {
                        var $depth = $(this).parents('ul').length;
                        if (!$(this).children('li').children('a').has('i').length)
                        {
                            $(this).children('li').children('a').prepend(Plugin.prototype.indent($depth, $options));
                        }
                    });
                }

                $menu.find('li').has('ul').off('mouseenter mouseleave');
                $menu.addClass('collapsed').hide();
                $menu_collapser.show();
            }
            else
            {
                $menu.find('li').has('ul').on('mouseenter', function()
                {
                    $(this).find('>ul').stop().slideDown($options.animSpeed, $options.easingEffect);
                })
                .on('mouseleave', function()
                {
                    $(this).find('>ul').stop().slideUp($options.animSpeed, $options.easingEffect);
                });

                $menu.find('li > a > i').remove();
                $menu.removeClass('collapsed').show();
                $menu_collapser.hide();
            }
        },

        indent: function(num, options)
        {
            var $indent = '';
            for (var i=0; i < num; i++)
            {
                $indent += options.childrenIndenter;
            }
            return '<i>'+$indent+'</i>';
        }
    };

    $.fn[pluginName] = function ( options )
    {
        return this.each(function ()
        {
            if (!$.data(this, "plugin_" + pluginName))
            {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuc2xpbW1lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBqcXVlcnkuc2xpbW1lbnUuanNcbiAqIGh0dHA6Ly9hZG5hbnRvcGFsLmdpdGh1Yi5pby9zbGltbWVudS9cbiAqIEF1dGhvcjogQGFkbmFudG9wYWxcbiAqIENvcHlyaWdodCAyMDEzLCBBZG5hbiBUb3BhbCAoYXRvcGFsLmNvbSlcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApXG57XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBcInNsaW1tZW51XCIsXG4gICAgICAgIGRlZmF1bHRzID1cbiAgICAgICAge1xuICAgICAgICAgICAgcmVzaXplV2lkdGg6ICc5MDAnLFxuICAgICAgICAgICAgY29sbGFwc2VyVGl0bGU6ICdNYWluIE1lbnUnLFxuICAgICAgICAgICAgYW5pbVNwZWVkOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGVhc2luZ0VmZmVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGluZGVudENoaWxkcmVuOiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkcmVuSW5kZW50ZXI6ICcmbmJzcDsmbmJzcDsnXG4gICAgICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy4kZWxlbSA9ICQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyICRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgICAgICRtZW51ID0gdGhpcy4kZWxlbSxcbiAgICAgICAgICAgICAgICAkY29sbGFwc2VyID0gJzxkaXYgY2xhc3M9XCJtZW51LWNvbGxhcHNlclwiPicrJG9wdGlvbnMuY29sbGFwc2VyVGl0bGUrJzxkaXYgY2xhc3M9XCJjb2xsYXBzZS1idXR0b25cIj48c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaWNvbi1iYXJcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj48L2Rpdj48L2Rpdj4nLFxuICAgICAgICAgICAgICAgICRtZW51X2NvbGxhcHNlcjtcblxuICAgICAgICAgICAgJG1lbnUuYmVmb3JlKCRjb2xsYXBzZXIpO1xuICAgICAgICAgICAgJG1lbnVfY29sbGFwc2VyID0gJG1lbnUucHJldignLm1lbnUtY29sbGFwc2VyJyk7XG5cbiAgICAgICAgICAgICRtZW51Lm9uKCdjbGljaycsICcuc3ViLWNvbGxhcHNlcicsIGZ1bmN0aW9uKGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgJHBhcmVudF9saSA9ICQodGhpcykuY2xvc2VzdCgnbGknKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpJykuaHRtbCgnJiM5NjYwOycpO1xuICAgICAgICAgICAgICAgICAgICAkcGFyZW50X2xpLmZpbmQoJz51bCcpLnNsaWRlVXAoJG9wdGlvbnMuYW5pbVNwZWVkLCAkb3B0aW9ucy5lYXNpbmdFZmZlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2knKS5odG1sKCcmIzk2NTA7Jyk7XG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnRfbGkuZmluZCgnPnVsJykuc2xpZGVEb3duKCRvcHRpb25zLmFuaW1TcGVlZCwgJG9wdGlvbnMuZWFzaW5nRWZmZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJG1lbnVfY29sbGFwc2VyLm9uKCdjbGljaycsICcuY29sbGFwc2UtYnV0dG9uJywgZnVuY3Rpb24oZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJG1lbnUuc2xpZGVUb2dnbGUoJG9wdGlvbnMuYW5pbVNwZWVkLCAkb3B0aW9ucy5lYXNpbmdFZmZlY3QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVzaXplTWVudSh7IGRhdGE6IHsgZWw6IHRoaXMuZWxlbWVudCwgb3B0aW9uczogdGhpcy5vcHRpb25zIH0gfSk7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHsgZWw6IHRoaXMuZWxlbWVudCwgb3B0aW9uczogdGhpcy5vcHRpb25zIH0sIHRoaXMucmVzaXplTWVudSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVzaXplTWVudTogZnVuY3Rpb24oZXZlbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpLFxuICAgICAgICAgICAgICAgICRvcHRpb25zID0gZXZlbnQuZGF0YS5vcHRpb25zLFxuICAgICAgICAgICAgICAgICRtZW51ID0gJChldmVudC5kYXRhLmVsKSxcbiAgICAgICAgICAgICAgICAkbWVudV9jb2xsYXBzZXIgPSAkKCdib2R5JykuZmluZCgnLm1lbnUtY29sbGFwc2VyJyk7XG5cbiAgICAgICAgICAgICRtZW51LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzKCd1bCcpLmxlbmd0aClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhcygnLnN1Yi1jb2xsYXBzZXInKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5zdWItY29sbGFwc2VyIGknKS5odG1sKCcmIzk2NjA7Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJzdWItY29sbGFwc2VyXCI+PGk+JiM5NjYwOzwvaT48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5zdWItY29sbGFwc2VyJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJykuY2hpbGRyZW4oJ2knKS5odG1sKCcmIzk2NjA7Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCRvcHRpb25zLnJlc2l6ZVdpZHRoID49ICR3aW5kb3cud2lkdGgoKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoJG9wdGlvbnMuaW5kZW50Q2hpbGRyZW4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkbWVudS5maW5kKCd1bCcpLmVhY2goZnVuY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRlcHRoID0gJCh0aGlzKS5wYXJlbnRzKCd1bCcpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5jaGlsZHJlbignbGknKS5jaGlsZHJlbignYScpLmhhcygnaScpLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdsaScpLmNoaWxkcmVuKCdhJykucHJlcGVuZChQbHVnaW4ucHJvdG90eXBlLmluZGVudCgkZGVwdGgsICRvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRtZW51LmZpbmQoJ2xpJykuaGFzKCd1bCcpLm9mZignbW91c2VlbnRlciBtb3VzZWxlYXZlJyk7XG4gICAgICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkbWVudV9jb2xsYXBzZXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICRtZW51LmZpbmQoJ2xpJykuaGFzKCd1bCcpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+dWwnKS5zdG9wKCkuc2xpZGVEb3duKCRvcHRpb25zLmFuaW1TcGVlZCwgJG9wdGlvbnMuZWFzaW5nRWZmZWN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnPnVsJykuc3RvcCgpLnNsaWRlVXAoJG9wdGlvbnMuYW5pbVNwZWVkLCAkb3B0aW9ucy5lYXNpbmdFZmZlY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJG1lbnUuZmluZCgnbGkgPiBhID4gaScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG1lbnVfY29sbGFwc2VyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpbmRlbnQ6IGZ1bmN0aW9uKG51bSwgb3B0aW9ucylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyICRpbmRlbnQgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IG51bTsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICRpbmRlbnQgKz0gb3B0aW9ucy5jaGlsZHJlbkluZGVudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICc8aT4nKyRpbmRlbnQrJzwvaT4nO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoISQuZGF0YSh0aGlzLCBcInBsdWdpbl9cIiArIHBsdWdpbk5hbWUpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCBcInBsdWdpbl9cIiArIHBsdWdpbk5hbWUsXG4gICAgICAgICAgICAgICAgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApO1xuIl0sImZpbGUiOiJqcXVlcnkuc2xpbW1lbnUuanMifQ==
