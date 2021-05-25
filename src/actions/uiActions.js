import { types } from "../types/types";
import XLSX from 'xlsx';

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
                                Operational_status: element['Operational status'],
                                Schedule: element['Schedule'],
                                Serial_number: element['Serial number'],
                                Substatus:element['Substatus'],
                                Support_group: element['Support group'],
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
