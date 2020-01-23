let is_visible = false;
let sliders = ['off-canvas-left', 'contain'];
let off_canvas = 0;
let choice_slider = null;
let toggleHandle = document.getElementById('menu_ball')
function toggleShow(){
	if(aside && page){
		if(is_visible){
			hideMenu();
		}else{
			showMenu();
		}
		is_visible = !is_visible;
	}
}
toggleHandle.addEventListener('click', toggleShow)
function hideMenu() {
	//slide aside out of view and make page full width;
	
	let slider_page_class_enter = `page-${choice_slider}-enter`;
	let slider_page_class_leave = `page-${choice_slider}-leave`;
	let aside = document.getElementById('aside');
	let page = document.getElementById('page');
	// document.getElementById('slide_toggler').classList.remove('inactive');
	document.getElementById('tl').classList.remove('tl-rot');
	document.getElementById('tr').classList.remove('tr-rot');
	document.getElementById('md').classList.remove('md-hide');
	aside.classList.add('aside-leave');
	aside.classList.remove('aside-enter');
	page.classList.remove(slider_page_class_enter);
	// page.classList.add(slider_page_class_leave);
}
function showMenu(){
	//slide aside into view and make page default width;
	choice_slider = sliders[off_canvas];
	let slider_page_class_enter = `page-${choice_slider}-enter`;
	let slider_page_class_leave = `page-${choice_slider}-leave`;
	let aside = document.getElementById('aside');
	let page = document.getElementById('page');
	// document.getElementById('slide_toggler').classList.add('inactive');
	document.getElementById('tl').classList.add('tl-rot');
	document.getElementById('tr').classList.add('tr-rot');
	document.getElementById('md').classList.add('md-hide');
	aside.classList.remove('aside-leave');
	aside.classList.add('aside-enter');
	page.classList.remove(slider_page_class_leave);
	page.classList.add(slider_page_class_enter);
}
function moveEnd(event) {
 // Process the event
 // console.log(event.changedTouches[0].clientX);
}
document.onload = swipeListener()
function swipeListener() {
 var el=document.getElementById("target1");
 let startPoint = null;
 let endPoint = null;
 el.ontouchstart = function(event){
 	if((event.target.id||event.target.parentNode.id) == 'menu_ball'){
 		//
 	}else{
	 	startPoint = event.changedTouches[0].clientX;
 	}
 }
 el.ontouchend = function(event){
 	endPoint = event.changedTouches[0].clientX;
 	if (startPoint < (endPoint - 100)) {
 		swipeRight();
 	}else if(startPoint > (100 + endPoint)){
 		swipeLeft();
 	}
 }
}
function swipeLeft(){
	if(is_visible){
		hideMenu();
	}
	is_visible = !is_visible;
}
function swipeRight(){
	if (!is_visible) {
		showMenu()
	}
	is_visible = !is_visible;
}