const Budget = Vue.extend({
	template:'#budget-intro',
	data(){
		return{
			//
		}
	},
	props:['dialogs'],
	methods:{
		open_dialog(object){
			object.show_modal = true;
		}
	},
	computed:{
		dialog(){
			return this.dialogs.budget;
		}
	}
});
Vue.component('budget-intro', Budget);
const CreateBudgetDialog = Vue.extend({
	template:"#activity-dialog",
	data:function(){
		return{
			form_data:'What soeve ais iko',
		}
	},
	props:['dialogs'],
	methods:{
		//
		close_dialog(object){
			object.show_modal = false;
		},
	},
	computed:{
		dialog(){
			return this.dialogs.budget;
		},
		lastSaved(){
			//
		}
	}
});
Vue.component('create-budget-dialog', CreateBudgetDialog);

const Saving = Vue.extend({
	template:'#saving-intro',
	data(){
		return{
			//
		}
	},
	props:['dialogs'],
	methods:{
		open_dialog(object){
			object.show_modal = true;
		}
	},
	computed:{
		dialog(){
			return this.dialogs.saving;
		}
	}
});
Vue.component('saving-intro', Saving);
const CreateSavingDialog = Vue.extend({
	template:"#activity-dialog",
	data(){
		return{
			form_data:'Real Value',
		}
	},
	props:['dialogs'],
	methods:{
		//
		close_dialog(object){
			object.show_modal = false;
		},
	},
	computed:{
		dialog(){
			return this.dialogs.saving;
		},
		lastSaved(){
			//
		}
	}
});
Vue.component('create-saving-dialog', CreateSavingDialog);

const Record = Vue.extend({
	template:'#record-intro',
	data(){
		return{
			//
		}
	},
	props:['dialogs'],
	methods:{
		open_dialog(object){
			object.show_modal = true;
		}
	},
	computed:{
		dialog(){
			return this.dialogs.record;
		}
	}
});
Vue.component('record-intro', Record);
const CreateRecordDialog = Vue.extend({
	template:"#activity-dialog",
	props:['dialogs'],
	methods:{
		//
		close_dialog(object){
			object.show_modal = false;
		},
	},
	computed:{
		dialog(){
			return this.dialogs.record;
		},
		lastSaved(){
			return this.$parent.records[1];
		}
	},

});
Vue.component('create-record-dialog', CreateRecordDialog);
Vue.component('record-form', {
	template:'#record-form',
	data:function(){
		return{
			transaction_types:['Credit', 'Debit'],
			form_data:{
				type:null,
				amount:null,
				description:null,
				title:null,
			},
		}
	},
	methods:{
		addRecord(){
			localStorage.setItem(`record-${localStorage.length+1}`, JSON.stringify(this.form_data));
			location.reload();
		}
	},
})
Vue.component('records',{
	template:'#records',
	computed:{
		records(){
			let records = [];
			for (var i = 1; i <= localStorage.length; i++) {
				records.push(JSON.parse(localStorage.getItem(`record-${i}`)));
			}
			return records;
		}
	}
})
Vue.component('record', {
	template:'#record',
	computed:{
		record(){
			return this.$parent.$parent.records[this.$parent.$parent.records.length-1]
		}
	}
})
const app = new Vue({
	el:'#app',
	data:{
		is_visible : false,
		sliders : ['off-canvas-left', 'scroll-up', 'scroll-down', 'off-canvas-right'],
		chosen_slider : 0,
		budget:null,
		object:null,
		dialogs:{
			budget:{show_modal:false},
			saving:{show_modal:false},
			record:{show_modal:false}
		}
	},
	methods:{
		//
		open_dialog(object){
			object.show_modal = true;
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
		},
		records(){
			let records = [];
			for (var i = 1; i <= localStorage.length; i++) {
				records.push(JSON.parse(localStorage.getItem(`record-${i}`)));
			}
			return records;
		}
	}
});
