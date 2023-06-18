import client from "../index";
class SearchService {
  search = async (request) => {
    try {
        const response = await client.search({
          index: 'recipe',
          q: request.q,
          size: 25,
          from: request?.page * 25
        })
        return response
      } catch (error) {
        return error
      }
  };
}

export default new SearchService();
