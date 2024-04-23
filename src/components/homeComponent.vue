<template>
    <h1>Home</h1>
    <div id="profile" v-if="fbUser">
        <img :src="fbUser.pictureUrl" alt="">
        <p>{{ fbUser.name }}</p>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
}

#profile {
    text-align: center;
}

#profile img {
    border-radius: 50%;
}
</style>

<script setup>
import { ref } from 'vue';

let fbUser = ref()
if (localStorage.getItem('fbProfile')) {
    fbUser.value = JSON.parse(localStorage?.getItem('fbProfile'))
}
console.log(fbUser?.value);
</script>