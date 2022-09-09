<template>
  <div class="container">
    <h3>Roll Dice</h3>
    <!-- <pre v-if="diceThrow.used_dice !== undefined">{{
      diceThrow.used_dice
    }}</pre> -->
    <!-- <q-icon name="mdi-user-circle"></q-icon> -->
    <!-- <q-separator /> -->
    <div
      class="diceTray"
      :class="{
        critMissTray:
          diceThrow.output === 1 &&
          diceThrow.used_dice.length === 1 &&
          diceThrow.used_dice.lastIndexOf('d20') === 0,
        critTray:
          diceThrow.output === 20 &&
          diceThrow.used_dice.length === 1 &&
          (diceThrow.value['d20'].length === 1 ||
            diceThrow.specialRoll === 'adv') &&
          diceThrow.used_dice.lastIndexOf('d20') === 0,
      }"
    >
      <!-- Here will be a dice results -->
      <div
        class="diceTrayFloor"
        :class="{
          critMissFloor:
            diceThrow.output === 1 &&
            diceThrow.used_dice.length === 1 &&
            diceThrow.used_dice.lastIndexOf('d20') === 0,
          critFloor:
            diceThrow.output === 20 &&
            diceThrow.used_dice.length === 1 &&
            (diceThrow.value['d20'].length === 1 ||
              diceThrow.specialRoll === 'adv') &&
            diceThrow.used_dice.lastIndexOf('d20') === 0,
        }"
      >
        <span v-for="(dice, index) in diceThrow.used_dice" :key="index">
          <span> {{ diceThrow.value[dice] }} </span>
          <!-- <pre> {{ dice }} </pre> -->
        </span>
        <span v-if="diceThrow.output && modifier > 0"> + </span>
        <span v-if="diceThrow.output && modifier != 0">{{ modifier }}</span>
        <span v-if="diceThrow.output">=</span>
        <span class="text-h2" v-if="diceThrow.output">
          {{ modifier + diceThrow.output }}
        </span>
      </div>
    </div>
    <div class="savedRolls">
      <!-- Saved rolls -->
      <div class="savedRoll">
        <!-- v-for='(roll, index)' in rolls :key=index -->
      </div>
    </div>
    <div class="diceSelector">
      <!-- active selector component -->
      <DiceComponent
        v-for="(dice, index) in diceNumbers"
        :dice_value="index"
        :data="diceNumbers"
        :key="index"
      />
    </div>
    <div class="actionPlate">
      <div class="modifier">
        <span>Insert Modifier</span>
        <input class="modifier_input" type="number" v-model="modifier" />
      </div>
      <div class="buttonGroup">
        <q-btn
          dense
          icon="south"
          text-color="white"
          class="disBtn"
          style="background-color: #b30f09"
          @click="rollDisadvantage"
          v-if="
            diceNumbers['d20'] === 1 &&
            diceNumbers['d12'] == 0 &&
            diceNumbers['d10'] == 0 &&
            diceNumbers['d8'] == 0 &&
            diceNumbers['d6'] == 0 &&
            diceNumbers['d4'] == 0 &&
            diceNumbers['d2'] == 0 &&
            diceNumbers['d100'] == 0
          "
        />
        <q-btn
          @click="rollDice"
          text-color="black"
          size="xl"
          :loading="loadRoll"
          >ROLL</q-btn
        >
        <q-btn
          dense
          icon="north"
          text-color="white"
          style="background-color: #00b33e"
          @click="rollAdvantage"
          v-if="
            diceNumbers['d20'] === 1 &&
            diceNumbers['d12'] == 0 &&
            diceNumbers['d10'] == 0 &&
            diceNumbers['d8'] == 0 &&
            diceNumbers['d6'] == 0 &&
            diceNumbers['d4'] == 0 &&
            diceNumbers['d2'] == 0 &&
            diceNumbers['d100'] == 0
          "
        />
      </div>
    </div>
    <div class="reset_action">
      <!-- selected dice + modifier + action q-btn -->
      <div class="selected_dice_wrapper">
        <span>Selected dice:</span>
        <div
          class="selected_dice"
          v-for="(dice, index) in diceNumbers"
          :key="index"
          :class="{ show: dice > 0 }"
        >
          <span>{{ dice }}{{ index + "," }}</span>
        </div>
        <!-- <span v-else></span> -->
      </div>
      <div class="action">
        <q-btn @click="resetDice()" flat color="white" text-color="black">
          reset
        </q-btn>
      </div>
    </div>
    <!-- <pre> {{ resultRoll }} </pre> -->
  </div>
</template>

