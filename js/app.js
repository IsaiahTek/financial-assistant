const app = new Vue({
	el:'#app',
	data:{
		is_visible : false,
		sliders : ['off-canvas-left', 'scroll-up', 'scroll-down', 'off-canvas-right'],
		chosen_slider : 0,
		budget:null,
		show_modal:false
	},
	methods:{
		//
		open_budget_dialog(){
			this.show_modal = true;
		},
		close_budget_dialog(){
			this.show_modal = false;
		},
		toggleShow(){
			if(aside && page){
				if(this.is_visible){
					this.hideMenu();
				}else{
					this.showMenu();
				}
				this.is_visible = !this.is_visible;
			}
		},
		hideMenu() {
			//slide aside out of view and make page full width;
			let aside = document.getElementById('aside');
			let page = document.getElementById('page');
			// document.getElementById('slide_toggler').classList.remove('inactive');
			document.getElementById('tl').classList.remove('tl-rot');
			document.getElementById('tr').classList.remove('tr-rot');
			document.getElementById('md').classList.remove('md-hide');
			aside.classList.add('aside-leave');
			aside.classList.remove('aside-enter');
			page.classList.remove(this.slider_page_class_enter);
			page.classList.add(this.slider_page_class_leave);
		},
		showMenu(){
			//slide aside into view and make page default width;
			let aside = document.getElementById('aside');
			let page = document.getElementById('page');
			// document.getElementById('slide_toggler').classList.add('inactive');
			document.getElementById('tl').classList.add('tl-rot');
			document.getElementById('tr').classList.add('tr-rot');
			document.getElementById('md').classList.add('md-hide');
			aside.classList.remove('aside-leave');
			aside.classList.add('aside-enter');
			page.classList.remove(this.slider_page_class_leave);
			page.classList.add(this.slider_page_class_enter);
		},
		swipeLeft(){
			if(this.is_visible){
				this.hideMenu();
			}
			this.is_visible = !this.is_visible;
		},
		swipeRight(){
			if (!this.is_visible) {
				this.showMenu()
			}
			this.is_visible = !this.is_visible;
		},
		swipeListener(event){
			let elem =  document.getElementById("app");
			let startPoint = null;
			let endPoint = null;
			elem.ontouchstart = function(event){
				startPoint = event.changedTouches[0].clientX;
			};
			elem.ontouchend = function(event){
			 	endPoint = event.changedTouches[0].clientX;
			 	if (startPoint < (endPoint - 100)) {
			 		app.swipeRight();
			 	}else if(startPoint > (100 + endPoint)){
			 		app.swipeLeft();
			 	}
			}.bind(this);
		}
	},
	computed:{
		slider:{
			set(data){
				this.chosen_slider = data;
			},
			get(){
				return this.sliders[this.chosen_slider];
			}
		},
		slider_page_class_enter(){
			return `page-${this.slider}-enter`;
		},
		slider_page_class_leave(){
			return `page-${this.slider}-leave`;
		}
	}
});
