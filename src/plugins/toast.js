// Configuração do Vue Toast Notification
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

// Cria uma instância do toast
const toast = useToast({
  position: 'top-right',
  duration: 3000,
  dismissible: true
});

export default {
  success(mensagem) {
    toast.success(mensagem, {
      duration: 3000,
    });
  },
  
  error(mensagem) {
    toast.error(mensagem, {
      duration: 5000,
    });
  },
  
  info(mensagem) {
    toast.info(mensagem, {
      duration: 3000,
    });
  },
  
  warning(mensagem) {
    toast.warning(mensagem, {
      duration: 4000,
    });
  }
};
