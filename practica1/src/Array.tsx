const myArray: number[] = [1, 2, 3, 4, 5];
function Array() {
  return (
    <div>  
         
        {myArray.map((item, index) => {
            return <li key={index}>{item}</li>/// <reference path="" />
        })}
    </div>)
}
export default Array;