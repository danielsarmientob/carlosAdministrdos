import XLSX, { read } from 'xlsx';

export const readExcel= async (e)=>{
    let hojas = [];
    if (e.target.files.length > 0) {
        try {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = async (e)=>{
                // console.log('entro');
                const data  = new Uint8Array(e.target.result);
                const worKbook =  XLSX.read(data, {type: "array"});
                console.log(worKbook);
                // const workSheet = worKbook.Sheets[worKbook.SheetNames[0]];
                // const sheet = XLSX.utils.sheet_to_json(worKbook,{  header: 1 });
                // const dataSet = await
                worKbook.SheetNames.forEach((sheetName)=>{
                    const a = XLSX.utils.sheet_to_json(worKbook.Sheets[sheetName]);
                    const json = {
                        sheetName,
                        data: a
                    }
                    hojas = [...hojas,json];
                })
                console.log('después')
                // setData(hojas);
                // return hojas;
            }
            console.log(hojas);
            return hojas;
        } catch (error) {
            console.log(error);
            return [];
        }

    }
}