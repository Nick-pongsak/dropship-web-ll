<template>
  <div class="footer-main">{{this.text}}</div>
</template>

<script>
export default {
  name: 'footers',
  props: ["text"],
  data () {
    return {
    }
  },
  computed: {},
  methods: {}
}
</script>
<style>
.footer-main{
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  color: #000000;

}
</style>
