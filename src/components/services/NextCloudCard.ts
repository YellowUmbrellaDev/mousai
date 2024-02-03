
export default async function NextCloudCard(tier: string, name: string, email: string, pronouns: string, description: string, username: string, id: string) {
    const boardId = import.meta.env.DECK_TABLE_ID;
    const stackId = import.meta.env.DECK_STACK_ID;
    const data = {
      title: `[${tier}] ${name}`,
      type:'plain',
      order:999,
      description: `Commision from ${name} (${email})\n\nPronouns: ${pronouns}\n\nDescription: ${description}\n\nTier: ${tier}\n\nUsername: ${username}\n\n ID de la comisión: ${id}`
    };
    try {
      const response = await fetch(`https://cloud.nereacassian.com/apps/deck/api/v1.0/boards/${boardId}/stacks/${stackId}/cards`, {
        method: 'POST',
        headers: {
          "Accept": "*/*",
          "Authorization": 'Basic ' + btoa(import.meta.env.DECK_USER + ':' + import.meta.env.DECK_PASSWORD),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    
      // Comprueba si la respuesta de la solicitud fetch fue exitosa
      if (!response.ok) {
        throw new Error(`Fetch request failed with status ${response.status}`);
      }
      
      const responseData = await response.json();
      const cardId = responseData.id;
      
      return { status: 200, cardId };
    } catch (error) {
      return  { status: 500, error };
    }
}
