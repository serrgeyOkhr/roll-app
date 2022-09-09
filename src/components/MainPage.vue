<template>
  <q-card class="pages">
    <div class="container">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="mails">
          <DiceBag />
        </q-tab-panel>
      </q-tab-panels>

      <!-- <q-separator /> -->
    </div>
    <q-tabs
      v-model="tab"
      dense
      :shrink="true"
      class="bg-grey-3"
      align="justify"
      narrow-indicator
    >
      <q-tab name="alarms" label="Alarms" />
      <q-tab name="movies" label="Movies" />
      <q-tab name="mails" label="Mails" />
    </q-tabs>
  </q-card>
</template>

<script>
import DiceBag from "./DiceBag.vue";
import { ref } from "@vue/reactivity";
export default {
  name: "MainComponent",
  components: {
    DiceBag,
  },
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>

<style>
.pages {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
