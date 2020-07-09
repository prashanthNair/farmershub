import 'react-native-get-random-values';
import { uuid } from 'uuidv4';
import { WebView } from 'react-native-webview';
class BaseModel {

    UserId: any | '';
    AdId: string | '';
    IsActiveAd: 'true';
    IsPremiumUser: string | '';
    SubscriptionDate: string | '';
    DisplayAdID: string | '';
    Tittle: string | '';
    Description: string | '';   
    buyOrSell: string | '';
    sell: number | '';
    buy: number | '';
}
class ContactModel{
    State: string | '';
    District: string | '';
    Locality: string | '';
    imageRef: string | '';
    Date: string | '';
    Price: string | '';
    UserName: string | '';
    MobileNum: string | '';
    Email: string | '';
}


class FarmEquipmets extends BaseModel {
    ProductName: string
    Brand: string

}

export class LiveStockModel extends BaseModel {
    Category: string;
    Breed: string;
    Gender: string;
    Age: any;
    Weight: any;
    Color: string;
    Type: string;
    MilkingCapacity: string;
    NoOfKids: string;
    KidsWeight: any;
    KidsDetails: string;
    Tittle: string;
    Description: string;
    buyOrSell: string;
    sell: number;
    buy: number;
}

export class Store {

    private constructor() { }

    
    private static _postAdDateModel:any={}

    private static _liveStockModel: LiveStockModel = new LiveStockModel()
    //  {
    //     Category: "",
    //     Breed: "",
    //     Gender: '',
    //     Age: '',
    //     Weight: '',
    //     Color: '',
    //     Type: 'Male',
    //     MilkingCapacity: '',
    //     NoOfKids: '',
    //     KidsWeight: '',
    //     KidsDetails: '',
    //     Tittle: '',
    //     Description: '',
    //     buyOrSell: '',
    //     sell: 1,
    //     buy: 0
    // }

    private static _imagesArray = [];

    private static _propertyData = {
        listedBy: '',
        propertyType: '',
        plotArea: '',
        cents: '',
        landType: '',
        farmHouselength: '',
        farmHouseSize: '',
        adTitle: '',
        adDiscription: '',
        sell: 1,
        buy: 0,
        buyOrSell: ''
    }

    static GetPropertyData() {
        return Store._propertyData;
    }
    static SetPropertyData(value) {
        Store._propertyData.listedBy = value.listedBy,
            Store._propertyData.propertyType = value.listedBy,
            Store._propertyData.plotArea = value.listedBy,
            Store._propertyData.cents = value.listedBy,
            Store._propertyData.landType = value.listedBy,
            Store._propertyData.farmHouselength = value.listedBy,
            Store._propertyData.farmHouseSize = value.listedBy,
            Store._propertyData.adTitle = value.listedBy,
            Store._propertyData.adDiscription = value.listedBy,
            Store._propertyData.sell = value.listedBy,
            Store._propertyData.buy = value.listedBy,
            Store._propertyData.buyOrSell = value.listedBy;
    }

    static async GetImageArray() {
        return Store._imagesArray;
    }
    static SetImageArray(value) {
        Store._imagesArray = value;
    }

    static setLiveStockData(value) {
        Store._liveStockModel = value;
    }

    static getLiveStockData(): LiveStockModel {
        return Store._liveStockModel;
    }

    static getPostData(): any {
        return Store._postAdDateModel;
    }

    static setPostData(value) {
        Store._postAdDateModel=value;
    }

    private static _contactModel:ContactModel=new ContactModel();
    static getContactData() {
        return Store._contactModel;
    }
    static async setContactData(value: ContactModel) {
        Store._contactModel = value;  
    }

    private static _equipmentData: FarmEquipmets = new FarmEquipmets()
    static getEquipmentData(): FarmEquipmets {
        return Store._equipmentData;
    }

    static setEquipmentData(value: FarmEquipmets) {
        Store._equipmentData = value
    }

}