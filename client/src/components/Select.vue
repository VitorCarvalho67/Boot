<template>
  <div class="custom-select" @click="toggleOptions" @blur="closeOptions" tabindex="0">
    <div class="selected">
      <label>
        {{ dataSelect.description }}
      </label>
      <div class="description">
        <p>{{ selected ? selected.description : dataSelect.title }}</p>
        <img src="../assets/icons/angulo.png" alt="">
      </div>    
    </div>
    <ul v-if="showOptions" class="options">
      <li>
        {{ dataSelect.title }}
      </li>
      <li v-for="option in dataSelect.options" :key="option.value" @click.stop="selectOption(option)">
        {{ option.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    dataSelect: {
      description: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    }
  },
  data() {
    return {
      showOptions: false,
      selected: '',
      valor: '',
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    closeOptions() {
      this.showOptions = false;
    },
    selectOption(option) {
      this.selected = option;
      this.valor = option.value;
      this.$emit('input', option.value);
      this.showOptions = false;
    }
  }
};
</script>

<style scoped>
@import "../scss/layouts/_select.scss";
</style>
