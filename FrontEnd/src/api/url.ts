
export const createShortURl = async (originalURL: string) => {
  try {
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify({ originalURL }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error in createShortURl:", err);
    throw err;
  }
};
