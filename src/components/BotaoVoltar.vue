<template>
  <span></span>
  <!-- <q-btn flat @click="$router.push(link)">
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="arrow-left" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Voltar</q-item-label>
      </q-item-section>
    </q-item>
  </q-btn> -->
</template>

<script>
export default {
  name: "BotaoVoltar",
  props: {
    link: {
      type: String,
      required: true
    },
  },
};
</script>
