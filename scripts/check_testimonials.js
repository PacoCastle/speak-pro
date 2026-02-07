import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTestimonials() {
    console.log("--- FETCHING TESTIMONIALS ---");
    const { data, error } = await supabase
        .from('testimonials')
        .select('*');

    if (error) {
        console.error("Error:", error);
    } else {
        if (data.length === 0) {
            console.log("No testimonials found in DB.");
        } else {
            data.forEach(t => {
                console.log(`ID: ${t.id} | Name: ${t.full_name} | Visible: ${t.is_visible} | Deleted: ${t.is_deleted} | Featured: ${t.is_featured}`);
            });
        }
    }
}

checkTestimonials();
