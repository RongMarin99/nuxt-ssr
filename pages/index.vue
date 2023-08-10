<template>
  <div>

      <!-- Start Slide -->
      <b-container class="main-slide">
        <b-carousel
          style="text-shadow: 0px 0px 2px #000"
          fade
          :interval="10000"
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            v-for="item in slide" :key="item.index"
          >
          <template #img>
            <figure>
              <nuxt-img 
                loading="lazy"
                fade
                format="webp"
                quality="80"
                :src="`${api_key}/image_etec/${item['image']}`"
                :alt="getNameByLocalByLang(item['title'])"
              />
            </figure>
          </template>
          </b-carousel-slide>
        </b-carousel>
      </b-container>
      <!-- End Slide -->

      <!-- Start Article -->
      <b-container class="mt-5">
        <h2 
          align="center" 
          :class="$colorMode.value=='dark'?'text-orange' : 'text-black'"
        >
          <b>{{ $t('article_popular') }}</b>
        </h2>
        <div class="mt-5">
          <b-tabs pills content-class="mt-3" align="center">
            <b-tab active :title="$t('article')" @click="get(key.article)">
              <!-- <b-row v-if="article_loading" class="mt-5" >
                <b-col cols="12" style="margin-bottom:-3rem">
                  <b-overlay
                        id="overlay-background"
                        show
                        spinner-variant="orange"
                        variant="transparent"
                        opacity=0.85
                        blur="0px"
                        rounded="sm"
                      >
                     <b-skeleton-img height="550px"></b-skeleton-img>
                  </b-overlay>
                </b-col>
                <b-col class="mb-4" cols="12" xl="4" lg="4" md="6" sm="6" v-for="i in 6" :key="i">
                  <div class="card-content-dg p-2">
                    <b-overlay
                        id="overlay-background"
                        show
                        spinner-variant="orange"
                        variant="transparent"
                        opacity=0.85
                        blur="0px"
                        rounded="sm"
                      >
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton-img height="200px"></b-skeleton-img>
                      <b-skeleton animation="wave" class="mt-1" width="25%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                    </b-overlay>
                  </div>
                </b-col>
              </b-row> -->
        
              <b-row class="mt-5">
                <b-col cols="12" class="position-relative " >
                  <figure >
                    <div
                     style="height:500px"
                     class="defualt-show w-100"
                    :style="`background-image: linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 91%)), url('${api_key}/image_etec/${default_article['image']}');`">
                        <div class="main-content-title">
                            <p class="text-white d-flex align-items-center">
                              {{ dateFormat(default_article['created_at']) }}
                              &nbsp;
                              {{ default_article['viewer'] }} {{ $t('viewer') }}
                            </p>
                            <nuxt-link :to="`/Detail/${default_article.id}/${default_article.type}/${default_article.id}`">
                              <h1 class="text-white bg-image-default " >
                                    {{ getNameByLocalByLang(default_article['title']) }}
                              </h1> 
                            </nuxt-link>
                            <div class="button">
                              <nuxt-link :to="`/Detail/${default_article.id}/${default_article.type}/${default_article.id}`">
                                {{ $t('read_more') }}
                              </nuxt-link>
                            </div>
                        </div>
                  </div>
                  </figure>
                </b-col>
                <b-col cols="12" xl="4" lg="4" md="6" sm="6" v-for="item in news" :key="item.index" class="mb-4">
                  <nuxt-link :to="`/Detail/${item.id}/${item.type}`">
                    <div class="card-content-dg p-2">
                      <span class="mb-0 mt-0" style="font-size:13px">
                            {{ dateFormat(item['created_at']) }}
                      </span>
                      <h1 class="three-line title">
                          {{ getNameByLocalByLang(item['title']) }}
                      </h1>
                      <figure class="position-relative">
                        <b-badge class="position-absolute orange-bg" style="top:10px;left:10px">
                          {{ $t('article') }}
                        </b-badge>
                        <nuxt-img 
                          loading="lazy"
                          format="webp"
                          quality="80"
                          :src="`${api_key}/image_etec/${item['image']}`" 
                          :alt="getNameByLocalByLang(item['title'])"
                        />
                        <!-- <img :src="`${api_key}/image_etec/${item['image']}`" :alt="getNameByLocalByLang(item['title'])"> -->
                      </figure>
                      <b-card-text>
                        <div class="viewer px-1">
                          <i class="material-icons">visibility</i> {{ item['viewer'] }} {{ $t('viewer') }}
                        </div>
                        <div :class="$colorMode.value=='dark'?'text-light-mode' : 'text-light-mode'">
                          <p class="four-line description">
                            {{ getNameByLocalByLang(item['description']) }}
                          </p>
                        </div>
                      </b-card-text>
                    </div>
                  </nuxt-link>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" class="d-flex justify-content-center">
                  <section class="">
                      <button class="load_more btn-5" @click="load_more(6,key.article)">
                        <div v-if="article_load_more_loading">
                            {{ $t('view_more') }}
                        </div>
                        <div v-else>
                            <b-spinner small></b-spinner>
                            {{ $t('loading') }}
                        </div>
                      </button> 
                  </section>
                </b-col>
              </b-row>

            </b-tab>
            <b-tab :title="$t('course')"  @click="get(key.course)">
              <b-row v-if="course_loading" class="mt-5" >
                <b-col cols="12" style="margin-bottom:-3rem">
                      <b-overlay
                      id="overlay-background"
                      show
                      spinner-variant="orange"
                      variant="transparent"
                      opacity=0.85
                      blur="0px"
                      rounded="sm"
                    >
                  <b-skeleton-img height="550px"></b-skeleton-img>
                </b-overlay>
                </b-col>
                <b-col class="mb-4" cols="12" xl="4" lg="4" md="6" sm="6" v-for="i in 6" :key="i">
                  <div class="card-content-dg p-2">
                    <b-overlay
                        id="overlay-background"
                        show
                        spinner-variant="orange"
                        variant="transparent"
                        opacity=0.85
                        blur="0px"
                        rounded="sm"
                      >
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton-img height="200px"></b-skeleton-img>
                      <b-skeleton animation="wave" class="mt-1" width="25%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                    </b-overlay>
                  </div>
                </b-col>
              </b-row>

              <b-row v-else class="mt-5">
                <b-col cols="12" class="position-relative " >
                  <figure class="card-content-dg ">
                    <div
                    class="defualt-show w-100 card-content-dg "
                     style="height:500px"
                    :style="`background-image: linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 91%)), url('${api_key}/image_etec/${default_course['image']}');`">
                        <div class="main-content-title">
                            <p class="text-white d-flex align-items-center">
                              {{ dateFormat(default_course['created_at']) }}
                              &nbsp;
                              {{ default_course['viewer'] }} {{ $t('viewer') }}
                            </p>
                            <nuxt-link :to="`/Detail/${default_course.id}/${default_course.type}/${default_course.id}`">
                              <h1 class="text-white bg-image-default" >
                                    {{ getNameByLocalByLang(default_course['title']) }}
                              </h1> 
                            </nuxt-link>
                            <div class="button">
                              <nuxt-link 
                              :to="`/Detail/${default_course.id}/${default_course.type}/${default_course.id}`"
                              >
                                {{ $t('read_more') }}
                              </nuxt-link>
                            </div>
                        </div>
                  </div>
                  </figure>
                </b-col>
                <b-col cols="12" xl="4" lg="4" md="6" sm="6" v-for="item in courses" :key="item.index" class="mb-4">
                  <nuxt-link :to="`/Detail/${item.id}/${item.type}`">
                    <div class="card-content-dg p-2">
                      <span class="mb-0 mt-0" style="font-size:13px">
                            {{ dateFormat(item['created_at']) }}
                      </span>
                      <h1 class="three-line title">
                          {{ getNameByLocalByLang(item['title']) }}
                      </h1>
                      <figure class="position-relative">
                        <b-badge class="position-absolute orange-bg" style="top:10px;left:10px">
                          {{ $t('course') }}
                        </b-badge>
                        <nuxt-img 
                          loading="lazy"
                          format="webp"
                          quality="80"
                          :src="`${api_key}/image_etec/${item['image']}`" 
                          :alt="getNameByLocalByLang(item['title'])"
                        />
                        <!-- <img :src="`${api_key}/image_etec/${item['image']}`" :alt="getNameByLocalByLang(item['title'])"> -->
                      </figure>
                      <b-card-text>
                        <div class="viewer px-1">
                          <i class="material-icons">visibility</i> {{ item['viewer'] }} {{ $t('viewer') }}
                        </div>
                        <div :class="$colorMode.value=='dark'?'text-light-mode' : 'text-light-mode'">
                          <p class="four-line description">
                            {{ getNameByLocalByLang(item['description']) }}
                          </p>
                        </div>
                      </b-card-text>
                    </div>
                  </nuxt-link>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" class="d-flex justify-content-center">
                  <section class="">
                      <button class="load_more btn-5" @click="load_more(6,key.course)">
                        <div v-if="course_load_more_loading">
                            {{ $t('view_more') }}
                        </div>
                        <div v-else>
                            <b-spinner small></b-spinner>
                            {{ $t('loading') }}
                        </div>
                      </button> 
                  </section>
                </b-col>
              </b-row>

            </b-tab>
            <b-tab :title="$t('job')" @click="get(key.job)">
              <b-row v-if="job_loading" class="mt-5" >
                <b-col cols="12" style="margin-bottom:-3rem">
                  <b-overlay
                        id="overlay-background"
                        show
                        spinner-variant="orange"
                        variant="transparent"
                        opacity=0.85
                        blur="0px"
                        rounded="sm"
                      >
                     <b-skeleton-img height="550px"></b-skeleton-img>
                  </b-overlay>
                </b-col>
                <b-col class="mb-4" cols="12" xl="4" lg="4" md="6" sm="6" v-for="i in 6" :key="i">
                  <div class="card-content-dg p-2">
                    <b-overlay
                        id="overlay-background"
                        show
                        spinner-variant="orange"
                        variant="transparent"
                        opacity=0.85
                        blur="0px"
                        rounded="sm"
                      >
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton-img height="200px"></b-skeleton-img>
                      <b-skeleton animation="wave" class="mt-1" width="25%"></b-skeleton>
                      <b-skeleton animation="wave" width="85%"></b-skeleton>
                      <b-skeleton animation="wave" width="95%"></b-skeleton>
                    </b-overlay>
                  </div>
                </b-col>
              </b-row>
             
              <b-row v-else class="mt-5">
                <b-col cols="12" class="position-relative " >
                  <figure >
                    <div
                     style="height:500px"
                     class="defualt-show w-100"
                    :style="`background-image: linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 91%)), url('${api_key}/image_etec/${default_job['image']}');`">
                        <div class="main-content-title">
                            <p class="text-white d-flex align-items-center">
                              {{ dateFormat(default_job['created_at']) }}
                              &nbsp;
                              {{ default_job['viewer'] }} {{ $t('viewer') }}
                            </p>
                            <nuxt-link :to="`/Detail/${default_job.id}/${default_job.type}/${default_job.id}`">
                              <h1 class="text-white bg-image-default" >
                                    {{ getNameByLocalByLang(default_job['title']) }}
                              </h1> 
                            </nuxt-link>
                            <div class="button">
                              <nuxt-link :to="`/Detail/${default_job.id}/${default_job.type}/${default_job.id}`">
                                {{ $t('read_more') }}
                              </nuxt-link>
                            </div>
                        </div>
                  </div>
                  </figure>
                </b-col>
                <b-col cols="12" xl="4" lg="4" md="6" sm="6" v-for="item in job" :key="item.index" class="mb-4">
                  <nuxt-link :to="`/Detail/${item.id}/${item.type}`">
                    <div class="card-content-dg p-2">
                      <b-card-text>
                        <span class="mb-0 mt-0" style="font-size:13px">
                              {{ dateFormat(item['created_at']) }}
                        </span>
                        <h1 class="three-line title">
                            {{ getNameByLocalByLang(item['title']) }}
                        </h1>
                      </b-card-text>
                      <figure class="position-relative">
                        <b-badge class="position-absolute orange-bg" style="top:10px;left:10px">
                          {{ $t('about_job') }}
                        </b-badge>
                        <nuxt-img 
                          loading="lazy"
                          format="webp"
                          quality="80"
                          :src="`${api_key}/image_etec/${item['image']}`" 
                          :alt="getNameByLocalByLang(item['title'])"
                        />
                        <!-- <img :src="`${api_key}/image_etec/${item['image']}`" :alt="getNameByLocalByLang(item['title'])"> -->
                      </figure>
                      <b-card-text>
                        <div class="viewer px-1">
                          <i class="material-icons">visibility</i> {{ item['viewer'] }} {{ $t('viewer') }}
                        </div>
                        <div :class="$colorMode.value=='dark'?'text-light-mode' : 'text-light-mode'">
                          <p class="four-line description">
                            {{ getNameByLocalByLang(item['description']) }}
                          </p>
                        </div>
                      </b-card-text>
                    </div>
                  </nuxt-link>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" class="d-flex justify-content-center">
                  <section class="">
                      <button class="load_more btn-5" @click="load_more(6,key.job)">
                        <div v-if="job_load_more_loading">
                            {{ $t('view_more') }}
                        </div>
                        <div v-else>
                            <b-spinner small></b-spinner>
                            {{ $t('loading') }}
                        </div>
                      </button> 
                  </section>
                </b-col>
              </b-row>

            </b-tab>
          </b-tabs>
        </div>
        
      </b-container>
      <!-- End Article -->

      <!-- Start Founder -->
      <b-container class="mt-5">
        <h2 
          align="center" 
          :class="$colorMode.value=='dark'?'text-orange' : 'text-black'"
        >
          <b>{{ $t('founder') }}</b>
        </h2>
        <div class="mt-5">
          <b-row>
            <b-col cols="12" xl="4" lg="4" md="4" sm="4">
              <figure>
                <!-- width 200 -->
                <client-only>
                  <nuxt-img 
                    loading="lazy"
                    format="webp"
                    quality="80"
                    :src="`${api_key}/image_etec/${founder.image}`"
                    :alt="founder.name"
                  />
                </client-only>
              </figure>
            </b-col>
            <b-col cols="12" xl="8" lg="8" md="8" sm="8">
              <h5>
                {{ founder.name }}
              </h5>
              <p>
                {{ founder.description }}
              </p>
              <hr class="mt-5">
              <b-row>
                <b-col cols="6">
                  <a target="_blank" class="text-white" :href="founder.social_media_url">
                    <b-button block class="orange-bg p-2 ml-3 float-left" pill>
                      {{ $t('follow') }}
                    </b-button>
                  </a>
                </b-col>
                <b-col cols="6">
                  <a target="_blank" :href="founder.contact_url">
                    <b-button block pill class="p-2" >
                      {{ $t('contact') }}
                    </b-button>
                  </a>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <!-- End Founder -->
    
  </div>
