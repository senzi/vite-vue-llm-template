export async function onRequestGet() {
  try {
    const templates = await import('../templates/index');
    
    const templateList = Object.entries(templates).map(([key, value]) => ({
      name: key,
      type: value.type,
      description: value.description,
      ...(value.type === 'json' && { schema: value.jsonSchema })
    }));

    return new Response(JSON.stringify(templateList), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
