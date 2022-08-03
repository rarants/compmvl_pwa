<template>
  <q-page>
    <botao-voltar v-bind:link="'/#'"/>
    <h5 class="q-ml-md text-center"> 
      <p>LOTES</p> 
      <q-btn 
        unelevated 
        rounded 
        color="primary" 
        label="Adicionar lote" 
        @click="$router.push('/lotes/adicionar')"
      />
    </h5>
    <div class="q-pa-md row items-start">
      <q-card 
        class="my-card q-mt-md q-pa-sm col-12" 
        v-for="(lote, index) in lotes" 
        :key="index"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12">
              <div class="text-h6">
                <div class="row">
                  <div class="col"> {{ lote.descricao}}</div>
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
                          <q-item clickable @click="$router.push(`/lotes/${lote.id}/visualizar`)">
                            <q-item-section>Visualizar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="text-subtitle2">Descrição:{{ lote.descricao }}</div>
              <div class="text-subtitle2">Quantidade esperada:{{ lote.qtd }}</div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="row justify-center">
          <q-btn flat @click="$router.push(`/lotes/${lote.id}/visualizar`)">Visualizar</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from '../../services/api'
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: 'PageLotes',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      lotes: []
    }
  },
  async mounted(){
    await this.loadLotes();
  },
  methods: {
    async loadLotes() {
      try {
          const { data } = await api.get(`/lotes`)
          this.lotes = data
      } catch (e) {
        console.log(e)
        alert('Ocorreu um erro ao carregar os lote.')
      }
    },
    async handleSubmitRemove(lote_id) {
      try {
        await api.delete(`/lotes/${lote_id}`);
        alert("Lote removido com sucesso");
        
        await this.loadLotes();
      } catch (e) {
        alert("Ocorreu um erro ao remover o lote");
      }
    }
  }
}
</script>
