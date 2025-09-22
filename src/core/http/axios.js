import axios from "axios";

const baseURL = "https://eleven-code-api-raquel-ruiz.vercel.app/api";

export const api = axios.create({
    baseURL,
    timeout: 10000, // ms milliseconds
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Cómo hacer una petición
// api.get("/products")
// api.post
// api.patch
// api.delete