<script>
import DiceComponent from "./Dice.vue";
import { ref } from "@vue/reactivity";
export default {
  name: "DiceBag",
  components: {
    DiceComponent,
  },
  setup() {
    const API_URL = "https://lit-brushlands-54519.herokuapp.com/api/roll";
    const diceNumbers = ref({
      d20: 0,
      d12: 0,
      d10: 0,
      d8: 0,
      d6: 0,
      d4: 0,
      d2: 0,
      d100: 0,
    });
    const modifier = ref(0);
    const loadRoll = ref(false);
    const resultRoll = ref(null);
    let diceThrow = ref({});
    function setDefaultDiceThrow() {
      diceThrow.value.output = 0;
      diceThrow.value.used_dice = [];
      diceThrow.value.value = {};
    }
    function rollDice() {
      setDefaultDiceThrow();
      getSpecialResult(diceNumbers);
    }
    // function resultSum(value) {
    //   const dice_result = ref(0);
    //   console.log(value);
    //   for (const iterator in value) {
    //     value[iterator].forEach((el) => {
    //       dice_result.value += el;
    //     });
    //   }
    //   return dice_result.value;
    // }
    function format_result(result, specialRoll = undefined) {
      diceThrow.value.raw_value = result;
      diceThrow.value.specialRoll = specialRoll;
      if (specialRoll === "dis") {
        diceThrow.value.output = result["d20"].sort((a, b) => a - b)[0];
      } else if (specialRoll === "adv") {
        diceThrow.value.output = result["d20"].sort((a, b) => b - a)[0];
      } else {
        for (const i in result) {
          result[i].forEach((el) => {
            diceThrow.value.output += el;
          });
        }
      }
      for (const i in result) {
        if (result[i].length > 0) {
          diceThrow.value.used_dice.push(i);
          // let ms = {};
          diceThrow.value.value[i] = result[i];
          // diceThrow.value.value.push(ms);
        }
      }
    }

    function resetDice() {
      diceNumbers.value.d10 = 0;
      diceNumbers.value.d100 = 0;
      diceNumbers.value.d12 = 0;
      diceNumbers.value.d2 = 0;
      diceNumbers.value.d4 = 0;
      diceNumbers.value.d6 = 0;
      diceNumbers.value.d8 = 0;
      diceNumbers.value.d20 = 0;
      modifier.value = 0;
    }

    function getSpecialResult(data, id) {
      loadRoll.value = true;
      const body = JSON.stringify(data.value);
      let myHeaders = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      fetch(API_URL, {
        method: "POST",
        headers: myHeaders,
        body: body,
      })
        .then((response) => response.json())
        .then((result) => {
          format_result(result, id);
          loadRoll.value = false;
        });
    }
    function rollDisadvantage() {
      setDefaultDiceThrow();
      const data = ref({
        d20: 2,
      });
      getSpecialResult(data, "dis");
    }
    function rollAdvantage() {
      setDefaultDiceThrow();
      const data = ref({
        d20: 2,
      });
      getSpecialResult(data, "adv");
    }
    return {
      diceNumbers,
      rollDisadvantage,
      rollAdvantage,
      rollDice,
      resetDice,
      modifier,
      resultRoll,
      diceThrow,
      loadRoll,
    };
  },
};
</script>

<style>
.container {
  width: 95%;
  margin: 0 auto;
}
.reset_action {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.diceSelector {
  display: flex;
  /* width: 95%; */
  justify-content: center;
}

.selected_dice {
  font-size: 16px;
  margin-left: 5px;
  display: none;
}
.buttonGroup {
  display: flex;
}
.disBtn {
  background-color: #b30f09;
}

.show {
  display: block;
}
.modifier {
  display: flex;
  align-items: center;
}
.modifier_input {
  width: 50px;
  border: none;
  margin-right: 15px;
  margin-left: 10px;
}

.selected_dice_wrapper {
  border-bottom: 1px solid;
  border-radius: 5px;
  background-color: rgb(240, 240, 240);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* min-width: 40%; */
  margin-right: 15px;
  padding: 0 5px;
  /* color: #fff; */
}
.action {
  display: flex;
  margin-left: 10px;
}
.actionPlate {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.diceTray {
  min-height: 10vh;
  margin-bottom: 15px;
  /* border: 3px solid #fff; */
  border-radius: 15px;
  position: relative;
  /* width: 95%;
  margin: 0 auto; */
  /* background-color: #2c1e55; */
  box-shadow: 2px 5px 10px -5px #64bcff;
}
.diceTrayFloor {
  position: absolute;
  top: 0;
  bottom: 0;
  /* color: #fff; */
  background-color: rgb(224, 224, 224);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 100%;
  border-radius: 15px;
  transition: 0.5s;
  /* box-shadow: 0px 3px 6px 10px rgb(36, 36, 36) inset; */
  /* transform: rotateX(20deg); */
}
.critMissTray {
  box-shadow: 2px 5px 10px -5px #ff2019;
}
.critMissFloor {
  background-color: #b30f09;
}
.critTray {
  box-shadow: 2px 5px 10px -5px #19ff69;
}
.critFloor {
  background-color: #00b33e;
}
</style>
