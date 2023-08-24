<template>
    <div class="create-component-list">
        <div v-for="(item, index) in list" :key="index" class="component-item" @click="onItemClick(item)">
            <l-text v-bind="item"></l-text>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LText from '../components/LText.vue'

export default defineComponent({
    name: 'components-list',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    components: {
        LText
    },
    emits: ['on-item-click'],
    setup(props, context){
        const onItemClick = (data: any) => {
            context.emit('on-item-click', data)
        }

        return {
            onItemClick
        }
    }
})
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}

</style>