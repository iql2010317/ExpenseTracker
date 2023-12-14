<script>
export default {
    data() {
        return {
            isFlipped: false
        };
    },
    methods: {

        toggleCard() {
            this.isFlipped = !this.isFlipped;
        }
    }
}
</script>

<template>
    點擊翻卡
    <div class="card-container" @click="toggleCard">
        <div class="cover" :class="{ activeCover: isFlipped }">
            <img style="height:100%; width: 100%;" src="https://img.league-funny.com/imgur/161897890082_n.jpg" alt="">
        </div>
        <div class="back" :class="{ activeBack: isFlipped }">
            <img style="height:100%; width: 100%;"
                src="https://storage.cosmoxmusic.com/product/3f985348-d304-42bb-bfa9-30972abaf3df" alt="">
        </div>
    </div>
</template>

<style>
.card-container {
    width: 300px;
    height: 400px;
    position: relative;
    cursor: pointer;
}

.cover,
.back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    transition: transform .75s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cover {
    transform: rotateY(0deg);
}

.back {
    transform: rotateY(-180deg);

}

.activeCover {
    transform: rotateY(180deg);
}

.activeBack {
    transform: rotateY(0deg);
}
</style>