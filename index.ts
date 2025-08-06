import Papa from 'papaparse'
import fs from 'fs'
import path from 'path'
import { cwd } from 'process'

let temp_matrix:number[][][][]=[]

for (let i =0; i<10;i++){
    const row: number[][][] = []
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

function normalization(data:{[key:string]:string}[],){
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

    return [column_1_max,column_1_min,column_2_max,column_1_min]
}

function toNumber(data:{[Age:string]: string}[]){
    let list_of_tuples:number[][]=[]
    for (let row=0;row<data.length;row++){
        list_of_tuples.push([Number(parsed_csv.data[row]['Age']),Number(parsed_csv.data[row]['EstimatedSalary']),Number(parsed_csv.data[row]['Purchased'])])
    }
    let metrics:number[]= normalization(data)
    for (let z=0;z<list_of_tuples.length;z++){
        let temps:number[]=[0,0,0]
        for (let column of [0,1]){
            let cell_half:number =list_of_tuples[z][column]
            list_of_tuples[z][column]=((cell_half-metrics[1+2*column])/(metrics[0+2*column]-metrics[1+2*column]))
            temps[column]=list_of_tuples[z][column]
    }
        temps[2]=list_of_tuples[z][2]
        let x:number=temps[0]
        x=10*x
        x=Math.floor(x)
        let y:number=temps[1]
        y=10*y
        y=Math.floor(y)
        console.log(`${x},${y}`)
        if (x==10){
            x=9
        }
        if (y==10){
            y=9
        }
        temp_matrix[x][y].push(temps)
    }
    return(list_of_tuples)

}
console.log(temp_matrix)
toNumber(parsed_csv.data)//let column1_list:number[]
console.log(temp_matrix)

for (const list of temp_matrix){
    console.log(list)
}



function predict(data:number[]){
        let to_be_sent:number[][][]=[]
        let x:number=data[0]
        x=10*x
        x=Math.floor(x)
        let y:number=data[1]
        y=10*y
        y=Math.floor(y)
        if (x==10){
            x=9
        }
        if (y==10){
            y=9
        }
        for (let a =x-1;a<=x+1;a++){
            for (let b=y-1;b<=y+1;b++){
                to_be_sent.push(temp_matrix[a][b])
            }
        }
        return(to_be_sent)
}
console.log('#################################################################')
console.log(predict([.32,.009]))