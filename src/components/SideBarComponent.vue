<!--- Side bar for listing Tags and categories -->
<template>
  <div class="col-sm-3">
    <div class="mt-2" style="padding-left: 6%;">
      <div class="mx-auto">
        <div class="card customer-card">
          <div class="card-body p-0">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link " href="#" v-on:click="onSelectTab(true)">
                  <i class="zmdi zmdi-label col-amber"></i> Tags
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" v-on:click="onSelectTab(false)"> <i class="zmdi zmdi-apps"></i> Catagories</a>
              </li>
            </ul>
            <hr class="mt-0" />
            <div v-if="isActive" class="container" style="margin:3% 3%">
              <div class="md-chips">

                <div
                  class="md-chip md-chip-clickable md-chip-hover" v-on:click="loadPostsByInput()"
                  
                >All tags</div>
                <div
                  class="md-chip md-chip-clickable md-chip-hover"
                  v-for="tag in tags"
                  v-on:click="loadPostsByInput('tag',tag.slug)"
                  :key="tag.slug"
                >{{tag.name}}</div>
              </div>
            </div>
            <div v-if="!isActive" class="container" style="margin:3% 3%">
              <div class="md-chips">
                <div
                  class="md-chip md-chip-clickable md-chip-hover" v-on:click="loadPostsByInput()"
                  
                >All Categories</div>
                
                <div
                  class="md-chip  md-chip-clickable md-chip-hover"
                  v-for="category in categories"
                  v-on:click="loadPostsByInput('category',category.slug)"
                  :key="category.ID"
                >{{category.name}}</div>
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
export default {
  name: "SideBarComponent",
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    /*
    * on Selecting tab loading categoris and tabs
    *
    */
    onSelectTab(isActive) {
      if (isActive) {
        this.$store.dispatch("loadTags");
      } else {
        this.$store.dispatch("loadCategories");
      }
      this.$data.isActive = isActive;
    },
      /*
    * on Selecting item loading post thumbnails on parent (Homecomponent)
    *
    */
    loadPostsByInput(type, id) {
        
      let params = {
        number: 25
      };
      params[type] = id;
        this.$emit('childToParent',type,id)
    }
  },
  computed: mapState([ "tags", "categories"]),
  mounted() {
    this.$store.dispatch("loadTags");
  }
};
</script>
