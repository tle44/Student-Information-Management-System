var studentList = new StudentList();
GetStorage();
var validate = new Validation();

//prototype
Student.prototype.MathGrade = "";
Student.prototype.PhysGrade = "";
Student.prototype.ChemGrade = "";
Student.prototype.Gpa = "";
Student.prototype.Rank = "";
//
Student.prototype.calculateGpa = function () {
    this.Gpa = (
        (Number(this.MathGrade) +
            Number(this.PhysGrade) +
            Number(this.ChemGrade)) /
        3
    ).toFixed(2);
};

Student.prototype.calculateRank = function () {
    if (this.Gpa <= 10 && this.Gpa >= 8) {
        this.Rank = "Excellent";
    } else if (this.Avg < 8 && this.Avg > 6.5) {
        this.Rank = "Good";
    } else {
        this.Rank = "Poor";
    }
};

function addStudent() {
    //get input
    var stuID = document.getElementById("stuID").value;
    var fullName = document.getElementById("fullName").value;
    var idNumber = document.getElementById("idNumber").value;
    var contactNumber = document.getElementById("contactNumber").value;
    var email = document.getElementById("email").value;
    var error = 0;

    //validation
    if (checkEmptyInput("stuID", stuID) == true) {
        error++;
    }
    if (checkEmptyInput("fullName", fullName) == true) {
        error++;
    }
    if (checkEmptyInput("idNumber", idNumber) == true) {
        error++;
    }
    if (!validate.checkNumber(contactNumber)) {
        document.getElementById("contactNumber").style.borderColor = "red";
        error++;
    } else {
        document.getElementById("contactNumber").style.borderColor = "green";
    }
    if (!validate.checkEmail(email)) {
        document.getElementById("email").style.borderColor = "red";
        error++;
    } else {
        document.getElementById("email").style.borderColor = "green";
    }

    if (error != 0) {
        return;
    }

    //add student
    var studentAdded = new Student(
        stuID,
        fullName,
        email,
        contactNumber,
        idNumber
    );

    studentAdded.MathGrade = document.getElementById("math").value;
    studentAdded.PhysGrade = document.getElementById("phys").value;
    studentAdded.ChemGrade = document.getElementById("chem").value;
    studentAdded.calculateGpa();
    studentAdded.calculateRank();
    studentList.addStudent(studentAdded);
    //update student
    updateStudentList(studentList);
}

function checkEmptyInput(id, value) {
    if (validate.checkEmpty(value) == true) {
        document.getElementById(id).style.borderColor = "red";
        return true;
    } else {
        document.getElementById(id).style.borderColor = "green";
        return false;
    }
}

function updateStudentList(StudentList) {
    var first_table = document.getElementById("studentTableBody");
    first_table.innerHTML = "";

    //get student info from array
    for (var i = 0; i < StudentList.StuList.length; i++) {
        var student = StudentList.StuList[i];

        var trStudent = document.createElement("tr");
        trStudent.id = student.StudentId;
        trStudent.className = "trStudent";
        trStudent.setAttribute(
            "onclick",
            "makeChange('" + student.StudentId + "')"
        );
        //create td tag student[i]
        var tdCheckBox = document.createElement("td"); //create checkBox
        var checkBoxStuID = document.createElement("input");
        checkBoxStuID.setAttribute("class", "checkboxStudentID");
        checkBoxStuID.setAttribute("type", "checkbox");
        checkBoxStuID.setAttribute("value", student.StudentId);
        tdCheckBox.appendChild(checkBoxStuID);

        var tdStuId = createTdTagElement("StuId", student.StudentId);
        var tdFullName = createTdTagElement("FullName", student.FullName);
        var tdId = createTdTagElement("Id", student.Id);
        var tdEmail = createTdTagElement("Email", student.Email);
        var tdContactNumber = createTdTagElement(
            "StuId",
            student.ContactNumber
        );
        var tdGpa = createTdTagElement("Gpa", student.Gpa);
        var tdRank = createTdTagElement("Rank", student.Rank);

        //append td vao tr
        trStudent.appendChild(tdCheckBox);
        trStudent.appendChild(tdStuId);
        trStudent.appendChild(tdFullName);
        trStudent.appendChild(tdId);
        trStudent.appendChild(tdEmail);
        trStudent.appendChild(tdContactNumber);
        trStudent.appendChild(tdGpa);
        trStudent.appendChild(tdRank);
        //append tr into tbodySV
        first_table.appendChild(trStudent);
    }
}

function createTdTagElement(className, value) {
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function SetStorage() {
    //convert object to string
    var jsonStudentList = JSON.stringify(studentList.StuList);
    //set string into storage
    localStorage.setItem("St_List", jsonStudentList);
}

function GetStorage() {
    //get string from storage
    var jsonStudentList = localStorage.getItem("St_List");
    //convert string to object
    var studentObject = JSON.parse(jsonStudentList);
    studentList.StuList = studentObject;
    updateStudentList(studentList);
}

function DeleteStudent() {
    var selectedStudent = document.getElementsByClassName("checkboxStudentID");

    var selectedStudentList = [];
    for (i = 0; i < selectedStudent.length; i++) {
        if (selectedStudent[i].checked) {
            selectedStudentList.push(selectedStudent[i].value);
        }
    }

    studentList.deleteStudent(selectedStudentList);
    updateStudentList(studentList);
}

function lookUpStudent() {
    var keyword = document.getElementById("keyword").value;
    var lookUpList = studentList.lookUpStudent(keyword);
    updateStudentList(lookUpList);
}

function makeChange(studentID) {
    var student = studentList.lookUpStudentID(studentID);
    if (student != null) {
        document.getElementById("stuID").value = student.StudentId;
        document.getElementById("fullName").value = student.FullName;
        document.getElementById("email").value = student.Email;
        document.getElementById("contactNumber").value = student.ContactNumber;
        document.getElementById("idNumber").value = student.Id;
    }
}

function saveInfo() {
    //get input
    var stuID = document.getElementById("stuID").value;
    var fullName = document.getElementById("fullName").value;
    var idNumber = document.getElementById("idNumber").value;
    var contactNumber = document.getElementById("contactNumber").value;
    var email = document.getElementById("email").value;
    var error = 0;

    //validation
    if (checkEmptyInput("stuID", stuID) == true) {
        error++;
    }
    if (checkEmptyInput("fullName", fullName) == true) {
        error++;
    }
    if (checkEmptyInput("idNumber", idNumber) == true) {
        error++;
    }
    if (!validate.checkNumber(contactNumber)) {
        document.getElementById("contactNumber").style.borderColor = "red";
        error++;
    } else {
        document.getElementById("contactNumber").style.borderColor = "green";
    }
    if (!validate.checkEmail(email)) {
        document.getElementById("email").style.borderColor = "red";
        error++;
    } else {
        document.getElementById("email").style.borderColor = "green";
    }

    if (error != 0) {
        return;
    }
    //add student
    var studentAdded = new Student(
        stuID,
        fullName,
        email,
        contactNumber,
        idNumber
    );

    studentAdded.MathGrade = document.getElementById("math").value;
    studentAdded.PhysGrade = document.getElementById("phys").value;
    studentAdded.ChemGrade = document.getElementById("chem").value;
    studentAdded.calculateGpa();
    studentAdded.calculateRank();

    studentList.changeStudent(studentAdded);
    //update student
    updateStudentList(studentList);
}
