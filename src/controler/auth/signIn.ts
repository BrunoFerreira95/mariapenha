import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function signInWithGoogle() {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'https://mariapenha.vercel.app/auth/callback'
        }
    })
}