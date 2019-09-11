<template>
<nav class="navbar">
    <div class="navbar-container">
      <a class="navbar-brand" href="#">chuboy</a>
      <input class="navbar-toggler" type="checkbox"/>
      <div class="hamburger">
        <div></div>
      </div>
      <ul class="navbar-menu">
        <nuxt-link to="/projects"><li>Projects</li></nuxt-link>
        <nuxt-link to="/handmade"><li>Components</li></nuxt-link>
        <nuxt-link to="/games"><li>Games</li></nuxt-link>
        <nuxt-link to="/"><li>About</li></nuxt-link>
      </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: 'navbar',
    props: {logo:String,links:Array},
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  z-index: 946;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.navbar-container {
  margin: 0 auto;
  max-width: 960px;
}

.navbar-brand {
  line-height: 50px;
  padding: 0 20px;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  text-decoration: none;
  float: left;
}

.navbar-toggler {
  position: fixed;
  top: 5px;
  right: 15px;
  cursor: pointer;
  opacity: 0;
  width: 40px;
  height: 40px;
  margin: 0;
  z-index: 100;
}

.hamburger {
  position: fixed;
  top: 5px;
  right: 15px;
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  float: right;
}
.hamburger > div {
  position: relative;
  width: 60%;
  height: 3px;
  background: #fff;
  transition: 0.4s;
}
.hamburger > div:before {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 3px;
  background: inherit;
}
.hamburger > div:after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 3px;
  background: inherit;
  top: 10px;
}

.navbar-toggler:checked + .hamburger > div {
  transform: rotate(135deg);
}
.navbar-toggler:checked + .hamburger > div:before, .navbar-toggler:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}

.navbar-menu {
  display: flex;
  float: right;
  margin: 0;
  padding: 0 20px;
}
li {
  height: 50px;
  list-style-type: none;
  padding: 0 20px;
}
a {
  height: 100%;
  line-height: 50px;
  text-decoration: none;
  color: #fff;
}
li:hover {
  box-shadow: 0 -5px 0 0 #fff inset;
}
@media screen and (max-width: 760px) {
  .navbar-brand{
    float: none;
  }

  .hamburger {
    display: flex;
  }

  .navbar-menu {
    display: block;
    float: none;
    text-align: center;
    overflow: hidden;
    transition: 0.5s ease-out;
    max-height: 0;
    padding: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .navbar-toggler:checked ~ .navbar-menu {
    transition: 0.5s ease-in;
    max-height: 300px;
  }
  li:hover {
    box-shadow: none;
    background: rgba(0,0,0,0.5);
  }
}
</style>