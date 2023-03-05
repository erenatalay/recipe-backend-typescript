import { getRepository } from "typeorm";


class BaseService {
    BaseModel: any
    constructor(model) {
        this.BaseModel = model;
    }
    list(where) {
        if (where) {
            return getRepository(this.BaseModel).find({
                where,
            });
        }
        return getRepository(this.BaseModel).find({

        });
    }
    insert(data) {
        return this.BaseModel.create({ data })
    }
    read(data) {
        return this.BaseModel.findFirst({ where: data });
    }
    modify(data, id) {
        return this.BaseModel.update({ data, where: { id } })
    }
    delete(id) {
        return this.BaseModel.delete({ where: { id } })
    }
}

module.exports = BaseService;