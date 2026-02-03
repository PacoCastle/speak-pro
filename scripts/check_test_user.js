import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
    // We can't query auth.users directly with anon key usually, 
    // but we can check the 'profiles' table if it exists, OR key off the logic in AuthContext.

    // AuthContext logic: const isAdmin = supabaseUser.email?.includes('admin');

    // Wait! The logic in AuthContext is:
    // const isAdmin = supabaseUser.email?.includes('admin');

    // 'student@test.com' does NOT include 'admin'.
    // So isAdmin should be false.

    console.log("Checking logic for 'student@test.com'...");
    const email = 'student@test.com';
    const isAdmin = email.includes('admin');
    console.log(`Email: ${email}`);
    console.log(`Is Admin (by string check): ${isAdmin}`);

    // Is there a 'role' in the user_metadata?
    // AuthContext: role: isAdmin ? 'admin' : 'student',

    // So strictly speaking, logic says it is Student.
}

checkUser();
