const request = require("request");

exports.getRate = async (req, res) => {
  try {
    var options = {
      method: "GET",
      url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD",
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(16, body);
      res.status(200).json({ status: true, data: JSON.parse(body) });
    });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};
