import { getRepository } from "typeorm";

class BaseService {
  BaseModel: any;
  constructor(model) {
    this.BaseModel = model;
  }
  async list(where) {
    if (where) {
      return getRepository(this.BaseModel).find({
        where,
      });
    }
    return getRepository(this.BaseModel).find({});
  }
  async create(data) {
    const model = getRepository(this.BaseModel);
    const createData = model.create(data);
    return model.save(createData);
  }
  async find(data) {
    return getRepository(this.BaseModel).findOne({ where: data });
  }
  async update(data, id: number) {
    let model : any = await  this.find({ id });
    return getRepository(this.BaseModel).save({ ...model, ...data });
  }
  async delete(id) {
    return getRepository(this.BaseModel).delete({id });
  }
}

module.exports = BaseService;
