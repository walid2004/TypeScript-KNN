const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
let database:{[key:number]:number}={}
let dataset :number[][]=[[.54,.12,.72,.45]]
let row:number[]=dataset[0]
for (let column:number=0; column<row.length;column++){
    let cell=row[column]
    let new_index: number = cell*10
    new_index=Math.floor(new_index)
    database[column]=cell
}
console.log(database)
//let column1_list:number[]


