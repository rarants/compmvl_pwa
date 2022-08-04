<template>
  <q-page>
    <botao-voltar v-bind:link="'/#/lotes'"/>
    <h5 class="q-ml-md text-center"> EDITAR LOTES </h5>
    <div class="q-pa-md row items-start q-gutter-md flex-center">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="lote.descricao" 
                label="Descrição" 
                aria-placeholder="Digite a descrição"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="lote.qtd" 
                label="Quantidade" 
                aria-placeholder="Informe a quantidade"
                type="number"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-btn 
                unelevated 
                rounded 
                color="negative" 
                label="Remover" 
                @click="handleSubmitRemove"
              />
              <q-btn 
                unelevated 
                rounded 
                color="primary" 
                label="Salvar" 
                @click="handleSubmit"
              />
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
  name: 'PageEditarLotes',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      lote: {
        qtd: "",
        descricao: ""
      }
    }
  },
  async mounted(){
    try {
        const { data } = await api.get(`/lotes/${this.$route.params.id}`)
        this.lote = Object.assign({}, data);
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro ao carregar o lote.')
    }
  },
  methods: {
    async handleSubmit(){
      try {
        await api.put(
          `/lotes/${this.$route.params.id}`, 
          { ...this.lote }
        );
        alert("Informações atualizadas com sucesso");
        this.$router.push("/lotes");
      } catch (e) {
        alert('Ocorreu um erro ao salvar as informações.')
      }
    },
    async handleSubmitRemove() {
      try {
        await api.delete(
          `/lotes/${this.$route.params.id}`);
        alert("Lote removido com sucesso");
        this.$router.push("/lotes");
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao remover o lote");
      }
    },
  }
}
</script>
