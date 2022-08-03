<template>
  <q-page>
    <botao-voltar v-bind:link="'/#/historicos'"/>
    <h5 class="q-ml-md text-center">ADICIONAR HISTORICOS</h5>
    <div class="q-pa-md row items-start q-gutter-md flex-center">
      <q-card class="my-card q-mt-md q-pa-sm">
        <q-card-section>
          <div class="column items-center no-wrap">
            <div class="col-6 q-mt-md q-pa-sm">
              <q-input
                outlined
                v-model="historico.entrada"
                label="Data Entrada"
                aria-placeholder="Digite a data de entrada"
                aria-required="true"
                q-input mask="##-##-####"
              />
            </div>
            <div class="col-6 q-mt-md q-pa-sm">
               <q-input
                outlined
                v-model="historico.saida"
                label="Data Saida"
                aria-placeholder="Digite a data de saida"
                aria-required="false"
                q-input mask="##-##-####"
              />
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-select
                outlined
                v-model="historico.lote_id"
                :options="lotes"
                label="Lote"
              />
            </div>
            <div class="q-pa-md row items-start q-gutter-md" v-if="lote">
              <q-card class="my-card q-mt-md q-pa-sm">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h6">
                        <div class="row">
                          <div class="col">Lote selecionado</div>
                        </div>
                      </div>
                      <div class="text-subtitle2">Id:{{ lote.id }}</div>
                      <div class="text-subtitle2">
                        Quantidade: {{ lote.quantidade || "-" }}
                      </div>
                      <div class="text-subtitle2">
                        Descrição: {{ lote.descricao || "-" }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mt-md q-pa-sm">
              <q-select
                outlined
                v-model="historico.campo_id"
                :options="campos"
                label="Campo"
              />
            </div>
            <div class="q-pa-md row items-start q-gutter-md" v-if="campo">
              <q-card class="my-card q-mt-md q-pa-sm">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h6">
                        <div class="row">
                          <div class="col">Campo selecionado</div>
                        </div>
                      </div>
                      <div class="text-subtitle2">Id:{{ campo.id }}</div>
                      <div class="text-subtitle2">
                        Nome: {{ campo.nome || "-" }}
                      </div>
                      <div class="text-subtitle2">
                        Condição: {{ campo.condicao || "-" }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
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
  name: "PageAdicionarHistoricos",
  components: {
    BotaoVoltar
  },
  data() {
    return {
      historico: {
        entrada: "",
        saida: "",
        lote_id: " ",
        campo_id: " ",
      },
      lotes: [],
      lote: null,
      campos: [],
      campo: null
    };
  },
  async mounted() {
    await this.loadLotes();
    await this.loadCampos();
  },
  methods: {
    async watchLote() {
      await this.loadLote();
      await this.loadCampo();
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
     async loadCampos() {
      try {
        const { data } = await api.get(`/campos`);
        const campos = data.map(campo => {
          return {
            value: campo.id,
            label: `ID: ${campo.nome} (${campo.condicao})`
          }
        });
        this.campos = campos;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar os campos.");
      }
    },
    async handleSubmit() {
      try {
        const historicoData = this.historico;
        historicoData.lote_id = historicoData.lote_id.value;
        historicoData.campo_id = historicoData.campo_id.value;
        await api.post(`/historicos`, { ...this.historico });
        alert("Historico adicionado com sucesso");
        this.$router.push("/historicos");
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao salvar as informações.");
      }
    },
    async loadLote() {
      try {
        const { data } = await api.get(`/lotes/${this.historico.lote_id.value}`);
        this.lote = data;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar o lote.");
      }
    },
    async loadCampo() {
      try {
        const { data } = await api.get(`/campos/${this.historico.campo_id.value}`);
        this.campo = data;
      } catch (e) {
        console.log(e);
        alert("Ocorreu um erro ao carregar o campo.");
      }
    },
  },
  watch: {
    "historico.lote_id": function() {
      if (this.historico.lote_id) this.watchLote();
      else {
        this.lote = null;
      }
    }
  },
   "historico.campo_id": function() {
      if (this.historico.campo_id) this.watchCampo();
      else {
        this.campo = null;
      }
    }
};
</script>
