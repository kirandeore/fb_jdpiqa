<template>
  <div class="apps-page">
    <h1>Apps page</h1>
    <router-view
      :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

