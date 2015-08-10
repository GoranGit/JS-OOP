/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {

    function validateTitle(title) {
        if (!title || title.length < 1) {
            throw  new Error('The  title  must be  defined and more than 1 character!');
        }
        if (title[0] === ' ' || title[title.length - 1] === ' ') {
            throw  new Error('The  title  must start and end with no space!');
        }
        if (/\s\s/.test(title)) {
            throw  new Error('Titles have have consecutive spaces')
        }
        return true;
    }


    var studentID = 1;

    function getNextStudentID() {
        return studentID++;
    }

    function checkName(name) {
        var regex = /^[A-Z]([a-z])*$/;
        return regex.test(name)
    }

    function isNumber(number) {
        if (number === ' ') {
            return false;
        }
        else
            return number == Number(number);
    }

    var Course = {
        init: function (title, presentations) {
            if (!validateTitle(title)) {
                throw Error();
            }
            if (!presentations || presentations.length == 0) {
                throw Error();
            }
            for (var i = 0; i < presentations.length; i++) {
                if (!validateTitle(presentations[i])) {
                    throw Error();
                }
            }
            this.title = title;
            this.presentations = presentations;
            this.students = [];
            this.examResults = [];
            this.homeworks = [];
            return this;
        },
        addStudent: function (name) {
            if (name.split(' ').length > 2) {
                throw Error();
            }
            var firstName = name.split(' ')[0];
            var lastName = name.split(' ')[1];
            if (!checkName(firstName) || !checkName(lastName)) {
                throw Error();

            }
            var student = {
                firstname: firstName,
                lastname: lastName,
                id: getNextStudentID()
            };
            this.students.push(student);
            return student.id;
        }
        ,
        getAllStudents: function () {
            return this.students.slice();
        }
        ,
        submitHomework: function (studentID, homeworkID) {
            if (homeworkID < 1 || homeworkID > this.presentations.length) {
                throw Error();
            }
            if (!this.students.some(function (item) {
                    return item.id === studentID;
                })) {
                throw Error();
            }
            this.homeworks.push({id: studentID, HomeworkID: homeworkID});

        }
        ,
        pushExamResults: function (results) {
            var copyResults = results.slice();
            for (var i = 0; i < results.length; i += 1) {
                if (!this.students(function (item) {
                        return item.id === results[i].id;
                    })) {
                    throw Error();

                }
                if (!isNumber(results[i].Score)) {
                    throw Error();
                }
                if (!results.some(function (item, index) {
                        return ((item.id === results[i].id) && (index !== i));
                    })) {
                    this.examResults.push(results[i]);

                }

            }
            for (var i = 0; i < this.students.length; i += 1) {
                if (!results.some(function (item) {
                        return this.students[i].id === item.id;
                    })) {
                    this.examResults.push({id: this.students[i].id, Score: 0});
                }
            }
        }
        ,
        getTopStudents: function () {
            var finalResults = [];
            var countOfSubmitted = 0;
            for (var i = 0; i < this.students; i++) {
                var student = this.students[i];

                var studentId = student.id;
                var student = this.examResults.filter(function (item) {
                    return studentId === item.id;
                });
                var scoreExam = student.Score;
                var countOfAllHomeWorks = this.presentations.length;
                for (var i = 0; i < this.homeworks; i += 1) {
                    var homework = this.homeworks[i];
                    if (student.id === homework.id) {
                        countOfSubmitted++;
                    }
                }
                var scoreHomework = countOfSubmitted / countOfAllHomeWorks;
                var Score = (75 * scoreExam) / 100 + (25 * scoreHomework) / 100;
                finalResults.push({student: student, Score: Score});
            }
            finalResults = finalResults.sort(function (a, b) {
                return b.Score - a.Score;
            });
            if (finalResults.length <= 10) {
                return finalResults.slice();
            }
            return finalResults.slice(0, 10);
        }
    };

    return Course;
}

module.exports = solve;