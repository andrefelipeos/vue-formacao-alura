<template>
  <CaixaVue>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-5">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-5">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column is-2">
        <CronometroVue :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </CaixaVue>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import TarefaInterface from "../interfaces/TarefaInterface";
  import CaixaVue from "./Caixa.vue";
  import CronometroVue from "./Cronometro.vue";

  export default defineComponent({
      name: 'TarefaVue',
      components: {
          CaixaVue,
          CronometroVue
      },
      props: {
        tarefa: {
          type: Object as PropType<TarefaInterface>,
          required: true
        }
      },
      emits: ['tarefaFoiClicada'],
      methods: {
        tarefaClicada(): void {
          this.$emit('tarefaFoiClicada', this.tarefa);
        }
      }
  })
</script>

<style>
  .clicavel {
    cursor: pointer;
  }
</style>