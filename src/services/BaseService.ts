import { getRepository } from "typeorm";

class BaseService {
  BaseModel: any;
  constructor(model) {
    this.BaseModel = model;
  }
  async list(where?: Object, relations?: Object) {
    if (where) {
      return getRepository(this.BaseModel).find({
        where,
        relations,
      });
    }

    return getRepository(this.BaseModel).find({
    relations  : ["user","category"]
    });
  }
  async create(data: Object) {
    const model = getRepository(this.BaseModel);
    const createData = model.create(data);
    return model.save(createData);
  }
  async find(data: Object) {
    return getRepository(this.BaseModel).findOne({ where: data });
  }
  async update(data: Object, id: number) {
    let model: any = await this.find({ id });
    return getRepository(this.BaseModel).save({ ...model, ...data });
  }
  async delete(id: number) {
    return getRepository(this.BaseModel).delete({ id });
  }
}

export default BaseService;
