import Realm from 'realm';
import Helpers from "../utils/Helper";

const ClientGroups = {
    name: 'client_groups',
    primaryKey: 'date',
    properties: {
        date: 'string',
    }
}

const Clients = {
    name: 'clients',
    primaryKey: 'id',
    properties: {
        date: 'string',
        id: 'string',
        name: 'string',
    }
}

const Customers = {
    name: 'customers',
    primaryKey: 'id',
    properties: {
        id: 'string',
        client_id: 'string',
        ten: 'string',
        ten_giong: 'string',
        gia_mua: {
            type: 'float',
            default: 0,
        },
        ngay_can: 'string',
        tong_kl: {
            type: 'float',
            default: 0,
        },
        slb: {
            type: 'int',
            default: 0,
        },
        klbb: {
            type: 'float',
            default: 0,
        },
        klcl: {
            type: 'float',
            default: 0
        },
        tt: {
            type: 'float',
            default: 0,
        },
        is_unblock: {
            type: 'int',
            default: 0,
        },
        is_calculate: {
            type: 'int',
            default: 0,
        },
    }
}

const Sheets = {
    name: 'sheets',
    primaryKey: 'id',
    properties: {
        id: 'string',
        sheet_no: 'int',
        result: 'float',
        customer_id: 'string',
    }
}

const SheetItems = {
    name: 'sheet_items',
    primaryKey: 'id',
    properties: {
        id: 'string',
        sheet_id: 'string',
        item_no: 'int',
        value: 'string',
    }
}

const Settings = {
    name: 'settings',
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string',
    }
}

const Schema = {
    ClientGroups: 'client_groups',
    Clients: 'clients',
    Customers: 'customers',
    Sheets: 'sheets',
    SheetItems: 'sheet_items',
    Settings: 'settings',
}

const databaseOptions = {
    path: 'calculator.realm',
    schema: [ClientGroups, Clients, Customers, Sheets, SheetItems, Settings],
    schemaVersion: 1,
}

export const getAllClientGroup = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let clientGroup = realm.objects((Schema.ClientGroups));
        resolve(clientGroup);
    }).catch((error) => { reject(error) })
})

export const insertClient = (name) => new Promise((resolve, reject) => {
    let dateCurrent = Helpers.GetDateCurrent();
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let clientGroup = realm.objectForPrimaryKey(Schema.ClientGroups, dateCurrent);

            if(clientGroup === undefined){
                realm.create(Schema.ClientGroups, {date: dateCurrent});
            }
        })

        realm.write(() => {
            let data = {
                date: dateCurrent,
                name: name,
                id: Helpers.Guid1('client'),
            }

            let client = realm.create(Schema.Clients, data);
            resolve(client);
        })
    })
})

export const getClientByGroup = (group) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const clients = realm.objects(Schema.Clients).filtered('date = $0', group);
        resolve(clients);
    }).catch((error) => { reject(error) })
})

export const getCustomerByClient = (client_id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const customers = realm.objects(Schema.Customers).filtered('client_id = $0', client_id);
        resolve(customers);
    }).catch((error) => { reject(error) })
})

export const getOneCustomer = (customer_id) => new Promise((resole, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let customer = realm.objectForPrimaryKey(Schema.Customers, customer_id);
        resole(customer);
    }).catch((error) => {
        reject(error);
    })
})

export const insertCustomer = (customer) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let result = realm.create(Schema.Customers, customer);
            resolve(result);
        })
    }).catch((error) => { reject(error) })
})

export const updateUnBlockCustomer = (id, isUnBlock) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let customer = realm.objectForPrimaryKey(Schema.Customers, id);
        if(customer !== undefined)
        {
            realm.write(() => {
                customer.is_unblock = 1;
            })
            resolve(true);
        }
    }).catch((error) => { reject(error) })
})

export const updateIsCalculateCustomer = (id, isCalculator) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let customer = realm.objectForPrimaryKey(Schema.Customers, id);
        if(customer !== undefined)
        {
            realm.write(() => {
                customer.is_calculate = 1;
            })
            resolve(true);
        }
    }).catch((error) => { reject(error) })
})

export const createSheet = (sheetNo, customerId) => new Promise((resole, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let sheet = {
            id: Helpers.Guid1('sheet_'),
            sheet_no: sheetNo,
            result: 0,
            customer_id: customerId,
        }

        realm.write(() => {
            realm.create(Schema.Sheets, sheet);
        })

        for(let i = 1; i <= 25; i++){
            let sheetItem = {
                id: Helpers.Guid1('sheet_item'),
                sheet_id: sheet.id,
                item_no: i,
                value: '',
            }

            realm.write(() => {
                realm.create(Schema.SheetItems, sheetItem);
            })
        }

        resole(sheet)

    }).catch((error) => { reject(error) })
})

export const getSheets = (customer_id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const sheets = realm.objects(Schema.Sheets).filtered('customer_id = $0', customer_id).sorted('sheet_no');
        resolve(sheets);
    }).catch((error) => { reject(error) })
})

export const getSheetItems = (sheetId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        const sheetItems = realm.objects(Schema.SheetItems).filtered('sheet_id = $0', sheetId);
        resolve(sheetItems);
    }).catch((error) => {
        reject(error);
    })
})

export const updateSheetItem = (sheetItemId, value) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let sheetItem = realm.objectForPrimaryKey(Schema.SheetItems ,sheetItemId);
        if(sheetItem !== undefined){
            realm.write(() => {
                sheetItem.value = value;
                resolve(sheetItem);
            })
        }
    }).catch((error) => {
        reject(error)
    })
})

export const getSettingByKey = (key) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let setting = realm.objectForPrimaryKey(Schema.Settings, key);
        resolve(setting)
    }).catch((error) => { reject(error) })
})

export const getAllSettings = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let settings = realm.objects(Schema.Settings);
        resolve(settings);
    }).catch((error) => { reject(error) })
})

export const updateSetting = (qcmc, tbb) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let settings = realm.objects(Schema.Settings);

        realm.write(() => {
            settings.map((setting) => {
                if(setting.key === Setting_Quy_Cach_Ma_Can){
                    setting.value = qcmc;
                }

                if(setting.key === Setting_Tru_Bi_Bao){
                    setting.value = tbb;
                }
            })
            resolve(settings);
        })

    }).catch((error) => {
        reject(error)
    })
})

export const updateToTalResultSheet = (sheet_id, result) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        let sheet = realm.objectForPrimaryKey(Schema.Sheets, sheet_id);
        realm.write(() => {
            sheet.result = result;
        })
        resolve(sheet);
    }).catch((error) => { reject(error) })
})

export const Setting_Quy_Cach_Ma_Can = 'quy_cach_ma_can';
export const Setting_Tru_Bi_Bao = 'tru_bi_bao';

const objectRealm = new Realm(databaseOptions);
objectRealm.write(() => {
    let quyCachMaCan = objectRealm.objectForPrimaryKey(Schema.Settings, Setting_Quy_Cach_Ma_Can);
    if(quyCachMaCan === undefined){
        objectRealm.create(Schema.Settings, {key: Setting_Quy_Cach_Ma_Can, value: '0'});
    }

    let truBiBao = objectRealm.objectForPrimaryKey(Schema.Settings, Setting_Tru_Bi_Bao);
    if(truBiBao === undefined){
        objectRealm.create(Schema.Settings, { key: Setting_Tru_Bi_Bao, value: '8' });
    }
})


export default new Realm(databaseOptions);
