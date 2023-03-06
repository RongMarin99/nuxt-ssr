import Vue from 'vue'
import moment from 'moment'
if (!Vue.__my_mixin__) {
	Vue.__my_mixin__ = true
	Vue.mixin({
		methods: {
			convertDateEnToKh(date) {
				var day = moment(date).format('DD').toString()
				var month = moment(date).format('MM').toString()
				var year = moment(date).format('YYYY').toString()
				var days = '';
				var months = '';
				var years = '';
				for (var i = 0; i < day.length; i++) {
					days += this.convertNmberEnKh(day.charAt(i));
				}
				months = this.convertMonthEnKh(month);
				for (var i = 0; i < year.length; i++) {
					years += this.convertNmberEnKh(year.charAt(i));
				}
				let result = {
					day: days,
					month: months,
					year: years,
				}
				return result;
			},

			convertNmberEnKh(number) {
				let numbers = '';
				switch (parseInt(number)) {
					case 0:
						numbers = "០";
						break;
					case 1:
						numbers = "១";
						break;
					case 2:
						numbers = "២";
						break;
					case 3:
						numbers = "៣";
						break;
					case 4:
						numbers = "៤";
						break;
					case 5:
						numbers = "៥";
						break;
					case 6:
						numbers = "៦";
						break;
					case 7:
						numbers = "៧";
						break;
					case 8:
						numbers = "៨";
						break;
					case 9:
						numbers = "៩";
						break;
				}
				return numbers;
			},

			convertMonthEnKh(number) {
				let numbers = '';
				switch (parseInt(number)) {
					case 0:
						numbers = "";
						break;
					case 1:
						numbers = "មករា";
						break;
					case 2:
						numbers = "កុម្ភះ";
						break;
					case 3:
						numbers = "មីនា";
						break;
					case 4:
						numbers = "មេសា";
						break;
					case 5:
						numbers = "ឧសភា";
						break;
					case 6:
						numbers = "មិថុនា";
						break;
					case 7:
						numbers = "កក្កដា";
						break;
					case 8:
						numbers = "សីហា";
						break;
					case 9:
						numbers = "កញ្ញា";
						break;
					case 10:
						numbers = "តុលា";
						break;
					case 11:
						numbers = "វិច្ឆិកា";
						break;
					case 12:
						numbers = "ធ្នូ";
						break;
				}
				return numbers;
			},
			getNameByLocalByLang(name, local = 'latin_name') {
				if (name != '') {
					try {
						name = JSON.parse(name)
						if (this.$store.state.lang.locale == 'en') {
							return name.latin_name
						} else {
							return name.local_name
						}
					} catch (e) {
						return name
					}
				} else {
					return null
				}
		    },
		}
	})
}