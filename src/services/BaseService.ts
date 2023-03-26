import { getRepository } from "typeorm";

class BaseService {
  BaseModel: any;
  constructor(model) {
    this.BaseModel = model;
  }
  list(where) {
    if (where) {
      return getRepository(this.BaseModel).find({
        where,
      });
    }
    return getRepository(this.BaseModel).find({});
  }
   create(data) {
    const model = getRepository(this.BaseModel);
    const createData = model.create(data);
    return model.save(createData);
  }
  find(data) {
    return  getRepository(this.BaseModel).findOne({ where: data });
  }
  update(data, id) {
    return this.BaseModel.update({ data, where: { id } });
  }
  delete(id) {
    return this.BaseModel.delete({ where: { id } });
  }
}

module.exports = BaseService;
