const Job = require("../models/Password");
const { statusCodes, StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No password with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // req.body.createdBy = req.user.userId;
  // const job = await Job.create(req.body);
  // res.status(StatusCodes.CREATED).json({ job });
  const { name, link, password, email, createdBy } = req.body;
  const user = req.user.userId;
  const encryptedString = cryptr.encrypt(password);
  const job = await Job.create({
    name: name,
    link: link,
    password: encryptedString,
    email: email,
    createdBy: user,
  });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { name, link, password, email },
    user: { userId },
    params: { id: jobId },
  } = req;

  const user = req.user.userId;
  const encryptedString = cryptr.encrypt(password);

  if (name === "" || link === "" || email === "" || password === "") {
    throw new BadRequestError("Name Link Email Password fiels cannot be empty");
  }

  // const job = await Job.findByIdAndUpdate(
  //   {
  //     _id: jobId,
  //     createdBy: userId,
  //   },
  //   req.body,
  //   { new: true, runValidators: true }
  // );
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    {name: name,
      link: link,
      password: encryptedString,
      email: email,
      createdBy: user,},
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No password with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No password with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
