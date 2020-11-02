<template>
<div class="notfound">
    <img :src="notfoundimg" alt="WoooHooo~ 404 Not Found~" />
</div>
</template>

<script>
import nfimg from "../assets/401.gif";
export default {
    name: 'NotFound',
    props: {
        notfoundimg: {
            type: String,
            default: () => nfimg,
        },
    },
    data() {
        return {};
    },
}
</script>

<style scoped>
img {
    position: relative;
    margin-right: auto;
    margin-left: auto;
    margin-top: 12%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    align-items: center;
}
</style>
