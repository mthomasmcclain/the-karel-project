<template>
  <div class="home">
    <h1>The Karel Project</h1>
    <p>This is a placeholder for a project home page.</p>
    <p style="width: 400px;">By intent, the two links below lack internal links that connect to this home project 'entry' page or to each other. One link is intended for learners, one for builders. Use your browswer's 'back' button if you want to explore back and forth.</p>

    <div>
      <router-link to="/karel-builder">Teacher Builder Application</router-link>
    </div>

    <div>
      <router-link to="/karel-player">Student Portal</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  margin-left: 12px;
}
.home p {
  width: 400px;
}
.home * {
  margin: 24px 0;
}
</style>
