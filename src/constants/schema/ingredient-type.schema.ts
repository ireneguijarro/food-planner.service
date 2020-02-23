import joi from 'joi';

export default {
  create: {
    body: {
      name: joi.string().required(),
    },
  },
  update: {
    body: {
      name: joi.string().required(),
    },
  },
};
