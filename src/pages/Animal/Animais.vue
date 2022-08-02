<template>
  <q-page>
    <botao-voltar v-bind:link="'/#'"/>
    <h5 class="q-ml-md text-center">
      <p>ANIMAIS</p>
      <q-btn
        unelevated
        rounded
        color="primary"
        label="Adicionar animal"
        @click="$router.push('/animais/adicionar')"
      />
    </h5>
    <div class="q-pa-md row items-start">
      <q-card
        class="my-card q-mt-md q-pa-sm col-12"
        v-for="(animal, index) in animais"
        :key="index"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12">
              <div class="text-h6">
                <div class="row">
                  <div class="col">ID: {{ animal.id }}</div>
                  <div class="col-auto q-ml-md">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item
                            clickable
                            @click="handleSubmitRemove(animal.id)"
                          >
                            <q-item-section>Remover</q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            @click="
                              $router.push(`/animais/${animal.id}/editar`)
                            "
                          >
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="text-subtitle2">Raça: {{ animal.raca }}</div>
              <div class="text-subtitle2">Peso: {{ animal.peso }}Kg</div>
              <div class="text-subtitle2">Lote: {{ animal.lote_id }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from "../../services/api";
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: "PageAnimais",
  components: {
    BotaoVoltar
  },
  data() {
    return {
      animais: [],
    };
  },
  async mounted() {
    await this.loadAnimais();
  },
  methods: {
    async loadAnimais() {
      try {
        const { data } = await api.get(`/animais`);
        this.animais = data;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar os animais.");
      }
    },
    async handleSubmitRemove(animal_id) {
      try {
        await api.delete(`/animais/${animal_id}`);
        alert("Animal removido com sucesso");

        await this.loadAnimais();
      } catch (e) {
        alert("Ocorreu um erro ao remover o animal");
      }
    },
  },
};
</script>
