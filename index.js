const delayedPromiseChain = async (promiseFunctions, delay) => {
    let answer;
    for await (const x of promiseFunctions) {
        answer = await x().then(data => data)
        await setTimeout(() => { }, delay)
    }
    return new Promise(resolve => resolve(answer))
}

const promise1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1000));
const promise2 = () => new Promise(resolve => setTimeout(() => resolve(2), 500));
const promise3 = () => new Promise(resolve => setTimeout(() => resolve(3), 800));
const promise4 = () => new Promise(resolve => setTimeout(() => resolve(4), 300));
const promises = [promise1, promise2, promise3, promise4];
const wait = () => new Promise(resolve => setTimeout(resolve, 1000));
const delay = 1000;

// with async await
delayedPromiseChain(promises, delay).then(data => console.log("Promise(returned by the function), \nafter resolving....\nReturned: ", data))

// with .then() method using promises 
promise1()
    .then(wait)
    .then(promise2)
    .then(wait)
    .then(promise3)
    .then(wait)
    .then(promise4)
    .then(r => console.log('with promises delay', r))