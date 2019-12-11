import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import  ApiService from '../common/api.service'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
ApiService.init();
/*
* This class is responsible for keeping the sate and monitoring state
* change for the entire app
*/
export default new Vuex.Store({
    state: {
    blogs: {},
    categories:[],
    tags:[],
    blogsById:{},
    relatedPosts:[]
  },
  actions: {
    loadBlogs ({ commit },params) {
        ApiService.get("posts","",{params:params}).then(r => r.data)
        .then(blogs => {
        commit('SET_BLOGS', blogs) 
        })
    },
    loadTags({ commit }) {
         ApiService.get("tags").then(r => r.data)
        .then(blogs => {
        commit('SET_TAGS', blogs.tags)
        })
    },
    loadCategories({ commit }) {
        ApiService.get("categories").then(r => r.data)
        .then(blogs => {
        commit('SET_CATEGORIES', blogs.categories)
        })
    },
    loadRelatedPosts({ commit },params) {
        //Api Gives unauthorized No Document Help 
        /*ApiService.query("posts",postId,"related").then(r => r.data)
        .then(blogs => {
        commit('SET_CATEGORIES', blogs.hits)
        })*/
        ApiService.get("posts","",{params:params}).then(r => r.data)
        .then(blogs => {
          commit('SET_RELATED_POST', blogs.posts)
        })


    },
    async loadPostById({ commit },postId) {
        const post = await ApiService.get("posts",postId)
        commit('SET_ACTIVE_POST', post.data)
    }
},
  mutations: {
    SET_BLOGS (state, blogs) {
      state.blogs = blogs
    },
    SET_TAGS (state, tags) {
        state.tags = tags
    },
    SET_CATEGORIES (state, categories) {
        state.categories = categories
    },
    SET_ACTIVE_POST(state,post){
        state.blogsById = post;
    },
    SET_RELATED_POST(state,relatedPost){
        state.relatedPosts = relatedPost;
    }
  }
})