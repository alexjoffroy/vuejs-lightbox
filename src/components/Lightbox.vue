<style lang="scss" src="../scss/_lightbox.scss"></style>

<template>
  <div class="lightbox" v-if="visible">
    <div class="lightbox__header">
      <div class="lightbox__counter">{{ counter }}</div>
      <button class="lightbox__control lightbox__control--close" @click.stop="close()"></button>
    </div>
    <div class="lightbox__body">
      <lightbox-slide :source="current.source" :transition="transition" :key="current.source">
        <span slot="loader">
          <slot name="loader">Loading...</slot>
        </span>
      </lightbox-slide>
      <button class="lightbox__control lightbox__control--prev" @click.stop="prev()"></button>
      <button class="lightbox__control lightbox__control--next" @click.stop="next()"></button>
    </div>
    <div class="lightbox__footer">
      {{ current.title }}
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import LightboxSlide from './LightboxSlide.vue'
  import Hammer from 'hammerjs'

  let hammer

  export default {
    props: {
      id: {
        type: String,
        default: 'default',
      },
    },
    components: {
      lightboxSlide: LightboxSlide,
    },
    data () {
      return {
        state: store.state,
        transition: '',
      }
    },
    computed: {
      visible () {
        return this.state.group === this.id && this.state.index !== false
      },
      current () {
        return store.currentPicture()
      },
      counter () {
        return store.counter()
      },
    },
    methods: {
      close () {
        store.close()
      },
      prev () {
        this.transition = 'prev'
        store.prev()
      },
      next () {
        this.transition = 'next'
        store.next()
      },
      onKeyUp (e) {
        if (this.visible) {
          switch (e.keyCode) {
            case 27:
              return this.close()
            case 37:
              return this.prev()
            case 39:
              return this.next()
          }
        }
      },
    },
    mounted () {
      hammer = new Hammer(this.$el.parentNode)
      hammer.on('swipeleft', this.next)
      hammer.on('swiperight', this.prev)
      window.addEventListener('keyup', this.onKeyUp)
    },
    destroyed () {
      hammer.off('swipeleft', this.next)
      hammer.off('swiperight', this.prev)
      window.removeEventListener('keyup', this.onKeyUp)
    },
  }
</script>