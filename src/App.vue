<template>
<div>
    <!-- 留坑，非常重要 -->
    <router-view v-if="isRouterAlive"></router-view>
</div>
</template>

<script>
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true
            });
        },
    },
}
</script>
