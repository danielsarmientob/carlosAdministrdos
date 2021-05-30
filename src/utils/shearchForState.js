export const shearchForState = (dataUi, condicion)=>{
    let nameLabels = [];
    let data = []; 
    dataUi.forEach((dataPais)=>{
        const machinesMissing = dataPais['data'].filter(({Operational_status})=> Operational_status === condicion);
        nameLabels = [...nameLabels, dataPais['sheetName']];
        data = [...data, machinesMissing.length];
    });
    return {
        nameLabels,
        data
    }
}