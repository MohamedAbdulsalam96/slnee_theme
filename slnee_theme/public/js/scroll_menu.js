//action when module clicked from scroll bar
$(".carousel-cell").click(function(){
	clear_selected()
	$(this).addClass( "selected_module");
  });
//action when module clicked from scroll bar , except home
$(".normal-module").click(function(){
	show_sidebar();
});

//action when home module clicked from scroll bar 
$(".home-module").click(function(){
	hide_sidebar();
	clear_sidebar();
});

function clear_selected(){
	$(".carousel-cell").removeClass( "selected_module");
};

//remove all items from sidebar
function clear_sidebar(){
	$('.sidebar-item-custom').slideUp();
	$('.sidebar-item-custom').remove();
}

function show_sidebar(){
	$("#sidebar").addClass("opened1");
}
function hide_sidebar(){
	$("#sidebar").removeClass("opened1");
}
