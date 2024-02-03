export default async function TrelloCard(tier: string, name: string, email: string, pronouns: string, description: string, username: string, id: string) {
    const listId = import.meta.env.TRELLO_LIST_ID;
    const key = import.meta.env.TRELLO_API_KEY;
    const token = import.meta.env.TRELLO_TOKEN;
    const cardName = `[${tier}] ${name}`;
    const cardDesc = `Pronouns: ${pronouns}\n Description: ${description}\n Email: ${email}\n ID de la comisión: ${id}`;
    try {
        const response = await fetch(`https://api.trello.com/1/cards?key=${key}&token=${token}`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idList": listId,
                "name": cardName,
                "desc": cardDesc,
                "pos": "bottom",
                "start": new Date().toISOString().split('T')[0]
            })
        });
        if (!response.ok) {
            throw new Error(`Fetch request failed with status ${response.status}`);
        }

        return { status: 200 };

    } catch (error) {
        console.error(error);
    }
}
