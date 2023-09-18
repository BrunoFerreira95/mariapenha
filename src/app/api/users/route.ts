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

    // Inicialize um objeto vazio para armazenar as atualizações
    const updates: Record<string, any> = {};

    // Verifique quais campos estão presentes no requestBody e adicione-os ao objeto de atualizações
    if (telefone) {
      updates.telefone = telefone;
    }
    if (full_name) {
      updates.full_name = full_name;
    }
    if (rua) {
      updates.rua = rua;
    }
    if (bairro) {
      updates.bairro = bairro;
    }
    if (cidade) {
      updates.cidade = cidade;
    }
    if (numero) {
      updates.numero = numero;
    }

    // Realize a atualização no banco de dados apenas se houver campos a serem atualizados
    if (Object.keys(updates).length > 0) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', id)
          .select();

        console.log(data);
        console.log(error);
      } catch (error) {
        // Lidar com erros de atualização, se necessário
      }
    }

    // Responda à solicitação com uma resposta apropriada
    return new Response('Dados recebidos com sucesso', { status: 200 });
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);

    // Em caso de erro, responda com uma mensagem de erro
    return new Response('Erro ao processar a solicitação', { status: 500 });
  }
}
