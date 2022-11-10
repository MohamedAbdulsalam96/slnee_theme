$(".llayout-side-section").css("display","none");
//action when module clicked from scroll bar
$(".carousel-cell").click(function(){
	clear_selected()
	$(this).addClass( "selected_module");
  });
//action when module clicked from scroll bar , except home
$(".normal-module").click(function(){
	clear_sidebar();
	show_sidebar();
	var id = $(this).attr('id');
	
	set_sidebar(id);
	//$("#sidebar").animate({width:70});
	//$("#closesidebar").hide();
	//$("#opensidebar").show();
	//$(".layout-side-section").css("display","none");
});

//action when home module clicked from scroll bar 
$(".home-module ,.app-logo").click(function(){
	hide_sidebar();
	//$(".layout-side-section").css("display","none");
	clear_sidebar();
});



$("#opensidebar").click(function(){
	$("#sidebar").animate({width:240});
	$(this).hide();
	$("#closesidebar").show();
});
$("#closesidebar").click(function(){
	$("#sidebar").animate({width:70});
	$(this).hide();
	$("#opensidebar").show();
});
$("#logout-custom").click(function(){
frappe.app.logout();
window.location.href ="/login";
});

function clear_selected(){
	$(".carousel-cell").removeClass( "selected_module");
};

//remove all items from sidebar
function clear_sidebar(){
	$('.sidebar-item-custom').slideUp(function(){ $(this).remove()});
	//$('.sidebar-item-custom').remove();
};
//set menu to sidebar according to menu selected
function set_sidebar(module){
//	if {!module) return [];
	$("#module-name").html(__(module));
	frappe.call({
		method:"slnee_theme.desktop.sidebar.get_sidebar",
		args: {
			"module":module
		},
		async:true,
		callback(r){
			if(r.message){
				console.log(r.message);
				var items=r.message["items"];
				$("#sidebar").css("background-image", "linear-gradient("+r.message["direction"]+", "+r.message['color1']+", "+r.message['color2']+")");
				for (var i=0; i<items.length ;i++){
					 insert_element_sidebar(items[i]);
				}
				slidedown_sidebar();
			}
		}
	});
};
function show_sidebar(){
	$("#sidebar").addClass("opened-custom");
};
function hide_sidebar(){
	$("#sidebar").removeClass("opened-custom");
};
function slidedown_sidebar(){
	$('.sidebar-item-custom').slideDown();
}

function insert_element_sidebar(item){
	var sidebar=$("#sidebar-custom");
	var element="<div style='display:none;' class='sidebar-item-custom sidebar-item-container is-draggable' item-parent='' item-name='"+item["label"]+"' item-public='1'>";
	element+="<div class='desk-sidebar-item standard-sidebar-item-custom desk-sidebar-item-custom'>";
	element+="<span class='item-anchor align-custom' title='"+item["label"]+"'>";
	element+="<span class='sidebar-item-icon sidebar-item-icon-custom' item-icon='"+item["icon"]+"'><svg class='sidebar-icon icon  icon-md' style=''>";
	element+="<use class='' href='#icon-"+item["icon"]+"'></use>";
	element+="</svg></span><span class='sidebar-item-label'>"+item["label"]+"<span></span></span></span>";
	element+="</div></div>";
	
	for (var i=0;i<item.childs.length;i++){
		

	}
	sidebar.append(element);
}
