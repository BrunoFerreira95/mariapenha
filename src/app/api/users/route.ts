import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
  
    try {
      // Obtém o corpo da solicitação como um objeto JSON
      const requestBody = await request.json();
  
      // Extraia os campos desejados do corpo da solicitação
      const { id, nome, tel } = requestBody;
  
      console.log('id', id);
      console.log('name', nome);
      console.log('tel', tel);
  
      // Realize as operações desejadas com os dados
      try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ full_name: nome, telefone: tel })
        .eq('id', id)
        .select()
        
      } catch (error) {
        
      }

      // Responda à solicitação com uma resposta apropriada
      return new Response('Dados recebidos com sucesso', { status: 200 });
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
  
      // Em caso de erro, responda com uma mensagem de erro
      return new Response('Erro ao processar a solicitação', { status: 500 });
    }
  }
  