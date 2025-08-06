function normalization(data:{[key:string]:string}[]){
    let column_1:number[]=[]
    let column_2:number[]=[]
    for (let  row =0;row<data.length;row++){
        column_1.push(Number(data[row]['Age']))
        column_2.push(Number(data[row]['EstimatedSalary']))
    }
    let column_1_max = Math.max(...column_1)
    let column_1_min = Math.min(...column_1)
    let column_2_max = Math.max(...column_2)
    let column_2_min = Math.min(...column_2)
    for (let z=0;z<column_1.length;z++){
        column_1[z]=((column_1[z]-column_1_min)/(column_1_max-column_1_min))
    }
    for (let z=0;z<column_2.length;z++){
        column_2[z]=((column_2[z]-column_2_min)/(column_2_max-column_2_min))
    }
    return JSON.stringify({Age:column_1, EstimatedSalary:column_2})
}