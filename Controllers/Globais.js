var card_notificadodor_os_execucao = (executante,cliente, numos, email, status, descricao, link_anexo = "", hora_inicio = "Não preenchida", hora_fim = "Não preenchida", dt_execucao = "Não preenchida") => {
    let card = {
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "TextBlock",
                "text": `Solicitação ${numos} executada`,
                "weight": "Bolder",
                "size": "Large"
            },
            {
                "type": "TextBlock",
                "text": " **Prezado solicitante**",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": `A sua solicitação foi executada por ${executante}`,
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": `*Cliente:* ${cliente}`,
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": "Clique abaixo para ver mais detalhes:",
                "weight": "Bolder"
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.ToggleVisibility",
                        "title": "Mostrar detalhes",
                        "targetElements": ["detalhes"]
                    }
                ]
            },
            {
                "type": "TextBlock",
                "text": `
**E-mail do usuário logado:** ${email}

**Status do chamado:** '${status}'  

**Data de execução:** ${dt_execucao} 

**Hora inicial da execução:** ${hora_inicio}  

**Hora final da execução:** ${hora_fim}  

**Observação:** ${descricao} 

 
                `,
                "wrap": true,
                "id": "detalhes",
                "isVisible": false
            }
        ],
        "actions": []
    };
    

    if (link_anexo.trim() !== "") {
        card.actions.push({
            "type": "Action.OpenUrl",
            "title": "Abrir Anexo Vinculado",
            "url": link_anexo
        });
    }
    
    return card;
};



var card_notificadodor_os_atualizacao = (executante,cliente, numos, email, status, descricao, link_anexo = "", hora_inicio = "Não preenchida", hora_fim = "Não preenchida", dt_execucao = "Não preenchida") => {
    let card = {
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "TextBlock",
                "text": `Solicitação ${numos} atualizada`,
                "weight": "Bolder",
                "size": "Large"
            },
            {
                "type": "TextBlock",
                "text": " **Prezado solicitante**",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": `A sua solicitação foi atualizada por ${executante}`,
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": `*Cliente:* ${cliente}`,
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": "Clique abaixo para ver mais detalhes:",
                "weight": "Bolder"
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.ToggleVisibility",
                        "title": "Mostrar detalhes",
                        "targetElements": ["detalhes"]
                    }
                ]
            },
            {
                "type": "TextBlock",
                "text": `
**E-mail do usuário logado:** ${email}

**Status do chamado:** '${status}'  

**Observação:** ${descricao} 

 
                `,
                "wrap": true,
                "id": "detalhes",
                "isVisible": false
            }
        ],
        "actions": []
    };
    

    if (link_anexo.trim() !== "") {
        card.actions.push({
            "type": "Action.OpenUrl",
            "title": "Abrir Anexo Vinculado",
            "url": link_anexo
        });
    }
    
    return card;
};

var card_notificadodor_os_agendamento = (executante, cliente, numos, email, status, descricao, link_anexo = "", dt_agendamento = "Não agendado") => {
    let card = {
        "type": "AdaptiveCard",
        "version": "1.3",
        "body": [
            {
                "type": "TextBlock",
                "text": `Agendamento da OS ${numos}`,
                "weight": "Bolder",
                "size": "Large",
                "color": "Attention"  // Destaque em amarelo/laranja
            },
            {
                "type": "TextBlock",
                "text": "**Prezado solicitante**",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": `Sua solicitação foi agendada por ${executante}`,
                "weight": "Bolder"
            },
            {
                "type": "TextBlock",
                "text": `*Cliente:* ${cliente}`,
                "weight": "Bolder"
            },
          
            {
                "type": "TextBlock",
                "text": "Clique abaixo para ver mais detalhes:",
                "weight": "Bolder",
                "spacing": "Medium"
            },
            {
                "type": "ActionSet",
                "actions": [
                    {
                        "type": "Action.ToggleVisibility",
                        "title": "Mostrar detalhes",
                        "targetElements": ["detalhes"]
                    }
                ]
            },
            {
                "type": "TextBlock",
                "text": `
**E-mail do usuário logado:** ${email}

**Data/Hora de Agendamento:** ${dt_agendamento}


**Status do chamado:** '${status}'  

**Observação:** ${descricao} 
                `,
                "wrap": true,
                "id": "detalhes",
                "isVisible": false,
                "spacing": "Medium"
            }
        ],
        "actions": []
    };
    
    if (link_anexo.trim() !== "") {
        card.actions.push({
            "type": "Action.OpenUrl",
            "title": "Abrir Anexo Vinculado",
            "url": link_anexo
        });
    }
    
    return card;
};


module.exports = {
  
    card_notificadodor_os_execucao: card_notificadodor_os_execucao,
     card_notificadodor_os_atualizacao: card_notificadodor_os_atualizacao,
   
    card_notificadodor_os_agendamento: card_notificadodor_os_agendamento,
  
    
}
