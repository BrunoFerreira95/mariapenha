// custom.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      APIKEY: string;
      AUTHDOMAIN: string;
      PROJECTID: string;
      STORAGEBUCKET: string;
      MESSAGINGSENDERID: string;
      APPID: string;
      MEASUREMENTID: string;
      // Add any other environment variables here if needed
    }
  }
  