console.log(solve(['Departures', 'London', '22:45', 'BR117', '42']));

function solve(arr) {
    return `${arr[0]}: Destination - ${arr[1]}, Flight - ${arr[3]}, Time - ${arr[2]}, Gate - ${arr[4]}`;
}
