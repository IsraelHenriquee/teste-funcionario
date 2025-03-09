<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isSidebarOpen = ref(true)
const route = useRoute()

const handleToggleSidebar = (isCollapsed) => {
  isSidebarOpen.value = !isCollapsed
}

const pageTitle = computed(() => {
  if (route.path === '/') return 'Home'
  if (route.path === '/funcionarios') return 'Funcionários'
  return 'Página'
})
</script>

<template>
  <div class="layout-container">
    <Sidebar @toggle-sidebar="handleToggleSidebar" />
    
    <div :class="['content-area', { 'content-expanded': !isSidebarOpen }]">
      <Header :titulo="pageTitle" />
      <div class="content-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.content-area {
  flex: 1;
  margin-left: 250px;
  transition: margin-left var(--transition-normal);
  display: flex;
  flex-direction: column;
  width: calc(100% - 250px);
}

.content-expanded {
  margin-left: 70px;
  width: calc(100% - 70px);
}

.content-body {
  flex: 1;
  padding: var(--space-lg);
  overflow-y: auto;
}

/* Responsividade */
@media (max-width: 768px) {
  .content-area {
    margin-left: 70px;
    width: calc(100% - 70px);
  }
  
  .content-expanded {
    margin-left: 0;
    width: 100%;
  }
}
</style>
