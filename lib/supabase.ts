import { createClient } from '@supabase/supabase-js';

// Aapki Supabase Details
const supabaseUrl = 'https://ttpifzowvsydzgwzcico.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cGlmem93dnN5ZHpnd3pjaWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODM1ODIsImV4cCI6MjA5NDk1OTU4Mn0.F9zTUZmjSYv_lmKoFWLgd4tqTwI5TCKyfEnR6vfZdFo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);