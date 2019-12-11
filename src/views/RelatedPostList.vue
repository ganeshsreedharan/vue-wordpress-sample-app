<template>
  <div class="mt-2">
    <div class="mx-auto">
      <div class="card customer-card">
        <div class="card-body p-0">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <i class="zmdi zmdi-label col-amber"></i> Related Posts
              </a>
            </li>
          </ul>
          <hr class="mt-0" />
          <div v-for="post in relatedPosts" :key="post.ID">
          <div class="body" v-if="postId != post.ID" >
                          <h3  class="m-t-0 m-b-5">
                            <router-link :key="$route.fullPath"
                              :to="{name:'PostComponent',params:{
                                 postId:post.ID
                              }}"
                              v-html="post.title"
                            ></router-link>
                          </h3>
            <hr class="mt-0" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
* listing related posts
*/
import { mapState } from "vuex";
export default {
  name: "RelatedPostList",
  props: {
    slug:null,
    postId:null
  },
  mounted() {
    this.updateRelatedPosts();
  },
  updated(){
     //this.updateRelatedPosts();
  },
  methods:{
    updateRelatedPosts(){
       // Similar type post listing api is not working its shows 405 Unauthorized Error
    // So fetching related categoty 3 Posts
    this.$store.dispatch("loadRelatedPosts", {
      category: this.slug,
      number: 4
    });
    }
  },
  computed: mapState(["relatedPosts"])
};
</script>