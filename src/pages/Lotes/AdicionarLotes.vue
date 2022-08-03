<template>
  <q-page>
    <botao-voltar v-bind:link="'/#/lotes'"/>
    <h5 class="q-ml-md text-center">ADICIONAR LOTES</h5>
    <div class="q-pa-md row items-start q-gutter-md flex-center">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input
                outlined
                v-model="lote.descricao"
                label="Descrição"
                aria-placeholder="Informe a descrição"
                aria-required="true"
              />
            </div>
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input
                outlined
                v-model="lote.qtd"
                label="Quantidade"
                aria-placeholder="Informe a quantidade"
                aria-required="true"
                type="number"
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
import api from "../../services/api";
import BotaoVoltar from 'components/BotaoVoltar.vue'
export default {
  name: "PageAdicionarLotes",
  components: {
    BotaoVoltar
  },
  data() {
    return {
      lote: {
        descricao: "",
        qtd: ""
      }
    }
  },

  methods: {
    async handleSubmit() {
      try {
        const loteData = this.lote;
        await api.post(`/lotes`, { ...this.lote });
        alert("Lote adicionado com sucesso");
        this.$router.push("/lotes");
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao salvar as informações.");
      }
    },
  },
};
</script>
