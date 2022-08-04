<template>
  <q-page>
    <botao-voltar v-bind:link="'#/lotes'"/>
    <h5 class="q-ml-md text-center"> VISUALIZAR LOTE </h5>
    <div class="q-pa-md row items-start">
      <q-card class="my-card q-mt-md q-pa-sm col-12">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                <div class="row">
                  <div class="col">{{ lote.descricao }}</div>
                  <div class="col-auto q-ml-md">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable @click="handleSubmitRemove(lote.id)">
                            <q-item-section>Remover</q-item-section>
                          </q-item>
                          <q-item clickable @click="$router.push(`/lotes/${lote.id}/editar`)">
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="text-subtitle2">Quantidade:{{ lote.qtd }}</div>
              <div class="text-subtitle2">Animais</div>
              <div class="text-subtitle2" 
              v-for="animal in lote.animais"
              :key=animal.raca>
                {{ animal.raca }} </div>
              <div class="text-subtitle2" 
              v-for="animal in lote.animais"
              :key=animal.peso>
                {{ animal.peso }} </div>  
              <div class="text-subtitle2">historicos</div>
              <div class="text-subtitle2" 
              v-for="historico in lote.historicos"
              :key=historico.entrada>
                {{ historico.entrada }}</div>
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
  name: 'PageVerLotes',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      lote: ""
    }
  },
  async mounted(){
    try {
        const { data } = await api.get(`/lotes/${this.$route.params.id}`)
        this.lote = data
        console.log(data);
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro ao carregar os lotes.')
    }
  },
  methods: {
    async handleSubmitRemove(lote_id) {
      try {
        await api.delete(`/lotes/${lote_id}`);
        alert("Campo removido com sucesso");
        this.$router.push("/lotes");
      } catch (e) {
        alert("Ocorreu um erro ao remover o lote");
      }
    }
  }
}
</script>
