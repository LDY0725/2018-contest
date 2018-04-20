<template>
  <div id="header">
        <div class="one">
            <span>2048</span>
            <div class="best">
                <span>best</span>
                <br>
                <span id="bestScore">{{best}}</span>
            </div>
            <div class="score">
                <span>score</span>
                <br>
                  <span class="addScore" :class="addScoreClasses" v-if="addScore != 0">+{{addScore}}</span>
                <span id="currentScore">{{current}}</span>
            </div>
        </div>
        <div class="reStart" @click="newGame">
            New Game
        </div>
  </div>
</template>

<script>
import { mapGetters ,mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters(["current", "best","addScoreClasses","addScore"])
  },
  methods: {
    ...mapMutations(["newGame"])
  },
};
</script>

<style lang="scss" scoped="" type="text/css">
#header {
  width: 21.25rem;
  margin: auto;
}

.one {
  height: 5rem;
  width: 100%;

  .best {
    background-color: #bbada0;
    width: 6rem;
    height: 3.25rem;
    font-size: 1.25rem;
    color: #f9f6f2;
    border-radius: 0.25rem;
    text-align: center;
    float: right;
  }

  .score {
    background-color: #bbada0;
    width: 6rem;
    height: 3.25rem;
    font-size: 1.25rem;
    color: #f9f6f2;
    border-radius: 0.25rem;
    text-align: center;
    position: relative;
    float: right;
    margin-right: 1rem;

    .addScore {
      position: absolute;
      left: 1.4rem;
      color: #776e65;
    }
  }
}

.one > span {
  color: #776e65;
  font-size: 3rem;
}

.none {
  display: none
}
.reStart {
  background-color: #8f7a66;
  font-size: 1.25rem;
  color: #f9f6f2;
  width: 7rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.25rem;
  margin: 0 auto 2rem auto;
  cursor: pointer;
}
</style>
