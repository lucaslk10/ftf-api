import Joi from 'joi'
export default Joi.object().keys({
  text: Joi.string().required().max(1000)
})
