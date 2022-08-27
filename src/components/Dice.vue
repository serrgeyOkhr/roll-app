<template>
  <div class="text-body1 dice_component q-px-sm q-mx-xs">
    <q-btn flat @click="changeDiceNumber()" label="+" />
    <div>{{ allData[diceValue] }}{{ diceValue }}</div>
    <!-- <pre>{{ diceValue }}</pre> -->
    <q-btn
      flat
      @click="changeDiceNumber('decreese')"
      disable
      v-if="allData[diceValue] < 1"
      >-</q-btn
    >
    <q-btn flat @click="changeDiceNumber('decreese')" v-else>-</q-btn>
  </div>
</template>

<script>
import { toRef } from "@vue/reactivity";
export default {
  name: "Dice-component",
  props: {
    dice_value: {
      type: String,
    },
    data: {
      type: Object,
      default: () => ({
        d20: 0,
        d12: 0,
        d10: 0,
        d8: 0,
        d6: 0,
        d4: 0,
        d2: 0,
        d100: 0,
      }),
    },
  },
  setup(props) {
    // const diceNumber = ref(0);
    const diceValue = toRef(props, "dice_value");
    const allData = toRef(props, "data");
    // console.log(allData.value["d20"]);
    function changeDiceNumber(type = "increase") {
      if (type === "increase") {
        allData.value[diceValue.value] += 1;
      } else {
        allData.value[diceValue.value] -= 1;
      }
    }
    return {
      // diceNumber,
      diceValue,
      allData,
      changeDiceNumber,
    };
  },
};
</script>

<style></style>
