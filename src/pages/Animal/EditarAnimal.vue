<template>
  <q-page>
    <botao-voltar v-bind:link="'/#/animais'"/>
    <h5 class="q-ml-md text-center"> EDITAR ANIMAL </h5>
    <div class="q-pa-md row items-start q-gutter-md flex-center">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="row">
              <div class="col-12 q-mt-md q-pa-sm">
                <q-input 
                  outlined 
                  v-model="animal.raca" 
                  label="Raça" 
                  aria-placeholder="Digite a raça"
                  :rules="[val => !!val || 'Preencha este campo']"
                />
              </div>
              <div class="col-12 q-mt-md q-pa-sm">
                <q-input 
                  outlined 
                  v-model="animal.peso" 
                  label="Peso" 
                  aria-placeholder="Informe o peso"
                  type="number"
                />
              </div>
              <div class="col-12 q-mt-md q-pa-sm" v-if="lotes">
                <q-select
                  outlined
                  v-model="animal.lote_id"
                  :options="lotes"
                  label="Lote"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-pa-md row items-start" v-if="lote">
                <q-card flat bordered class="my-card q-mt-md q-pa-sm bg-grey-1">
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col-12">
                        <div class="text-h6">
                          <div class="row">
                            <div class="col">Lote selecionado</div>
                          </div>
                        </div>
                        <div class="text-subtitle2">Id: {{ lote.id }}</div>
                        <div class="text-subtitle2">Quantidade: {{ lote.quantidade || "--" }}</div>
                        <div class="text-subtitle2">Descrição: {{ lote.descricao || "--" }}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-mt-md q-pa-sm">
                <q-btn 
                  unelevated 
                  rounded 
                  color="negative" 
                  label="Remover" 
                  @click="handleSubmitRemove"
                />
              </div>
              <div class="col-6 q-mt-md q-pa-sm" >
                <q-btn 
                  unelevated 
                  rounded 
                  color="primary" 
                  label="Salvar" 
                  @click="handleSubmit"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from '../../services/api'
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: 'PageEditarAnimal',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      animal: {
        raca: "",
        peso: "",
        lote_id: ""
      },
      lotes: [],
      lote: null
    }
  },
  async mounted(){
    await this.loadLotes();
    await this.loadAnimal();
    await this.loadLote();
  },
  methods: {
    async watchLote() {
      await this.loadLote();
    },
    async loadAnimal() {
      try {
          const { data } = await api.get(`/animais/${this.$route.params.id}`)
          this.animal = Object.assign({}, data);
      } catch (e) {
        console.log(e)
        alert('Ocorreu um erro ao carregar o animal.')
      }
    },
    async handleSubmit(){
      try {
        await api.put(
          `/animais/${this.$route.params.id}`, 
          { ...this.animal }
        );
        alert("Informações atualizadas com sucesso");
        this.$router.push("/animais");
      } catch (e) {
        alert('Ocorreu um erro ao salvar as informações.')
      }
    },
    async handleSubmitRemove() {
      try {
        await api.delete(
          `/animais/${this.$route.params.id}`);
        alert("Animal removido com sucesso");
        this.$router.push("/animais");
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao remover o animal");
      }
    },
    async loadLotes() {
      try {
        const { data } = await api.get(`/lotes`);
        const lotes = data.map(lote => {
          return {
            value: lote.id,
            label: `ID: ${lote.id} (${lote.descricao})`
          }
        });
        this.lotes = lotes;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar os lotes.");
      }
    },
    async loadLote() {
      try {
        const { data } = await api.get(`/lotes/${this.animal.lote_id}`);
        this.lote = data;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar o lote.");
      }
    },
  },
  watch: {
    "animal.lote_id": function() {
      if (this.animal.lote_id) this.watchLote();
      else this.lote = null;
    }
  }
}
</script>