</template>

<script>
import moment from 'moment';

export default {
  colorMode: 'light',
  async asyncData({$axios}) {
    const slide = await $axios.post('slide/lists').then(res => {
      return res.data.data
    })
    const article = await $axios.$get('setting/article')
    // const default_article = await $axios.$get('setting/article')
    const news = await $axios.post('getAllNews',{skip:0}).then(res => {
      return res.data
    })
    // const founder = await $axios.$get('founder/get')
    return {
      slide: slide.data,
      default_article: article,
      // article_loading: false,
      // article_new_action: false,
      // default_article: default_article,
      news: news.data,
    }
  },
  head () {
    return {
      title: "គ្រូអាយធីចិត្តល្អ | Etec Center | KroIT",
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: "KroIT | ETEC I.T Training Center",
        },
        { 
          hid: 'og:image', property: 'og:image', content: require('../assets/image/logo.jpg')
        },
        {
          hid: "description",
          name: 'description',
          property: "description",
          content: "គ្រូអាយធីចិត្តល្អ |Etec Center | Kroit | korit.net | ETEC I.T Training Center is a School located in Phnom Penh, KH. The business is listed under school category.",
        },
        { 
          hid: 'og-url', property: 'og:url', 
          content: this.web_url
        },
      ]
    }
  },
  name: 'IndexPage',
  components: {
  },
  data() {
    return {
      slide_loading: true,
      web_url: process.env.WEB_URL,
      course_per_page: '',
      course_total: '',
      course_table_size: 0,
      course_loading: true,
      course_new_action: true,
      course_load_more_loading: true,
      article_loading: true,
      article_load_more_loading: true,
      article_table_size: 0,
      article_new_action: false,
      job_loading: true,
      job_load_more_loading: true,
      job_table_size: 0,
      job_new_action: true,
      api_key: process.env.BASE_URL,
      allVideos: [],
      courses: [],
      job: [],
      default_article: '',
      default_job: '',
      key: {
        course: 'course',
        article: 'article',
        job: 'job'
      },
      slide: [],
      url: 'getAllCourse',
      founder: '',
    }
  },
  created(){
   // this.getSlide()
    this.getFounder()
  },
  mounted() {
   // this.getSlide()
    //this.get()
  },
  watch: {
  },
  methods: {
    async get(key='article'){
      if(key==this.key.course){
        if(this.course_new_action){
          await this.$axios.$get('setting/course').then(response => {
            this.default_course = response
          })
          await this.$axios.$post('getAllCourse',{skip: this.course_table_size}).then(response => {
            this.courses = this.courses.concat(response.data)
            this.course_loading = false
            this.course_new_action = false
            this.course_load_more_loading = true
          })
        }
      }else if(key==this.key.article){
        if(this.article_new_action){
            await this.$axios.$get('setting/article').then(response => {
              this.default_article = response
            })
           await this.$axios.$post('getAllNews',{skip: this.article_table_size}).then(response => {
              this.news = this.news.concat(response.data)
              this.article_loading = false
              this.article_new_action = false
              this.article_load_more_loading = true
          })
        }
      }else if(key==this.key.job){
        if(this.job_new_action){
          await this.$axios.$get('setting/job').then(response => {
              this.default_job = response
          })
          await this.$axios.$post('job/lists',{skip: this.job_table_size}).then(response => {
            this.job = this.job.concat(response.data)
            this.job_loading = false
            this.job_new_action = false
            this.job_load_more_loading = true
          })
        }
      }
    },
    getSlide(){
      this.$axios.$post('slide/lists').then(response => {
        this.slide = response.data.data
      })
    },
    getFounder(){
      this.$axios.$get('founder/get').then(response => {
        this.founder = response
      })
      // this.$axios.$get('course/count').then(response => {
      //   this.course_total = response
      // })
    },
    load_more(table_size,key){
      if(key==this.key.course){
        this.course_new_action = true
        this.course_table_size+=table_size
        this.course_load_more_loading = false
      }else if(key == this.key.article){
        this.article_new_action = true
        this.article_table_size+=table_size
        this.article_load_more_loading = false
      }else if(key == this.key.job){
        this.job_new_action = true
        this.job_table_size+=table_size
        this.job_load_more_loading = false
      }
      this.get(key)
    },
    getImage(image) {
        return 'https://etec-api.loveounnas.xyz/image_etec/' + image
    },
    dateFormat(date){
      return moment(date).format('llll')
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
<style>

</style>