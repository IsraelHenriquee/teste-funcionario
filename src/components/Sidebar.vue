<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import BotaoSidebar from './BotaoSidebar.vue'
import { HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isMobileOpen: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const isCollapsed = ref(false)
const emit = defineEmits(['toggle-sidebar', 'close-mobile-menu'])

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle-sidebar', isCollapsed.value)
}

const closeMobileMenu = () => {
  emit('close-mobile-menu')
}

// Fechar o menu mobile quando a rota mudar
watch(() => router.currentRoute.value, () => {
  if (props.isMobileOpen) {
    closeMobileMenu()
  }
})

const menuItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Funcionários', path: '/funcionarios', icon: UsersIcon },
]
</script>

<template>
  <aside :class="[
    'sidebar', 
    { 
      'sidebar-collapsed': isCollapsed,
      'sidebar-mobile-open': isMobileOpen,
      'sidebar-mobile-closed': !isMobileOpen
    }
  ]">
    <div class="sidebar-header">
      <div v-if="!isCollapsed" class="logo-container">
        <span class="logo-text">Menu</span>
      </div>
      <button @click="toggleSidebar" class="toggle-btn desktop-only">
        <span v-if="isCollapsed">›</span>
        <span v-else>‹</span>
      </button>
      <button @click="closeMobileMenu" class="close-mobile-btn mobile-only">
        <XMarkIcon class="icon-svg" />
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <BotaoSidebar 
            :texto="item.name" 
            :icone="item.icon" 
            :rota="item.path" 
            :colapsado="isCollapsed" 
          />
        </li>
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">👤</div>
        <div v-if="!isCollapsed" class="user-details">
          <p class="user-name">Usuário</p>
          <p class="user-role">Admin</p>
        </div>
      </div>
    </div>
  </aside>
  
  <!-- Overlay para fechar o menu no mobile -->
  <div 
    v-if="isMobileOpen" 
    class="sidebar-overlay"
    @click="closeMobileMenu"
  ></div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--color-black);
  color: var(--text-light);
  transition: width var(--transition-normal);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow-x: hidden;
  box-shadow: var(--shadow-md);
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--color-dark-gray);
  position: relative;
}

.sidebar-collapsed .sidebar-header {
  justify-content: center;
  padding-right: 0;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.toggle-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-light);
  transition: all var(--transition-normal);
  outline: none; /* Remove o contorno ao focar */
}

.toggle-btn:focus {
  outline: none; /* Remove o contorno ao focar */
}

.toggle-btn:hover {
  background-color: var(--color-dark-gray);
}

.sidebar-collapsed .toggle-btn {
  position: static;
  margin: 0 auto;
  right: auto;
  border: none;
  box-shadow: none;
  background-color: transparent;
}

.close-mobile-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-full);
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
}

.close-mobile-btn:hover {
  background-color: var(--color-dark-gray);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md) 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: var(--space-xs);
}

.sidebar-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--color-dark-gray);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-dark-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-md);
}

.user-details {
  overflow: hidden;
}

.user-name {
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-light);
  margin: 0;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: none;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

/* Responsividade */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    width: 250px;
  }
  
  .sidebar-mobile-open {
    transform: translateX(0);
  }
  
  .sidebar-collapsed {
    width: 250px; /* No mobile, sempre mostra a sidebar completa */
  }
  
  .sidebar-overlay {
    display: block;
  }
  
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: flex;
  }
}
</style>
