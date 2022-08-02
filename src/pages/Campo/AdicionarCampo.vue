<template>
  <q-page>
    <botao-voltar v-bind:link="'/#/campos'"/>
    <h5 class="q-ml-md text-center"> ADICIONAR CAMPO </h5>
    <div class="q-pa-md row items-start q-gutter-md flex-center">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.nome" 
                label="Nome" 
                aria-placeholder="Digite o nome"
                aria-required="true"
                :rules="[val => !!val || 'Preencha este campo']"
              />
            </div>
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.tipo" 
                label="Tipo" 
                aria-placeholder="Digite o tipo"
                aria-required="true"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-input 
                outlined 
                v-model="campo.condicao" 
                label="Condição" 
                aria-placeholder="Informe a condição"
                aria-required="true"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-btn 
                unelevated 
                rounded 
                color="primary" 
                label="Adicionar" 
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
  name: 'PageAdicionarCampo',
  components: {
    BotaoVoltar
  },
  data () {
    return {
      campo: {
        nome: "",
        tipo: "",
        condicao: ""
      }
    }
  },
  methods: {
    async handleSubmit(){
      try {
        await api.post(`/campos`, { ...this.campo });
        alert("Campo adicionado com sucesso");
        this.$router.push("/campos");
      } catch (e) {
        console.log(e);
        alert('Ocorreu um erro ao salvar as informações.')
      }
    }
  }
}
</script>
