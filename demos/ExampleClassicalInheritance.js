/**
 * Created by Goran on 7/1/2015.
 */


var Person=(function(){

 function Person(firstname,lastname)
    {
        this.firstname = firstname;
        this.lastname =lastname;
    }

    Object.defineProperty(Person.prototype,'firstname',{
        set:function(firstname){
            if(!firstname.match(/^[A-Z][a-z]+$/)||firstname ==='undefined')
            {
               throw  new Error();
            }else
            this._firstname = firstname;
        },
        get:function(){
            return this._firstname;
        }
    });

    Object.defineProperty(Person.prototype,'lastname',{
        set:function(lastname){
            if(!lastname.match(/^[A-Z][a-z]+$/)||lastname ==='undefined')
            {
                throw  new Error();
            }else
                this._lastname= lastname;
        },
        get:function(){
            return this._lastname;
        }
    });

   Object.defineProperty(Person.prototype,'fullname',{
       get:function(){
           return this.firstname + ' '+ this.lastname;
       },
         set:function(fullname){
             var fnameLname = fullname.split(' ');

             this.firstname = fnameLname[0];
             this.lastname = fnameLname[1];
             return
         }
   });

        Person.prototype.toString = function(){
            return 'HI I\'am '+this.fullname;
        };

    return Person;
}());

var Student = (function(parent){
    var Lastid = 0;


    function getLastId()
    {
        Lastid+=1;
        return Lastid;
    }

    function Student(firstname,lastname)
    {
        parent.call(this,firstname,lastname);
        this._studentId = getLastId();
    }

    Student.prototype = (function(parent){
        function F(){};
        F.prototype = parent.prototype;
        return new F;
    }(parent));

    Student.prototype.toString = function(){
        return parent.prototype.toString.call(this)+' and I am student with StudentId='+this.studentId;
    }

    Object.defineProperty(Student.prototype,'studentId',{
        get:function(){
            return this._studentId;
        }

    });

    return Student;
}(Person));

var Course = (function () {



    function validateTitle(title)
    {
        if(!title || title.length<1)
        {
            throw  new Error('The  title  must be  defined and more than 1 character!');
        }

        if(title[0]===' ' || title[title.length-1]===' ')
        {
            throw  new Error('The  title  must start and end with no space!');
        }
        if(/\s\s/.test(title))
        {
            throw  new Error('Titles have have consecutive spaces')
        }
        return true;
    }

    function checkStudentExist(student){
        var stdId = student.studentId;
        if(this._students.some(function(item){
               return item.student.studentId===stdId;
            }))
        {
            return true;
        }else
        return false;
    }

   function Course(title)
   {
       this._StudentId = 0;
       this.title = title;
       this._presentation = [];
       this._students = [];
       this._nextPresentationId = 1;
       StudentId = 0;
       this._homeworks =[];
       this._exams = [];
   };

    Object.defineProperty(Course.prototype,'title',{
        set:function(title) {
            validateTitle(title);
            this._title = title;
            return this;
        },
        get:function(){
            return this._title;
        }
    });
    Course.prototype.addPersentations= function(arr)
    {
        if(!arr|| arr.length===0)
        {
            throw  new Error('Pressentations array must be not empty!');
        }
        else
        {
            if(arr instanceof Array) {
                validateTitle.apply(this, arr);

                for(var i= 0,len=arr.length;i<len;i+=1)
                {
                    var k = {title:arr[i],id: this._nextPresentationId++};
                    this._presentation.push(k);
                }
            }else
            {
                validateTitle(arr);
                var obj = {title:arr,id:this._nextPresentationId++};
                this._presentation.push(obj);
            }

        }
    }

    Course.prototype.addStudent = function(student)
    {
        if(!(student instanceof Student))
        {
            throw  new Error('This Person is not student!');
        }
            if(checkStudentExist.call(this,student))
            {
                throw  new Error('Student alredy exist in this course!');
            }
        var stdCopy = (function(student){
            function F(){};
            F.prototype = student;
            return new F;
        }(student));


        stdCopy.prototype = student
        var id = ++this._StudentId;
        this._students.push({student:stdCopy,id:id});
    }

    Course.prototype.getAllStudents = function(){
        var arr = [];
        arr = this._students.map(function(item){
            return item.student;
        });
        return arr;
    }

    Course.prototype.submitHomework = function(studentId,homeworkId)
    {
            if(checkStudentExist.call(this,{studentId:studentId})){
                var presentationsIDs = this._presentation.map(function(item){
                    return item.id;
                });
                if(presentationsIDs.some(function(item){
                       return item ===homeworkId;
                    })){
                    this._homeworks.push({studentId:studentId,homeworkId:homeworkId});
                }
                else{
                    throw  new Error('This presentastion do not exist!');
                }
            }else{
                throw  new Error('Student woth id='+studentId+' do not exist!');
            }
    }



    function checkStudentsExamResults(score)
    {
        for(var i= 0,len = score.length;i<len;i+=1)
        {



            if(!isNaN(score.score)&&score.score===' ')
            {
                throw new Error('Score is not a number!');
            }

            var res = score[i];
         if(score.some(function(item,index){
                return item.studentId ===res.studentId && index!==i;
            })){
             throw  new Error('Duplicate student!');
         }
            if(!this._students.some(function(item){
                    return score.studentId ===item.studentId;
                }))
            {
                throw  new Error('Student not exist in this course!');
            }

        }
        return true;

    }

    function addScoreToRestStudents()
    {
        for(var i= 0,len=this._students.length;i<len;i+=1)
        {
            var id = this._students[i].id;
           if(!this._exams.some(function(item){
                 return  item.studentId===id;
               }))
           {
               this._exams.push({studentId:id,score:0});
           }

        }
    }
    Course.prototype.pushExamResults = function(scores)
    {
        if(checkStudentsExamResults.call(this,scores))
        {
            [].push.apply(this._exams,scores);
            addScoreToRestStudents.call(this);
        }
    }

    function getTopTen()
    {
        var exams = this._exams;
        var homeworks = this._homeworks;

        var result = [];
        for(var i= 0,len = this._students.length;i<len;i+=1)
        {
            var studentId = this._students[i].id;
            var examToStudent ;
          if(exams.some(function(item){
                examToStudent = item;
                return item.studentId===studentId;
            }))
          {
              var obj = {student:this._students[i],finalscore}
          }

        }
    }

return Course;
}());

var Goran = new Student('Goran','Cvetkov');

var Aleksandra = new Student('Aleksandra','Stojcheva');

console.log(Goran.toString());
console.log(Aleksandra.toString());

var JSOOP = new Course('JavaScript OOP');
var JSBasic = new Course('JavaScript Basic');
JSBasic.addStudent(Goran);

JSOOP.addStudent(Goran);
JSOOP.addStudent(Aleksandra);
JSOOP.addPersentations(['proba','proba2','proba3']);
JSOOP.pushExamResults([{studentId:1,score:70},{studentId:1,score:70}]);

JSOOP.submitHomework(1,2);
JSBasic.addStudent(Aleksandra);
//JSOOP.addStudent(Aleksandra);
//console.log(JSOOP._students);
//console.log(JSBasic._students);
//console.log(JSBasic.getAllStudents());
console.log(JSOOP._exams);
