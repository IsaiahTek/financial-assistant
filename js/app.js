let Vue = require('vue')
import store from './store/store.js'
// console.log(store)
const dailyExpenditure = ['Food', 'Water', 'Electricity', 'Accomodation', 'School Fees', 'Transportation', 'Maintenance']
function sumSimilar(collection){
	let creditSum = 0;
	let debitSum = 0;
	collection.forEach(x=>{
		if(x)
		if(x.type.toUpperCase() == 'CREDIT'){
			creditSum = creditSum + Number(x.amount)
		}else if(x.type.toUpperCase() == 'DEBIT'){
			debitSum = debitSum + Number(x.amount)
		}
	})
	return {totalCredit:creditSum, totalDebit:debitSum}
}
function calculateSaving(records){
	let record = sumSimilar(records)
	return record.totalCredit - record.totalDebit
}
// import ActivityDialog from "./components/ActivityDialog"
import RecordView from "./components/RecordView"
import RecordsView from "./components/RecordsView"
import RecordIntro from "./components/RecordIntro"
import CreateRecordDialog from "./components/CreateRecordDialog"
import CreateSavingDialog from "./components/CreateSavingDialog"
import CreateBudgetDialog from "./components/CreateBudgetDialog"
import SavingIntro from "./components/SavingIntro"
import BudgetIntro from "./components/BudgetIntro"
import RecordForm from "./components/RecordForm"
import SavingForm from "./components/SavingForm"
import VNav from "./components/Nav"
const app = new Vue({
	el:'#app',
	mounted(){
		this.$store.dispatch('loadRecords')
	},
	data:{
		savings:Array,
		budgets:Array,
		dialogs:{
			budget:{show_modal:false},
			saving:{show_modal:false},
			record:{show_modal:false}
		},
		isNotify:false,
	},
	components:{
		// ActivityDialog,
		VNav,
		RecordIntro,
		RecordForm,
		RecordView,
		RecordsView,
		SavingIntro,
		CreateRecordDialog,
		CreateSavingDialog,
		CreateBudgetDialog,
		SavingForm,
		BudgetIntro,

	},
	methods:{
		//
		open_dialog(object){
			object.show_modal = true;
		},
		showNotification(){
			this.isNotify = !this.isNotify
		}
	},
	computed:{
		records(){
			return this.$store.getters.records;
		},
		cashFlow(){
			return sumSimilar(Array.from(this.records))
		},
		mySavings(){
			return calculateSaving(Array.from(this.records))
		}
	},
	store,
});
