class BaseRepository {
  model
  entity

  setModel (model) {
    this.model = model
  }

  setEntity (entity) {
    this.entity = entity
  }

  async insert (...args) {
    const dataValues = await this.model.create(...args)
    return this.entity.build(dataValues)
  }

  async findById (...args) {
    const dataValues = await this.model.findById(...args)
    return this.entity.build(dataValues)
  }

  async getAll () {
    return (await this.model.find()).map(item => this.model.build(item))
  }
}

export { BaseRepository }
