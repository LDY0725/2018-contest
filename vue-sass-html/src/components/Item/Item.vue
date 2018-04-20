<template>
    <div id="item" :class="classes">
        <span v-if="num != 0">{{num}}</span>
    </div>
</template>

<script>
export default {
  props: ["num", "classes"]
};
</script>

<style lang="scss" scoped="" type="text/css">
$itemStyle: (2, #776e65, #eee4da), (4, #776e65, #ede0c8), (8, #f9f6f2, #f2b179),
  (16, #f9f6f2, #f59563), (32, #f9f6f2, #f67c5f), (64, #f9f6f2, #f65e3b),
  (128, #f9f6f2, #edcf72), (256, #f9f6f2, #edcc62), (512, #f9f6f2, #edc850),
  (1024, #f9f6f2, #edc53f), (2048, #f9f6f2, #edc22e);

@each $num, $color, $backgroundcolor in $itemStyle {
  .item-#{$num} {
    background-color: $backgroundcolor !important;
    color: $color !important;
    @if $num > 512 {
      font-size: 1.75rem !important;
    }
  }
}

#item {
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
</style>
