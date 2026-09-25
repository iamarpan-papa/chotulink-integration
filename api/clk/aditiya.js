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

      response:
        response.data

    });

  } catch (e) {

    return res.status(
      e.response?.status || 500
    ).json({

      success: false,

      error:
        e.message,

      response:
        e.response?.data || null

    });

  }

};
