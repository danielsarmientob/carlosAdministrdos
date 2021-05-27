
import XLSX from 'xlsx';
import { types } from "../types/types";
//-- Acquisition method: "Purchase"
//-- Asset: "J0RLL32 - Dell LATITUDE E7440 E7440" 
//-- Assigned to: "Santiago Malca"
//-- Country: "Peru"
//-- Critical: false
//-- Form factor: "Laptop"
//-- Function: "Dedicated"
//-- Installed: 42204.083333333336
//-- Last Logged In User: "H118830"
//-- Location: "PU02"
//-- Manufacturer: "Dell"
//-- Model ID: "Dell LATITUDE E7440 E7440"
//-- Name: "PU02LTJ0RLL32"
//-- Region: "CANLA"
//-- Serial number: "J0RLL32"
//-- State: "Retired"  Operational_status
//-- Substate: "disposed"  Substatus
// Support Vendor: "HON CORP"
//-- Support group: "Site Desktop Support (CANLA:CI08 / CI12)"
//-- UID_Number: "4b0ab589dbf6c30050afd7795e9619ab"
//-- Updated: 44271.54759259259
//-- Updated by: "admin"
// User ID: "H118830"
export const setData=(e)=>{
        return async (dispatch)=>{
            let dataJson = [];
            let namePersonAsign = [];
            try {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onloadend = (e)=>{
                    const data  = new Uint8Array(e.target.result);
                    const worKbook =  XLSX.read(data, {type: "array"});
                    worKbook.SheetNames.forEach((sheetName)=>{
                        let namePerson = [];
                        const dJson = XLSX.utils.sheet_to_json(worKbook.Sheets[sheetName]);
                        const formatDJson = dJson.map((element)=>{
                            if(element['Assigned to'] !== '')
                                namePerson = [...namePerson,element['Assigned to']];
                            return {
                                Asset: element['Asset'],
                                Assigned_to: element['Assigned to'],
                                Location: element['Location'],
                                Manufacturer: element['Manufacturer'],
                                Name: element['Name'],
                                Operational_status: element['State'],
                                // Schedule: element['Schedule'],
                                Serial_number: element['Serial number'],
                                Substatus:element['Substate'],
                                Support_group: element['Support group'],
                                Acquisition_method: element['Acquisition method'],
                                Country: element['Country'],
                                Form_factor: element['Form factor'],
                                Function: element['Function'],
                                Installed: element['Installed'],
                                //Last_Logged_In_User: element['Last Logged In User'],
                                //Model_ID: element['Model ID'],
                                //Region: element['Region'],
                                UID_Number: element['UID_Number'],
                                Updated: element['Updated'],
                                Updated_by: element['Updated by'],
                                User_ID: element['User ID']
                            }
                        });
                        const json = {
                            sheetName,
                            data: formatDJson
                        }
                        dataJson = [...dataJson,json];
                        
                        let personConjunto = new Set(namePerson);
                        
                        const jsonAsign = {
                            sheetName,
                            data: Array.from(personConjunto)
                        }
                        namePersonAsign = [...namePersonAsign,jsonAsign];

                    })
                    const actionDataCompleta = {
                        type: types.data,
                        payload: {
                            data: {
                                dataUi:dataJson,
                                nombrePais: dataJson[0]['sheetName'],
                                paisElegido: dataJson[0]['data'],
                                personasAsig: namePersonAsign[0]['data']
                            }
                        }
                    }
                    dispatch(actionDataCompleta);
                    const actionPersonAsign = {
                        type: types.personAsig,
                        payload: {
                            data: namePersonAsign
                        }
                    }
                    dispatch(actionPersonAsign);
                }
            } catch (error) {
                console.log(error);
            }
        }
}

export const cleanData= ()=>{
    return async(dispatch)=>{
        const actioClean = {
            type: types.cleanData,
        }
        dispatch(actioClean)
    }
}
