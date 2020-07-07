import { IHomeService } from "./Ihomeservice";

export class HomeService implements IHomeService {

    private constructor() { }

    private static instance: IHomeService = null;

    static getInstance() {

        if (!HomeService.instance) {
            HomeService.instance = new HomeService();
        }
        return HomeService.instance;
    }

    public async getallAds() {

        return fetch("http://192.168.43.210:3000/api/v1/ads")

    }

    public async postAd(inputModel: any) {
        console.log("string",JSON.stringify({ inputModel }));
        return fetch("http://192.168.43.210:3000/api/v1/ads",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputModel })
            })

    }
}
