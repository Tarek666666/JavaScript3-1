/* # STORY */



class Person {
  constructor(name, age, job, residence, isMarried, childeren, hobbies) {
    (this.name = name),
      (this.age = age),
      (this.job = job),
      (this.residence = residence),
      (this.isMarried = isMarried),
      (this.childeren = childeren),
      (this.hobbies = hobbies);
  }
}

class Animal {
  constructor(type, name, age, color, food, activities) {
    (this.type = type), (this.name = name), (this.age = age);
    (this.color = color), (this.food = food), (this.activities = activities);
  }
}

let abdulKareem = new Person(
  'AbdulKareem',
  35,
  'Construction Worker',
  'Ryiadh',
  true,
  3,
  ['eating', ' smoking water pipe'],
);
let adel = new Animal('Horse', 'Adel', 15, 'Brown', 'grass', [
  'helps transport materials',
]);



let story = ` ${abdulKareem.name} is a ${abdulKareem.age} year old man, that lives in ${abdulKareem.residence}. He has a wife and ${abdulKareem.childeren} childeren.
                         As a day job he's a ${abdulKareem.job}, that makes houses.  He likes ${abdulKareem.hobbies}.

${abdulKareem.name} has a horse, named ${adel.name}. The horse is ${adel.age} years old and has the color ${adel.color}. 
Usually the horse eats ${adel.food} or ${adel.activities} for Abdulkareem. `;

console.log(abdulKareem);
console.log(adel);
console.log(story);
