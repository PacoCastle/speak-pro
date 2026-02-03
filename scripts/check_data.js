import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log("--- FETCHING TEACHERS ---");
    const { data: teachers, error } = await supabase
        .from('teachers')
        .select('id, name, is_visible, is_deleted, created_at')
        .order('name');

    if (error) {
        console.error("Error:", error);
        return;
    }

    if (!teachers || teachers.length === 0) {
        console.log("No teachers found.");
    } else {
        console.log(JSON.stringify(teachers, null, 2));
    }
}

checkData();
