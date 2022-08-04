<template>
  <q-page>
    <botao-voltar v-bind:link="'/#'"/>
    <h5 class="q-ml-md text-center"> 
      <p>HISTORICOS</p> 
      <q-btn 
        unelevated 
        rounded 
        color="primary" 
        label="Adicionar Historico" 
        @click="$router.push('/historicos/adicionar')"
      />
    </h5>
    <div class="q-pa-md row items-start">
      <q-card 
        class="my-card q-mt-md q-pa-sm col-12" 
        v-for="(historico, index) in historicos" 
        :key="index"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12">
              <div class="text-h6">
                <div class="row">
                  <div class="col"> Data Entrada: {{ historico.entrada}}</div>
                  <div class="col-auto q-ml-md">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable @click="handleSubmitRemove(historico.id)">
                            <q-item-section>Remover</q-item-section>
                          </q-item>
                          <q-item clickable @click="$router.push(`/historicos/${historico.id}/editar`)">
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                          <q-item clickable @click="$router.push(`/historicos/${historico.id}/visualizar`)">
                            <q-item-section>Visualizar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div v-if="!historico.saida" class="text-subtitle2">Saida: {{ historico.saida}}</div>
              <div class="text-subtitle2">Lote:{{ historico.lote_id }}</div>
              <div class="text-subtitle2">Campo:{{ historico.campo_id }}</div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from '../../services/api'
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: 'PageHistoricos',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      historicos: [],
      campo: "",
      lote: "",
    }
  },
  async mounted(){
    await this.loadHistoricos();
  },
  methods: {
    async loadHistoricos() {
      try {
          const { data } = await api.get(`/historicos`)
          this.historicos = data
      } catch (e) {
        console.log(e)
        alert('Ocorreu um erro ao carregar os historicos.')
      }
    },
    async handleSubmitRemove(historico_id) {
      try {
        await api.delete(`/historicos/${historico_id}`);
        alert("Historico removido com sucesso");
        
        await this.loadLotes();
      } catch (e) {
        alert("Ocorreu um erro ao remover o Historico");
      }
    },
    async loadCamposById(id) {
      try {
          const { data } = await api.get(`/campos/${id}`)
          data
      } catch (e) {
        console.log(e)
        alert('Ocorreu um erro ao carregar os campos.')
      }
    }
  }
}
</script>
