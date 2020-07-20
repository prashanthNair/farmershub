import "react-native-get-random-values";
import { uuid } from "uuidv4";
import { WebView } from "react-native-webview";
class BaseModel {
  Category: string;
  UserId: any | "";
  AdId: string | "";
  IsActiveAd: "true";
  IsPremiumUser: string | "";
  SubscriptionDate: string | "";
  DisplayAdID: string | "";
  Tittle: string | "";
  Description: string | "";
  BuyOrSell: string | "";
  Sell: number | 0;
  Buy: number;
  Price: any;
  MainImageUri: any;
  ImgaeList: any;
  HasError: boolean | false;
  validation: any
}
class ContactModel {
  State: string | "";
  District: string | "";
  Locality: string | "";
  imageRef: string | "";
  Date: string | "";
  Price: string | "";
  UserName: string | "";
  MobileNum: string | "";
  Email: string | "";
}

class FarmEquipmets extends BaseModel {
  ProductName: string | "";
  Brand: string | "";
}

class Job extends BaseModel {
  JobType: string;
  MinSal: string;
  MaxSal: string;
}

class Feed extends BaseModel {
  ProductName: string;
  Brand: string;
  Type: string;
  Package: string;
  IsDelivery: boolean;
}

class Pet extends BaseModel {
  PetTye: string;
  Breed: string;
  Gender: string;
  Age: string;
  Color: string;
}

export class LiveStockModel extends BaseModel {
  Breed: string;
  Gender: string;
  Age: any;
  Weight: any;
  Color: string;
  Type: string;
  MilkingCapacity: string;
  // NoOfKids: string;
  // KidsWeight: any;
  // KidsDetails: string;
  Tittle: string;
  Description: string;
}

class Property extends BaseModel {
  PlotArea: any;
  Length: any;
  Size: any;
}
export class Store {
  private constructor() {}

  private static _postAdDateModel: any = {};

  private static _liveStockModel: LiveStockModel = new LiveStockModel();

  private static _imagesArray = [];

  private static _propertyData: Property = new Property();
  static GetPropertyData() {
    return Store._propertyData;
  }
  static SetPropertyData(value) {
    Store._propertyData = value;
  }

  static async GetImageArray() {
    return Store._imagesArray;
  }
  static SetImageArray(value) {
    Store._imagesArray = value;
  }

  private static _imageUri = [];
  static async GetImageUriArray() {
    return Store._imageUri;
  }
  static SetImageUriArray(value) {
    Store._imageUri = value;
  }

  static setLiveStockData(value) {
    Store._liveStockModel = value;
  }

  static getLiveStockData(): any {
    return Store._liveStockModel;
  }

  static getPostData(): any {
    return Store._postAdDateModel;
  }

  static setPostData(value) {
    Store._postAdDateModel = value;
  }

  private static _contactModel: any = new ContactModel();
  static getContactData() {
    return Store._contactModel;
  }
  static async setContactData(value: ContactModel) {
    Store._contactModel = value;
  }

  private static _equipmentData: FarmEquipmets = new FarmEquipmets();
  static getEquipmentData(): FarmEquipmets {
    return Store._equipmentData;
  }

  static setEquipmentData(value: any) {
    Store._equipmentData = value;
  }
  private static _feedData: Feed = new Feed();
  static getFeedData(): Feed {
    return Store._feedData;
  }

  static setFeedData(value: Feed) {
    Store._feedData = value;
  }

  private static _petData: Pet = new Pet();
  static getPetData(): Pet {
    return Store._petData;
  }

  static setPetData(value: Pet) {
    Store._petData = value;
  }

  private static _jobData: Job = new Job();
  static getJobData(): Job {
    return Store._jobData;
  }

  static setJobData(value: Job) {
    Store._jobData = value;
  }
}
