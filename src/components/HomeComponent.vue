<template>
<!-- Home component to show all the post thumbnail -->
  <div class="row" style="padding-top:3%">
    <SideBarComponent v-on:childToParent="loadPostsByInput"></SideBarComponent>
    <div class="col-sm-9">
      <div class="container">
        <div class="mt-2">
          <div class="mx-auto">
            <div class="card customer-card">
              <div class="card-body p-0">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a href="#" v-on:click="onReload()" class="nav-link">
                      <i class="zmdi zmdi-collection-text"></i> All Blogs
                    </a>
                  </li>
                  <li class="nav-item" v-if="breadCrumb">
                    <a class="nav-link disabled" href="#">/</a>
                  </li>
                  <li class="nav-item" v-if="breadCrumb">
                    <a class="nav-link disabled" href="#">{{breadCrumb}}</a>
                  </li>

                  <li class="ml-auto right">
                    <ul class="list-inline pagination" style="margin-top: 2%; font-color:blue">
                      <li class="list-inline-item">
                        <a
                          class="page-link active"
                          href="#"
                          v-on:click="onPagination('first')"
                        >First</a>
                      </li>
                      <li class="list-inline-item">
                        <a class="page-link" href="#" v-on:click="onPagination('previous')">
                          <h4>
                            <i class="zmdi zmdi-chevron-left"></i>
                          </h4>
                        </a>
                      </li>

                      <li class="list-inline-item">
                        <a class="page-link" href="#" v-on:click="onPagination('next')">
                          <h4>
                            <i class="zmdi zmdi-chevron-right"></i>
                          </h4>
                        </a>
                      </li>
                      <li class="list-inline-item" v-on:click="onPagination('last')">
                        <a class="page-link" href="#">Last</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <hr class="mt-0" />

                <div class="container blog-page">
                  <div class="row clearfix">
                    <div v-for="post in blogs.posts" :key="post.ID" class="col-lg-4 col-md-12">
                      <div class="card single_post">
                        <div class="header">
                          <h2>
                            <strong>#</strong>
                            {{Object.keys(post.tags)[0]}}
                          </h2>
                        </div>
                        <div class="body">
                          <h3 class="m-t-0 m-b-5">
                            <router-link
                              :to="'/posts/'+post.ID"
                              v-html="splitContent(post.title,'title')"
                            ></router-link>
                          </h3>
                          <ul class="meta">
                            <li>
                              <a href="javascript:void(0);">
                                <i class="zmdi zmdi-account col-blue"></i>
                                Posted By: {{post.author?post.author.name :'un'}} {{ post.date | moment('from')}}
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <i class="zmdi zmdi-label col-amber"></i>
                                {{Object.keys(post.categories)[0]}}
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <i class="zmdi zmdi-comment-text col-blue"></i>
                                Comments: {{post.discussion?post.discussion.comment_count : 'NIL'}}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="body">
                          <div class="img-post m-b-15">
                            <img v-bind:src="post.featured_image" alt="Awesome Image" />
                            <div class="social_share">
                              <button class="btn btn-primary btn-icon btn-icon-mini btn-round">
                                <i class="zmdi zmdi-facebook"></i>
                              </button>
                              <button class="btn btn-primary btn-icon btn-icon-mini btn-round">
                                <i class="zmdi zmdi-twitter"></i>
                              </button>
                              <button class="btn btn-primary btn-icon btn-icon-mini btn-round">
                                <i class="zmdi zmdi-instagram"></i>
                              </button>
                            </div>
                          </div>
                          <p v-html="splitContent(post.excerpt)"></p>
                          <router-link
                            :to="'/posts/'+post.ID"
                            class="btn btn-round btn-info"
                          >Read More</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBarComponent from "./SideBarComponent";
export default {
  name: "HomeComponent",
  components: {
    SideBarComponent
  },
  data() {
    return {
      params: {
        number: 25
      },
      pageCount: 1,
      breadCrumb: null
    };
  },
  methods: {
    /*
    * Title & content size making limited length
    * TODO: should use filter but cant use with v-html thats why
    * used as method
    * @params: text 
    * @param: title -Title/Content
    */
    splitContent: (text, title) => {
      let content = document.createElement("p");
      content.innerHTML = text;
      text = content.innerText;
      if (title != null) {
        if (text.length < 57) {
          return text;
        } else {
          return text.substring(0, 52) + " ...";
        }
      } else {
        return text.substring(0, 150) + "...";
      }
    },
    /*
    * Reload the thumbnails with first 25 posts
    */
    onReload() {
      this.$data.params = {
        number: 25
      };
      this.$store.dispatch("loadBlogs", this.$data.params);
      this.$data.breadCrumb = null;
      this.$data.pageCount = 1;
    },
    /*
    * Reload the thumbnails with categories /tag seleccted from the
    * side bar
    */
    loadPostsByInput(type, id) {
      let params = {
        number: 25
      };
      params[type] = id;
      this.$store.dispatch("loadBlogs", params);
      if (id) {
        this.$data.breadCrumb = type + " " + id;
      }
      else{
        this.$data.breadCrumb = null;
      }
      this.$data.params = params;
      this.$data.pageCount = 1;
    },
    /*
    * Reload the thumbnails based on the pagination
    * code will be next ,previous ,first ,last
    */
    onPagination(code) {
      //finding total page count 
      const totalCount = this.blogs.found;
      let totalPages = totalCount / 25;
      totalPages = Math.ceil(totalPages);

      let params = Object.assign({}, this.$data.params);
      
      switch (code) {
        case "next":
          //increment till last page
          if (this.$data.pageCount < totalPages) {
            this.$data.pageCount += 1;
          }
          break;
        case "previous":
           //decrement till last page
          if (this.$data.pageCount > 1) {
            this.$data.pageCount -= 1;
          }
          break;
        case "first":
          //first page
          this.$data.pageCount = 1;
          break;
        case "last":
          //last page
          this.$data.pageCount = totalPages;
          break;
      }
      // loading with the page param eg - http://....&page=this.$data.pageCount..
      params.page = this.$data.pageCount;
      this.$store.dispatch("loadBlogs", params);
    }
  },
  mounted() {
    //loading all pages initially
    this.$store.dispatch("loadBlogs", this.$data.params);
  },
  computed: mapState(["blogs"])
};
</script>


