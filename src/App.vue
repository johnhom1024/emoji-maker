<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style lang="scss">
@import '~@/assets/scss/public.scss';
@import "uview-ui/index.scss";
@import '~@/assets/scss/uview.scss';
@import 'tailwindcss/utilities';
</style>
