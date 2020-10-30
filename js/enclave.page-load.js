$(document).ready(function() {

	/* transition navbar backgroud from transparent to opaque
    SetNavBarOpacity();
    
	$(window).scroll(function()
	{
		SetNavBarOpacity();
	});
	 */
    
});

function SetNavBarOpacity()
{
	var opacity;
	var opacityMinimum = 0.0;
	var opaqueAt = 101; // px from top
	
	var scrollPosition = $(window).scrollTop();		
	if (scrollPosition < opaqueAt) {
		opacity = (scrollPosition / opaqueAt) + opacityMinimum;
	} else if (scrollPosition > opaqueAt) {
		opacity = 1;
	}
	
	// also set in 'navbar-default' css class to prevent FOUC
	$('.navbar').css('background-color','rgba(14, 20, 30, ' + opacity);
}