<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Menu
        </q-toolbar-title>
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">ToDo List</div>
        <span class="text-subtitle1">{{ todaysDate }}</span>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-img src="../assets/blurred-header.jpg" style="height: 247px">
          <div class="absolute-bottom absolute-center bg-transparent">
            <q-avatar size="96px" class="q-mb-sm">
              <img src="https://avatars.githubusercontent.com/u/26912630?v=4">
            </q-avatar>
            <div class="text-weight-bold text-h5 q-mb-sm">Filipe M.</div>
          </div>
        </q-img>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" :target="link.target" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Tarefas',
    icon: 'list',
    link: '/',
    target: '',
  },
  {
    title: 'Github',
    icon: 'code',
    link: 'https://github.com/filipeoliveirah',
    target: '_blank',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    const todaysDate = computed(() => {
      const event = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      return event.toLocaleDateString('pt-BR', options)
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      todaysDate,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.7;
}
</style>
