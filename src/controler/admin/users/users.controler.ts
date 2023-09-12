import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthSession } from "@supabase/supabase-js";

export async function fetchOneUser(id: string, setUsers) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/users?id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data && Object.keys(data).length > 0) {
            setUsers(data);
        } else {
            // Handle the case where the fetched data is null or empty
        }
    } catch (error) {
        console.error('Error fetching camera data:', error);
    }
}

export async function fetchUserData(setUsers) {
    const dynamicData = await fetch("http://localhost:3000/api/admin/users");
    return await dynamicData.json().then((item) => {
      setUsers(item);
    });
  }


  export async function fetchUserClaims(id: string, setUser) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/users/claims?id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data && Object.keys(data).length > 0) {
            setUser(data);
        } else {
            // Handle the case where the fetched data is null or empty
        }
    } catch (error) {
        console.error('Error fetching camera data:', error);
    }
}


export const initSession = async (setSession: (session: AuthSession | null) => void) => {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase.auth.getSession()
  
    setSession(data.session)
  }   