const Review = require("../models/Review");
const { statusCodes, StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const portscanner = require("portscanner");
const spamchecker = require("known-spam-emails");
const MalwareHashRegistry = require("malware-hash-registry");

const getAllReview = async (req, res) => {
  // const result = spamchecker.isEmailClean('it20143954@my.sliit.lk');
  // res.status(StatusCodes.OK).json({ result });

  var mhrClient = new MalwareHashRegistry();

  // digests can be either MD5 or SHA-1
  var digests = [
    "c0202cf6aeab8437c638533d14563d35", // malware
    "6e88d7fb0ac540ec143943fa0426139b", // not malware
  ];

  mhrClient.query(digests, function (err, results) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(results);
  });
};

const getReview = async (req, res) => {};

const createIP = async (req, res) => {
  // console.log(req.body)
  // const review = await Review.create(req.body);
  portscanner.checkPortStatus(
    req.body.port,
    req.body.ipaddress,
    function (error, status) {
      // Status is 'open' if currently in use or 'closed' if available
      console.log(status);
      res.status(StatusCodes.OK).json({ status });
    }
  );
  // res.status(StatusCodes.CREATED).json({ review });
};

module.exports = {
  createIP,
  getAllReview,
  getReview,
};
