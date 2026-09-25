// api/clk/aditiya.js

const axios = require("axios");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const {
      apiKey,
      product_id,
      duration_id,
      quantity
    } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: "apiKey missing"
      });
    }

    const bodyObj = {
      product_id: Number(product_id),
      duration_id: Number(duration_id),
      quantity: Number(quantity || 1)
    };

    const response = await axios.post(

      "https://adityareseller.shop/aditya/api/reseller/generate.php",

      bodyObj,

      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey
        },
        timeout: 20000
      }

    );

    return res.json({
      success: true,
      response: response.data
    });

  } catch (e) {

    return res.status(
      e.response?.status || 500
    ).json({
      success: false,
      error: e.message,
      aditya_error: e.response?.data || null,
      sent_body: {
        product_id: req.body?.product_id,
        duration_id: req.body?.duration_id,
        quantity: req.body?.quantity,
        has_apiKey: !!req.body?.apiKey
      }
    });

  }

};
