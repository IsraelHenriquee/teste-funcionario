import { createClient } from '@supabase/supabase-js';

// Estas variáveis devem ser substituídas pelas suas credenciais do Supabase
// Idealmente, elas deveriam estar em um arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Cria o cliente do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
