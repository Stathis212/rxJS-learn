import { Observable } from 'rxjs/Observable';

var observable = Observable.create((observer: any) => {
    try {
        observer.next('Hey!');
        observer.next('How are you?');
        // add every 2 seconds and cancel observer with setTimeout for unsubscribe
        setInterval(() => {
            observer.next('I am good')
        }, 2000)
        // observer.complete();
        // observer.next('This will not send');
    } catch(err) {
        observer.error(err);
    }
});

var observer = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);

var observer2 = observable.subscribe(
    (x: any) => addItem(x)
);

// Child subscription so that both unsubscribe below
observer.add(observer2);

setTimeout(() => {
    observer.unsubscribe();
}, 6001);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}
