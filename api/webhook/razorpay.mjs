const PAYMENTS_API = (process.env.PAYMENTS_API_URL ?? "https://the-plugin-payments.fly.dev").replace(
  /\/$/,
  ""
);

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

/** Vercel serverless — POST /api/webhook/razorpay → Fly payments API */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const signature = req.headers["x-razorpay-signature"];
  if (!signature) {
    return res.status(400).send("missing signature");
  }

  try {
    const body = await readRawBody(req);
    const upstream = await fetch(`${PAYMENTS_API}/api/webhooks/razorpay`, {
      method: "POST",
      headers: {
        "content-type": req.headers["content-type"] || "application/json",
        "x-razorpay-signature": signature,
      },
      body,
    });

    const text = await upstream.text();
    return res.status(upstream.status).send(text);
  } catch {
    return res.status(502).send("webhook proxy failed");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
