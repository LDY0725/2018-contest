<template>
    <div id="container" @touchstart="touchstart" @touchend='touchend'>
        <div class="gameOver" :class="gameOverClass">
            Game Over
            <div class="tryAgain" @click="newGame">
            try again
            </div>
        </div>
        <div class="success" :class="successClasses">
            Success
            <div class="continue" @click="contine">
            contine
            </div>
        </div>
        <div class="backgroud">
            <div class="row">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            </div>
            <div class="row">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            </div>
            <div class="row">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            </div>
            <div class="row">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            </div>
        </div>
        <div class="main" :class="mainClasses">
            <div class="row" v-for="rowdata in data">
                <item v-for="block in rowdata" :num="block.num" :classes="block.classes">
                </item>
            </div>           
        </div>
    </div>
</template>

<script>
import Item from "../Item/Item";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { Item },
  computed: {
    ...mapGetters(["data",'mainClasses','gameOverClass','successClasses'])
  },
  methods: {
    ...mapMutations(["random", "keyup",'newGame','contine','touchend',,'touchstart'])
  },
  mounted() {
    var self = this;
    this.random();
    this.random();
    document.addEventListener("keyup", function(event) {
      self.keyup(event);
    });
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
#container {
  width: 21.25rem;
  margin: auto;
}

.displayBlock {
  display: block !important;
}

.blur {
  filter: blur(2px);
}

.main {
  padding: 0.25rem 0.25rem 0 0.25rem;
  width: 21.25rem;
  height: 22.25rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
}

.backgroud {
  padding: 0.25rem 0.25rem 0 0.25rem;
  z-index: -1;
  position: absolute;
  width: 21.25rem;
  height: 22.25rem;
  background-color: #bbada0;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
}

.row {
  display: flex;
  flex-direction: row;
}

.block {
  margin: 0.25rem;
  width: 5rem;
  height: 5rem;
  border-radius: 0.25rem;
  font-size: 2rem;
  line-height: 5rem;
  text-align: center;
  font-weight: bold;
  background-color: #cdc0b4;
}

.success,
.gameOver {
  position: absolute;
  padding-top: 10rem;
  width: 21.25rem;
  height: 12.25rem;
  z-index: 10;
  color: #8f7a66;
  font-size: 2.25em;
  font-weight: bold;
  text-align: center;
  display: none;
}

.continue,
.tryAgain {
  width: 4rem;
  height: 2rem;
  background-color: #8f7a66;
  font-size: 0.8rem;
  text-align: center;
  color: #f9f6f1;
  line-height: 2rem;
  border-radius: 3px;
  margin: 1rem auto;
  cursor: pointer;
}
</style>
