
export interface IHomeService {
    getallAds()
    postAd(inputModel: any)
    getAdById(id: any, userId: any)
    // getAdsByCategory(category:any)
    // getAdsById(id:any)
}
