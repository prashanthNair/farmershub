import { IHomeService } from "./Ihomeservice";

export class HomeService implements IHomeService {
  private constructor() {}

  private static instance: IHomeService = null;
  url = "https://vng4md3wo9.execute-api.ap-south-1.amazonaws.com/dev/";
  static getInstance() {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  public async getallAds() {
    return fetch(`${this.url}/ads`);
  }

  public async search(value) {
    return fetch(`http://192.168.43.210:3000/api/v1/ads/search/${value}`);
  }

  public async getAdById(id: any, userId: any) {
    return fetch(`http://192.168.43.210:3000/api/v1/ads/${id}/${userId}`);
  }

  public async getAdByCategory(category) {
    return fetch(`http://192.168.43.210:3000/api/v1/ads/categories/${category}`);
  }

  public async postAd(data: any) {
    return fetch(`${this.url}/ads`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( data)
    });
  }

  public async UpdateAd(inputModel: any) {
    return fetch(`${this.url}ads/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputModel }),
    });
  }

  public async deleteAd(id: any, userId: any) {
    return fetch(`http://192.168.43.210:3000/api/v1/ads/${id}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
