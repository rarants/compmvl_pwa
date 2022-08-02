<template>
  <q-page>
    <botao-voltar v-bind:link="'/#'"/>
    <h5 class="q-ml-md text-center"> 
      <p>CAMPOS</p> 
      <q-btn 
        unelevated 
        rounded 
        color="primary" 
        label="Adicionar campo" 
        @click="$router.push('/campos/adicionar')"
      />
    </h5>
    <div class="q-pa-md row items-start">
      <q-card 
        class="my-card q-mt-md q-pa-sm col-12" 
        v-for="(campo, index) in campos" 
        :key="index"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col-12">
              <div class="text-h6">
                <div class="row">
                  <div class="col"> {{ campo.nome }}</div>
                  <div class="col-auto q-ml-md">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable @click="handleSubmitRemove(campo.id)">
                            <q-item-section>Remover</q-item-section>
                          </q-item>
                          <q-item clickable @click="$router.push(`/campos/${campo.id}/editar`)">
                            <q-item-section>Editar</q-item-section>
                          </q-item>
                          <q-item clickable @click="$router.push(`/campos/${campo.id}/visualizar`)">
                            <q-item-section>Visualizar</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="text-subtitle2">Tipo:{{ campo.tipo }}</div>
              <div class="text-subtitle2">Condição:{{ campo.condicao }}</div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="row justify-center">
          <q-btn flat @click="$router.push(`/campos/${campo.id}/visualizar`)">Visualizar</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from '../../services/api'
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: 'PageCampos',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      campos: []
    }
  },
  async mounted(){
    await this.loadCampos();
  },
  methods: {
    async loadCampos() {
      try {
          const { data } = await api.get(`/campos`)
          this.campos = data
      } catch (e) {
        console.log(e)
        alert('Ocorreu um erro ao carregar os campos.')
      }
    },
    async handleSubmitRemove(campo_id) {
      try {
        await api.delete(`/campos/${campo_id}`);
        alert("Campo removido com sucesso");
        
        await this.loadCampos();
      } catch (e) {
        alert("Ocorreu um erro ao remover o campo");
      }
    }
  }
}
</script>
