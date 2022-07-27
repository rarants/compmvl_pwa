<template>
  <q-page>
    <h5 class="q-ml-md"> VISUALIZAR CAMPO </h5>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
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
      </q-card>
    </div>
  </q-page>
</template>

<script>
import api from '../services/api'
export default {
  name: 'PageVerCampo',
  data () {
    return {
      campo: ""
    }
  },
  async mounted(){
    try {
        const { data } = await api.get(`/campos/${this.$route.params.id}`)
        this.campo = data
        console.log(data);
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro ao carregar os campos.')
    }
  },
  methods: {
    async handleSubmitRemove(campo_id) {
      try {
        await api.delete(`/campos/${campo_id}`);
        alert("Campo removido com sucesso");
        this.$router.push("/campos");
      } catch (e) {
        alert("Ocorreu um erro ao remover o campo");
      }
    }
  }
}
</script>
