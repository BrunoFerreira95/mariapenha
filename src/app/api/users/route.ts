import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
  
    try {
      // Obtém o corpo da solicitação como um objeto JSON
      const requestBody = await request.json();
  
      // Extraia os campos desejados do corpo da solicitação
      const { telefone, full_name, rua, bairro, cidade, numero, id } = requestBody;
  
      // Realize as operações desejadas com os dados
      try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ full_name, telefone, rua, bairro, cidade, numero })
        .eq('id', id)
        .select()
        
        console.log(data)
        console.log(error)
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
  