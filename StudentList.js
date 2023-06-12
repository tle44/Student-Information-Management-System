function StudentList() {
    this.StuList = []; //student array

    //add student
    this.addStudent = function (student) {
        this.StuList.push(student);
    };

    this.deleteStudent = function (selectedStudentList) {
        for (var i = 0; i < selectedStudentList.length; i++) {
            for (var j = 0; j < this.StuList.length; j++) {
                var student = this.StuList[j];
                if (selectedStudentList[i] == student.StudentId) {
                    this.StuList.splice(j, 1);
                }
            }
        }
    };

    this.changeStudent = function (studentChanged) {
        for (var i = 0; i < this.StuList.length; i++) {
            var studentUpdated = this.StuList[i];
            console.log("haha");

            if (studentChanged.StudentId == studentUpdated.StudentId) {
                console.log("hahahihidfdsfdsfd");

                studentUpdated.FullName = studentChanged.FullName;
                studentUpdated.Email = studentChanged.Email;
                studentUpdated.ContactNumber = studentChanged.ContactNumber;
                studentUpdated.Id = studentChanged.Id;

                studentUpdated.MathGrade = studentChanged.MathGrade;
                studentUpdated.PhysGrade = studentChanged.PhysGrade;
                studentUpdated.Gpa = studentChanged.Gpa;
                studentUpdated.Rank = studentChanged.Rank;
            }
        }
    };

    this.lookUpStudent = function (keyword) {
        var lookUpResult = new StudentList();

        for (var i = 0; i < this.StuList.length; i++) {
            var student = this.StuList[i];
            if (
                student.FullName.toLowerCase()
                    .trim()
                    .search(keyword.toLowerCase().trim()) != -1
            ) {
                lookUpResult.addStudent(student);
            }
        }
        return lookUpResult;
    };

    this.lookUpStudentID = function (studentId) {
        for (var i = 0; i < this.StuList.length; i++) {
            var student = this.StuList[i];
            if (student.StudentId == studentId) {
                return student;
            }
        }
        return null;
    };
}
