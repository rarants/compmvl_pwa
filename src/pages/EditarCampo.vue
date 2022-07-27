<template>
  <q-page>
    <h5 class="q-ml-md"> EDITAR CAMPO </h5>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.nome" 
                label="Nome" 
                aria-placeholder="Digite o nome"
              />
            </div>
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.tipo" 
                label="Tipo" 
                aria-placeholder="Digite o tipo"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.condicao" 
                label="Condição" 
                aria-placeholder="Informe a condição"
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
import api from '../services/api'
export default {
  name: 'PageEditarCampo',
  data () {
    return {
      campo: {
        nome: "",
        tipo: "",
        condicao: ""
      }
    }
  },
  async mounted(){
    try {
        const { data } = await api.get(`/campos/${this.$route.params.id}`)
        this.campo = Object.assign({}, data);
        console.log(data);
    } catch (e) {
      console.log(e)
      alert('Ocorreu um erro ao carregar o campo.')
    }
  },
  methods: {
    async handleSubmit(){
      try {
        await api.put(
          `/campos/${this.$route.params.id}`, 
          { ...this.campo }
        );
        alert("Informações atualizadas com sucesso");
        this.$router.push("/campos");
      } catch (e) {
        alert('Ocorreu um erro ao salvar as informações.')
      }
    },
    async handleSubmitRemove() {
      try {
        await api.delete(
          `/campos/${this.$route.params.id}`);
        alert("Campo removido com sucesso");
        this.$router.push("/campos");
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao remover o campo");
      }
    },
  }
}
</script>
