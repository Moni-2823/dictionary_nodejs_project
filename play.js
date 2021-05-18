// q : a = [1,2,3..n]

// for(var i = 0; i<=n; i++)
// {
//     if(a[i] == 3) {
//         console.log('number',a[i])
//     }else {
//         console.log('number not found')
//     }
// }

// var a = [4, 5, 8, 1, 9, 3, 0]
// var find = 5;
// for (let i = 0; i < a.length; i++) {
//     if (a[i] == find) {
//         return console.log(a[i])
//     }    
// }
// console.log('number not found')

// q: a= [2,6,7...n]

// var a = [5, 3, 8, 1, 6]
// for(var j = 0; j<= a.length; j++) {
//     for(var i = 0;i <= a.length; i++)
//     {
//         if(a[i] > a[i+1]) {
//             temp = a[i];
//             a[i] = a[i+1];
//             a[i+1] = temp;
//         }
//         console.log(`step, j=${j} inneriteration: i=${i}== ${a}`)
//     }
// }
// console.log('ascending array',a);

// q: setTimeout and settimeinterval diff

// setTimeout(() => {
//     console.log('hello')
// }, 5000)

// setInterval(() => {
//     console.log('hello2')
// }, 3000)

// if (2 == '2') {
//     console.log('yes')
// }

// q: w.a.p. to add two arrays a:[n] + b:[n] both arays lenght will not be equal

// var c = []
// var a = [2, 5, 7, 1, 9]
// var b = [4, 7, 0, 5]
// for(var i = 0;i< a.length; i++) {
//     if (!b[i]) {
//         c[i] = a[i]
//     }
//     else if (!a[i]) {
//         c[i] = b[i]
//     }else {
//         c[i] = a[i] + b[i]
//     }
// }
// console.log("addition array",c)

// z = [2,4,5]

// z.pop(1, 2)

// console.log(z)
