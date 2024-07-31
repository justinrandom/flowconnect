// src/services/fetchService.js
const graphqlUrl = process.env.REACT_APP_GRAPHQL_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchPosts = async () => {
  try {
    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        "Access-Control-Allow-Origin": "http://localhost:3000", // Ensure this is correct
      },
      body: JSON.stringify({
        query: `
          query {
            processed_nba_top_shot {
              _id
              category
              last_updated_on
              posted_by
              posted_on
              summarized_content
              title
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.processed_nba_top_shot;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
