<!-- Header componet to show the page header-->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <ul class="nav nav-tabs hide-small">
        <li class="nav-item active">
          <router-link :to="{name:'HomeComponent'}" class="nav-link active" href="#">
            <img src="../assets/truecaller.png" class="text-primary align-middle" /> Wordpress blogs
          </router-link>
        </li>
      </ul>
      <router-link :to="{name:'HomeComponent'}" class="ml-auto" href="#">
        <img src="../assets/wordpress.png" class="text-primary align-middle" />
      </router-link>

      <ul class="navbar ml-auto" style="box-shadow: none">
        <li class="nav-item">
          <form class="form-inline ml-auto" style="margin-bottom: 6px;">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search blogs"
              aria-label="Search"
            />
            <button class="btn-search">
              <i class="zmdi zmdi-search"></i>
            </button>
          </form>
        </li>
        <li class="nav-item dropdown d-xl-inline-block mt-1">
          <a
            class="nav-link dropdown-toggle pt-0"
            id="UserDropdown"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <img class="img-xs rounded-circle" src="../assets/face1.jpg" alt="Profile image" />
          </a>
          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="UserDropdown"
          >
            <a class="dropdown-item">
              <i class="zmdi zmdi-sign-in pr-2"></i> Sign Out
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <!--/.Navbar -->
</template>
<script>
export default {
  name: "HeaderComponent"
};
</script>