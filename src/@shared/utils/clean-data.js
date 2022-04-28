import { complement, isNil, pickBy } from 'ramda'

const notNull = complement(isNil)

export const cleanData = (entity) => pickBy(notNull, entity)
