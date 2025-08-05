import Papa from 'papaparse'
import fs from 'fs'
import path from 'path'
import { cwd } from 'process'

let temp_matrix:number[][][]=[]

for (let i =0; i<10;i++){
    const row: number[][] = []
    for (let j =0;j<10;j++){
        row.push([])
    }
    temp_matrix.push(row)
}

const __dirname = cwd()

let file_path = path.join(__dirname,'social_ads.csv')
let file_data = fs.readFileSync(file_path,'utf-8')
let parsed_csv = Papa.parse(file_data,{
  header: true,
  skipEmptyLines: true
})

let database:{[key:number]:number}={}
let dataset :number[][]=[[.54,.12,.72,.45]]
let row:number[]=dataset[0]
for (let column:number=0; column<row.length;column++){
    let cell=row[column]
    let new_index: number = cell*10
    new_index=Math.floor(new_index)
    database[column]=cell
}
function toNumber(data:{[Age:string]: string}[]){
    let list_of_tuples:number[][]=[]
    for (let row=0;row<data.length;row++){
        list_of_tuples.push([Number(parsed_csv.data[row]['Age']),Number(parsed_csv.data[row]['EstimatedSalary'])])
    }
    return list_of_tuples;
}
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
    return {Age:column_1, EstimatedSalary:column_2}
}
console.log(normalization(parsed_csv.data))
fs.writeFileSync('new.csv',normalization(parsed_csv.data) )
//let column1_list:number[]


