export interface IHomeService {
  getallAds();
  postAd(inputModel: any);
  getAdById(id: any, userId: any);
  deleteAd(id: any, userId: any);
  UpdateAd(inputModel: any);
  getAdByCategory(category);
  search(search);
  // getAdsByCategory(category:any)
  // getAdsById(id:any)
}
