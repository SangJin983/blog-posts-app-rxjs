import { Subject, map, filter } from "rxjs";

const subject = new Subject();
subject.subscribe((array) => console.log(array));
subject.subscribe((array) => console.log("numbers:" + array));
const newSubject = subject.pipe(
  map((number) => number * 2),
  filter((number) => number < 5)
);
newSubject.subscribe((array) => console.log(array));
subject.next([1, 2, 3, 4]);
newSubject.next([1, 2, 3, 4]);
