<template>
  <FormularioVue @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <CaixaVue v-if="listaEstaVazia">
      Você não acompanhou nenhuma tarefa hoje.
    </CaixaVue>
    <div class="field">
      <p class="control has-icons-left">
        <input
            class="input"
            type="text"
            placeholder="Digite para pesquisar"
            v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaVue
        v-for="(tarefa, indice) of tarefas"
        v-bind:key="indice"
        v-bind:tarefa="tarefa"
        @tarefaFoiClicada="selecionarTarefa">
    </TarefaVue>
    <ModalVue v-bind:mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
        <template v-slot:cabecalho>
          <p class="modal-card-title">
            Editando tarefa
          </p>
          <button class="delete"
              aria-label="close"
              @click="fecharModal">
          </button>
        </template>
        <template v-slot:corpo>
          <div class="field column is-12">
            <label for="descricaoDaTarefa" class="label">
              Descrição
            </label>
            <input
                type="text"
                class="input"
                id="descricaoDaTarefa"
                v-model="tarefaSelecionada.descricao" />
          </div>
        </template>
        <template v-slot:rodape>
          <button class="button is-success"
              @click="alterarTarefa">
            Salvar mudanças
          </button>
          <button class="button"
              @click="fecharModal">
            Cancelar
          </button>
        </template>
    </ModalVue>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, ref, watchEffect } from 'vue';

  import TarefaInterface from '../interfaces/TarefaInterface';

  import CaixaVue from '../components/Caixa.vue';
  import FormularioVue from '../components/Formulario.vue';
  import TarefaVue from '../components/Tarefa.vue';
  import ModalVue from '../components/Modal.vue';
  import { useStore } from '@/stores';
  import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/stores/tipos-de-acoes';

  export default defineComponent({
    name: 'TarefasView',
    data() {
      return {
        tarefaSelecionada: null as TarefaInterface | null
      }
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0;
      }
    },
    components: {
      ModalVue,
      CaixaVue,
      TarefaVue,
      FormularioVue
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS);
      store.dispatch(OBTER_PROJETOS);

      const filtro: Ref<string> = ref("");
      const tarefas = computed(() => store.state.moduloTarefa.tarefas)

      watchEffect(() => {
        console.log(filtro.value);
        store.dispatch("OBTER_TAREFAS", filtro.value);
      });

      return {
        filtro,
        tarefas,
        store,
      }
    },
    methods: {
      selecionarTarefa(tarefaClicada: TarefaInterface): void {
        this.tarefaSelecionada = tarefaClicada;
      },
      fecharModal(): void {
        this.tarefaSelecionada = null;
      },
      salvarTarefa(tarefa: TarefaInterface): void {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      },
      alterarTarefa() {
        this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
          .then(() => this.fecharModal());
      },
    }
  });
</script>