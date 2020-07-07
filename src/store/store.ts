import 'react-native-get-random-values';
import { uuid } from 'uuidv4';
import {WebView} from 'react-native-webview';
export class Store {

    private constructor() { }

    private static _postAdDateModel: StoreModel = {
        Category: "",
        Breed: "",
        Gender: '',
        Age: '',
        Weight: '',
        Color: '',
        Type: 'Male',
        MilkingCapacity: '',
        NoOfKids: '',
        KidsWeight: '',
        KidsDetails: '',
        Tittle: '',
        Description: '',
        State: '',
        District: '',
        Locality: '',
        Date: Date.now.toString(),
        imageRef: '',
        UserId: '',
        Price: '',
        UserName: '',
        MobileNum: '',
        Email: '',
        IsActiveAd: 'true',
        IsPremiumUser: '',
        SubscriptionDate: '',
        AdId: Math.random().toString(),// uuid(),
        DisplayAdID:''
    }


    static getPostData(): StoreModel {
        return Store._postAdDateModel;
    }
    static setPostData(value) { 
        Store._postAdDateModel.Category = value.Category;
        Store._postAdDateModel.Breed = value.Breed;
        Store._postAdDateModel.Gender = value.Gender;
        Store._postAdDateModel.Age = value.Age;
        Store._postAdDateModel.Weight = value.Weight;
        Store._postAdDateModel.Color = value.Color;
        Store._postAdDateModel.Type = value.Type;
        Store._postAdDateModel.MilkingCapacity = value.MilkingCapacity;
        Store._postAdDateModel.NoOfKids = value.NoOfKids;
        Store._postAdDateModel.KidsWeight = value.KidsWeight;
        Store._postAdDateModel.KidsDetails = value.KidsDetails;
        Store._postAdDateModel.Tittle = value.Tittle;
        Store._postAdDateModel.Description = value.Description;
    }

    static getContactData(): StoreModel {
        return Store._postAdDateModel;
    }
    static async setContactData(value: any) {
        Store._postAdDateModel.State = value.State,
            Store._postAdDateModel.District = value.District
        Store._postAdDateModel.Locality = value.Locality
        Store._postAdDateModel.Date = value.Date
        Store._postAdDateModel.imageRef = value.imageRef
        Store._postAdDateModel.UserId = value.UserId
        Store._postAdDateModel.Price = value.Price
        Store._postAdDateModel.UserName = value.UserName
        Store._postAdDateModel.MobileNum = value.MobileNum
        Store._postAdDateModel.Email = value.Email
        Store._postAdDateModel.UserId ="1";
        Store._postAdDateModel.DisplayAdID= value.DisplayAdID;
    }
}

export interface StoreModel {
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
    State: string;
    District: string;
    Locality: string;
    Date: string;
    imageRef: any;
    UserId: any;
    Price: any;
    UserName: string;
    MobileNum: string;
    Email: string;
    AdId: string;
    IsActiveAd: 'true',
    IsPremiumUser: string,
    SubscriptionDate: string,
    DisplayAdID:string
}