<template>
    <b-container class="main-slide" >
        <b-row>
            <b-col cols="12" xl="8" lg="12" md="12" xs="12" class="mt-3">
               <h3>{{ getNameByLocalByLang(meta.title) }}​</h3>
               <b-row>
                 <b-col cols="8" xl="8" lg="8" md="8" xs="8" class="mt-3 d-flex">
                    <span>
                        {{ convertDateEnToKh(meta['created_at']).day }}, {{ convertDateEnToKh(meta['created_at']).month }} {{ convertDateEnToKh(meta['created_at']).year }}
                    </span>
                    <div class="viewer px-1 ml-2">
                          <i class="material-icons">visibility</i> {{ meta['viewer'] }} {{ $t('viewer') }}
                    </div>
                 </b-col>
                 <b-col cols="4" xl="4" lg="4" md="4" xs="4" class="mt-3">
                    <a target="_blank" class="float-right fb-share d-flex align-items-center"
                       :href="`https://www.facebook.com/sharer.php?u=${web_url}${url}`">
                       <i class="material-icons">share</i> Facebook 
                       </a>
                 </b-col>
               </b-row>
               <hr>
               <b-row>
                <b-col cols="12" class="content-detail">
                    <div v-html="meta.text"></div>
                </b-col>
               </b-row>
            </b-col>
            <b-col cols="12" xl="4" lg="12" md="12" xs="12" class="mt-3">
               <h5 class="pb-1" style="border-bottom: 3px solid #FD7237;width:fit-content;">
                 អត្ថបទទាក់ទង
                </h5>
                <div v-for="item in relate_content" :key="item" :class="$colorMode.value=='dark'?'text-white' : 'text-light-mode'">
                     <nuxt-link :to="`/Detail/${item.id}/${item.type}`" style="color:white" >
                        <b-row >
                              <b-col cols="3" xl="4" lg="2" md="3" xs="3">
                                  <figure>
                                      <img :src="`${api_key}/image_etec/${item['image']}`" alt="">
                                  </figure>
                              </b-col>
                              <b-col cols="9" xl="8" lg="10" md="9" xs="9" class="pl-0">
                                  <p class="three-line">
                                  {{ getNameByLocalByLang(item.title) }}
                                  </p>
                              </b-col>
                      </b-row>
                    </nuxt-link>
                </div>
                
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import moment from 'moment'
import cookie from 'js-cookie'
import { mapGetters } from 'vuex'
export default{
    colorMode: 'light',
    name: "Detail",
    async asyncData ({ store, $axios, params }) {
        var meta = await $axios.$get(`https://api.kroit.xyz/api/detail/${params.id}/${params.type}`)
      
        return {
            meta: meta
        }
    },
    head(){
        return {
        title: this.getNameByLocalByLang(this.meta.title,'local_name') ,
        meta:[
            { 
                hid: 'og:image', 
                property: 'og:image',
                content: this.api_key+"/image_etec/"+this.meta.image
            },
            { 
                hid: 'og:type', 
                property: 'og:type', 
                content: this.getNameByLocalByLang(this.meta.title,'local_name') 
            },
            {
                hid: "og:title",
                property: "og:title",
                content: this.getNameByLocalByLang(this.meta.title,'local_name'),
            },
            {
                hid: "og:description",
                property: "og:description",
                content: this.getNameByLocalByLang(this.meta.description,'local_name'),
            },
          
          { 
            hid: 'og:image:type',
            property: 'og:image:type',
            content: "image/png"
          },
          { 
            hid: 'og:url',
            property: 'og:url', 
            content: this.web_url+"/Detail/"+this.$route.params.id+"/"+this.$route.params.type
          },
          { 
            hid: 'og:image:width',
            property: "og:image:width", 
            content: "740" 
          },
          { 
            hid: 'og:image:height',
            property: "og:image:height", 
            content: "300" 
          },
        ]
      }
    },
    data(){
        return {
           api_url: process.env.API_URL,
           api_key: process.env.BASE_URL,
           web_url: process.env.WEB_URL,
           detail: {},
           url: this.$route.fullPath,
           image_share: this.$route.query.image,
           id: null,
           type: null,
           relate_content: [],
           image: ''
        }
    },
    mounted() {
       // var lang = cookie.get('lang')
        //this.$i18n.locale = lang
       // this.findById()
        this.get()
        setTimeout(() => {
            this.updateViewer()
        }, 5000);
    },
    computed: {
        ...mapGetters({
            //meta: 'articles/article'
        })
    },
    methods: {
        findById(){
            this.id = this.$route.query.id
            this.type = this.$route.query.type
            this.default = this.$route.query.default ?? null
            var input = {
                id: this.id,
                type: this.type,
                default: this.default
            }
            this.$axios.$post('detail',input).then(response => {
                this.detail = response
                this.detail.date = moment(this.detail.created_at, "YYYYMMDD").fromNow();
                this.image = this.detail.image
            })
        },
        get(){
            var input = {
                id: this.$route.params.id,
                type: this.$route.params.type
            }
            this.$axios.$post('relate/content',input).then(response => {
                this.relate_content = response
            })
        },
        updateViewer(){
            var input = {
                id: this.$route.params.id,
                type: this.$route.params.type
            }
            this.$axios.$post('updateViewer',input).then(res => {

            })
        },
        getApp(){
           this.url =  process.env.baseUrl + this.$route.fullPath
        },
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
        getImage(image) {
            return 'https://etec-api.loveounnas.xyz/image_etec/' + image
        },
        getNameByLocalByLang(name, local = 'latin_name') {
				if (name != '') {
					try {
						name = JSON.parse(name)
						if (this.$i18n.locale == 'en') {
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
}
</script>
<style lang="scss">
.content-detail{
    img{
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
    }
}
</style>