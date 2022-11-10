$(".llayout-side-section").css("display","none");
//action when module clicked from scroll bar
$(".carousel-cell").click(function(){
	clear_selected()
	$(this).addClass( "selected_module");
  });
//action when module clicked from scroll bar , except home
$(".normal-module").click(function(){
	clear_sidebar();
	if ( ! $("#sidebar").attr("class").includes("opened")){
	if (window.innerWidth>400){
	$("body").animate({"width":window.innerWidth-70});}
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
	$("body").animate({"width":"100%"});
	//$(".layout-side-section").css("display","none");
	clear_sidebar();
});
function open_sidebar(){
	$("#sidebar").animate({width:260}, function(){ $("#edit-sidebar").show();});
	$("#opensidebar").hide();
	$("#closesidebar").show();
	if (window.innerWidth>900){
		$("body").animate({"width":window.innerWidth-260});
	}
	
}
function close_sidebar(){
	$("#sidebar").animate({width:70});
	if (window.innerWidth>900){
	$("body").animate({"width":window.innerWidth-70});}
	$("#closesidebar").hide();
	$("#opensidebar").show();
	$("#edit-sidebar").hide();
	$('.sidebar-child').slideUp();
}
$("#opensidebar").click(function(){
	open_sidebar()
});
$("#closesidebar").click(function(){
	close_sidebar();
});
$("#logout-custom").click(function(){
frappe.app.logout();
window.location.href ="/login";
});

$("#edit-sidebar").click(function(){
	var module=$("#module-name").text();
	console.log(module);
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
				var items=r.message["items"];
				$("head").append(r.message["font_css"]);
				$("#sidebar").css("background-image", "linear-gradient("+r.message["direction"]+", "+r.message['color1']+", "+r.message['color2']+")");
				for (var i=0; i<items.length ;i++){
					 insert_element_sidebar(items[i],r.message["font"]);
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
	$('.sidebar-parent').slideDown();
}
function click_parent(parent){
	console.log($("#sidebar").width());
	if (  $("#sidebar").width()<70){open_sidebar();}
	$("[item-parent='"+parent+"']").slideToggle();
};
function insert_element_sidebar(item,font="",type="parent",parent=""){
	var sidebar=$("#sidebar-custom");
	if (type=="parent"){
		var element="<div onclick='click_parent(`"+item["label"]+"`)' style='display:none;' class='sidebar-item-custom sidebar-parent sidebar-item-container is-draggable' item-parent='' item-name='"+item["label"]+"' item-public='1'>";
		element+="<div class='desk-sidebar-item standard-sidebar-item-custom desk-sidebar-item-custom'>";
		element+="<span class='item-anchor align-custom' title='"+item["label"]+"'>";
	}else{
		var element="<div style='display:none;' class='sidebar-item-custom sidebar-child sidebar-item-container is-draggable' item-parent='"+parent+"' item-$name='"+item["label"]+"' item-public='1'>";
		element+="<div class='desk-sidebar-item standard-sidebar-item-custom desk-sidebar-item-custom sidebar-item-child' style='padding-top:0px !important;padding-bottom:0px !important;'>";
		element+="<a href='"+item["url"]+"' class='item-anchor align-custom' title='"+item["label"]+"'>";
	}
	element+="<span class='item-anchor align-custom' title='"+item["label"]+"'>";
	element+="<span class='sidebar-item-icon sidebar-item-icon-custom' item-icon='"+item["icon"]+"'><svg class='sidebar-icon icon  icon-md' style=''>";
	element+="<use class='' href='#icon-"+item["icon"]+"'></use>";
	element+="</svg></span><span class='sidebar-item-label' style='font-family:"+font+"'>"+item["label"]+"<span></span></span>";
		if (type=="parent"){
			element+="</span>"
		}else{element+="</a>"}
	element+="</div></div>";
	sidebar.append(element);
	if (type=="parent"){
	for (var i=0;i<item.childs.length;i++){
		insert_element_sidebar(item.childs[i],font,"child",item["label"])
	}}
}
