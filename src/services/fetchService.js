export const fetchPosts = async () => {
  const response = await fetch(
    "https://eastus2.azure.data.mongodb-api.com/app/flowconnect-xafhewk/endpoint/nbatopshot"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
