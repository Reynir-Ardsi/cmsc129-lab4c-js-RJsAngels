let students = [];

function time_now() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const time = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    document.getElementById('date_display').innerHTML =
        `Today is ${formattedDate}.<br>The current time is ${time}.`;
}

function generateStudentNumber() {
    let studentNumber;
    do {
        studentNumber = "2023" + Math.floor(10000 + Math.random() * 90000);
    } while (students.some(student => student.studentNumber === studentNumber));
    return studentNumber;
}

function validateInput(name, age, email) {
    let errors = [];

    if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(name) || name.length <= 5) {
        errors.push("Name must be more than 5 characters and contain a space.");
    }
    if (isNaN(age) || age < 18 || age > 99) {
        errors.push("Age must be a number between 18 and 99.");
    }
    if (!email.endsWith("@up.edu.ph")) {
        errors.push("Email must end with @up.edu.ph.");
    }

    return errors;
}

function add_student() {
    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value;

    let errors = validateInput(name, age, email);
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    let student = {
        studentNumber: generateStudentNumber(),
        name: name,
        age: age,
        email: email,
        course: course
    };

    students.push(student);
    alert("Student added successfully! Student Number: " + student.studentNumber);

    document.getElementById("student_form").reset();
}

function find_student() {
    let searchID = document.getElementById("search_id").value.trim();
    let student = students.find(s => s.studentNumber === searchID);

    if (student) {
        document.getElementById("search_result").innerHTML = `
            <strong>Student Found:</strong><br>
            Student Number: ${student.studentNumber}<br>
            Name: ${student.name}<br>
            Age: ${student.age}<br>
            Email: ${student.email}<br>
            Course: ${student.course}
        `;
    } else {
        document.getElementById("search_result").innerText = "Student record does not exist.";
    }
}

function display_list() {
    let studentList = document.getElementById("student_list");
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<li>No students registered.</li>";
        return;
    }

    students.forEach(student => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${student.studentNumber}</strong>: ${student.name}, ${student.age} years old, ${student.email}, ${student.course}
        `;
        studentList.appendChild(listItem);
    });
}
