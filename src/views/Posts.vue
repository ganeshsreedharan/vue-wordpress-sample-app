<!-- Content view por the specific post-->
<template>
  <div class="row" style="padding-top:3%">
    <div class="col-sm-10">
      <div class="container">
        <div class="mt-2">
          <div class="mx-auto">
            <div class="card customer-card">
              <div class="card-body p-0">
                <div class="container blog-page">
                  <div class="row clearfix">
                    <div v-if="post" :key="post.ID">
                      <div class="card single_post">
                        <div class="body">
                          <h3 class="m-t-0 m-b-5">
                            <router-link :to="'/posts/'+post.ID" v-html="post.title"></router-link>
                          </h3>
                          <ul class="meta">
                            <li>
                              <a href="javascript:void(0);">
                                <i class="zmdi zmdi-account col-blue"></i>
                                Posted By: {{post.author ?post.author.name :'Unknown'}} {{ post.date | moment('from')}}
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
                        <hr class="mt-0" />

                        <div class="body">
                          <div class="img-post m-b-15">
                            <img v-bind:src="post.featured_image ? post.featured_image :'/img/common.jpg'" alt="No Thumbnail Image" />
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
                          <p v-html="post.content"></p>
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
    <div class="col-sm-2" v-if="post">
      <RelatedPostList
        :key="post.ID+'-key'"
        :postId="post.ID"
        :slug="Object.values(post.categories)[0].slug"
      ></RelatedPostList>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store";
import RelatedPostList from "./RelatedPostList";
/*
*Post Componet is responsible for showith content for each post
*/
export default {
  name: "PostComponent",
  components: {
    RelatedPostList
  },
  data() {
    return {
      post: null
    };
  },
  /*
  *
  *Before relading the route populating the Post details
  * 
  */
  beforeRouteEnter(to, from, next) {
    PostUtil.excecuteBeforeUpadate(to.params.postId, next);
  },
  /*
  * Watching the roaute chage
  * 
  */
  beforeRouteUpdate(to, from, next) {
    //if clickng from related post link need to refresh the page
    if (this) {
      store.dispatch("loadPostById", to.params.postId).then(() => {
        this.post = store.state.blogsById;
        next();
      });
    } else {
      PostUtil.excecuteBeforeUpadate(to.params.postId, next);
    }
  },
  created() {},
  computed: mapState(["blogsById"]),
  methods: {},
  mounted(){
     
  }
};

/*
*Utility class to handle common method in PostComponent
*
*/
const PostUtil = {
  excecuteBeforeUpadate(postId, next) {
    //Checking post is already loaded in state 
    const postFromExistingStore = this.checkPostAlreadyLoaded(
      store.state.blogs.posts,
      postId
    );
   // if post is not there in state object
    if (store.state.blogs.length == 0 || !postFromExistingStore) {
     //Fetching the post information
     store.dispatch("loadPostById", postId).then(() => {
        next(vm => {
          vm.post = store.state.blogsById;
        });
      });
    } else {
      //if already in state object refreshing with that data
      next(vm => (vm.post = postFromExistingStore));
    }
  },
  checkPostAlreadyLoaded(blogs, postId) {
    if (blogs) {
      const selectedPost = blogs.find(v => {
        if (v.ID == postId) {
          return v;
        }
      });
      return selectedPost;
    }
    return null;
  }
};
</script>