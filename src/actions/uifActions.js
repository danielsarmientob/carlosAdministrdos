
import XLSX from 'xlsx';
import { types } from "../types/types";

export const setData=(e)=>{
        return async (dispatch)=>{
            let dataJson = [];
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
                                namePerson = [...namePerson,element['User ID']];
                            return {
                                WKSOPS_Username: element['WKSOPS_Username'],
                                Service_Tag: element['Service_Tag'],
                                WKSOPS_LIDCode: element['WKSOPS_LIDCode'],
                            }
                        });
                        const json = {
                            data: formatDJson
                        }
                        dataJson = [...dataJson,json];
                    })
                    const actionDataCompleta = {
                        type: types.dataUif,
                        payload: {
                            data: {
                                dataUif:dataJson,
                            }
                        }
                    }
                    dispatch(actionDataCompleta);
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
