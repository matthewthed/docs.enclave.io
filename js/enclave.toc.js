$(document).ready(function()
{
    // generate toc using https://github.com/nghuuphuoc/tocjs
	$('#toc').toc({
		elementClass: 'toc',
		ulClass: 'nav',
        heading: '<i class="fa fa-align-left" aria-hidden="true"></i> On this page',
        selector: "h2, h3, h4, h5, h6"
	});

	// call jquery scrollspy() on toc
	$('body').scrollspy({ target: '#toc' });

	// thanks https://stackoverflow.com/questions/14804941/how-to-add-smooth-scrolling-to-bootstraps-scroll-spy-function
	$(".toc ul li a[href^='#']").on('click', function(e) 
	{
		// prevent default anchor click behavior
		e.preventDefault();

        var elementId = $(this.hash)[0].id;
        var linkTop = $(this.hash).offset().top;

		// animate scroll
		$('html, body').animate({ scrollTop: linkTop }, 300, function()
		{
            // when done, add hash to url (default click behaviour)
            window.location.hash = elementId;
			//window.location.hash = this.hash;
		});
    });

    $(window).scroll(function() { RedrawToc(); });
});

function RedrawToc()
{
    // set width based on width of parent element
    $('#toc').width($('#toc').parents().width());

    // to hold toc at a non-zero offset from the top of the page see https://codepen.io/anon/pen/RZreNN
    // element containing the content that we're putting a toc in place for
    var scrollAtElement = $("#section-page");
    var scrollFromOffset = scrollAtElement.offset().top + 105;
    var scrollUntilOffset = scrollAtElement.height() - $("#toc").height();

    var scrollPos = $(this).scrollTop();
    if (scrollPos > scrollFromOffset)
    {
        if (scrollPos < scrollUntilOffset) {
            $('#toc').css({'position':'fixed','top':'0'});
        }
        else {
            $('#toc').css({'position':'relative','top':(scrollUntilOffset - scrollFromOffset)+'px'});
        }
    }
    else { 
        $('#toc').css({'position':'relative','top':'0'});
    }
}

// call anchorjs to add anchor tags. not a jquery plugin
anchors.options.placement = 'right';
anchors.add();

// initial call to draw the toc
RedrawToc();