<template>
  <div class="text-body1 dice_component q-px-sm q-mx-xs">
    <q-btn flat @click="changeDiceNumber()" icon="expand_less" />
    <div class="dice_select_body">
      <span class="fz18">{{ allData[diceValue] }}</span>
      <q-icon
        v-if="selectIcon(diceValue)"
        size="lg"
        :name="selectIcon(diceValue)"
      />
      <span v-else>{{ diceValue }}</span>
    </div>
    <q-btn
      flat
      icon="expand_more"
      @click="changeDiceNumber('decreese')"
      disable
      v-if="allData[diceValue] < 1"
    ></q-btn>
    <q-btn
      flat
      icon="expand_more"
      @click="changeDiceNumber('decreese')"
      v-else
    ></q-btn>
    <!-- <q-icon size="lg" :name="d20" /> -->
  </div>
</template>

<script>
import { toRef } from "@vue/reactivity";
import {
  mdiDiceD4Outline,
  mdiDiceD6Outline,
  mdiDiceD8Outline,
  mdiDiceD10Outline,
  mdiDiceD12Outline,
  mdiDiceD20Outline,
  mdiDiceMultipleOutline,
} from "@quasar/extras/mdi-v7";

export default {
  name: "Dice-component",
  // components: {
  //   mdiDiceD12Outline,
  // },
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
    const d4 = mdiDiceD4Outline;
    const d6 = mdiDiceD6Outline;
    const d8 = mdiDiceD8Outline;
    const d10 = mdiDiceD10Outline;
    const d12 = mdiDiceD12Outline;
    const d20 = mdiDiceD20Outline;
    const d100 = mdiDiceMultipleOutline;
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
    function selectIcon(id) {
      switch (id) {
        case "d20":
          return d20;
        case "d12":
          return d12;
        case "d10":
          return d10;
        case "d8":
          return d8;
        case "d6":
          return d6;
        case "d4":
          return d4;

        default:
          return undefined;
      }
    }
    return {
      // diceNumber,
      diceValue,
      allData,
      changeDiceNumber,
      selectIcon,
      d4,
      d6,
      d8,
      d10,
      d12,
      d20,
      d100,
    };
  },
};
</script>

<style>
.dice_select_body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  /* background-color: #126db3;
  color: #fff;
  box-shadow: 2px 5px 10px -5px #0092ff;
  border: 3px solid #fff; */
  font-size: 18px;
  font-weight: bold;
  min-height: 60px;
}
.fz18 {
  font-size: 22px;
}
</style>
