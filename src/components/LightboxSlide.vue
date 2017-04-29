<style lang="scss" src="../scss/_lightbox-slide.scss"></style>

<template>
  <transition :name="'lightbox-slide--' + transition">
    <div class="lightbox-slide">
      <img :src="src" alt="" class="lightbox-slide__image" v-if="!loading">
      <span v-if="loading" class="lightbox-slide__loader">
        <slot name="loader"></slot>
      </span>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      source: String,
      transition: String,
    },
    data () {
      return {
        src: null,
        loading: true,
      }
    },
    mounted () {
      let image = new Image()
      image.onload = () => {
        this.loading = false
        this.src = this.source
      }
      image.src = this.source
    },
  }
</script>