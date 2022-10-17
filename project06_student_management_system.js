import inquirer from "inquirer";
const courses = [
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "metaverse",
        fee_price: 3000,
        is_fee_paid: false,
    },
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "blockchain",
        fee_price: 2500,
        is_fee_paid: false,
    },
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "cnc",
        fee_price: 2000,
        is_fee_paid: false,
    },
];
const main_menu = [
    "view_students",
    "add_student",
    "~exit",
];
const student_options = [
    "show status",
    "my courses",
    "enroll",
    // "view balance",
    "~main_menu",
    "~exit",
];
let course_options = [
    "course status",
    "pay fee",
    "~main_menu",
    "~exit",
];
const students = [];
let students_options = [];
let status = "~main_menu";
class Student {
    id;
    name;
    courses_enroll;
    // public balance: number;
    constructor(name) {
        this.id = this.generateUUID() || "00001";
        this.name = name;
        this.courses_enroll = [];
        // this.balance = 0;
    }
    generateUUID() {
        const id = Math.floor(Math.random() * 99999) + "";
        if (id.length === 5)
            return id;
        this.generateUUID();
    }
    showStatus() {
        console.log(`
    id: ${this.id}
    name: ${this.name}
    `);
        // balance: ${this.balance}
    }
    enroll(course) {
        const is_enrolled = this.courses_enroll.find((course_enroll) => course_enroll.course_id === course.course_id);
        if (is_enrolled)
            return console.log("Enrolled Already.");
        this.courses_enroll.push(course);
        console.log(`Enrolled in ${course?.course_name} course Successfully.`);
    }
    pay_fee(course) {
        if (_course?.is_fee_paid)
            return console.log("Bohut paise hen kia, Already paid...");
        const updated_courses = this.courses_enroll.map((course_enroll) => course_enroll.course_id === course.course_id
            ? { ...course_enroll, is_fee_paid: true }
            : course_enroll);
        this.courses_enroll = updated_courses;
        console.log(`Paid fee Successfully.`);
    }
}
async function studentOptionPrompt(options) {
    const answers = await inquirer.prompt({
        name: "student_option",
        type: "list",
        message: `Select option.`,
        choices: options,
        default() {
            return "view students";
        },
    });
    return answers.student_option;
}
async function addStudentPromt() {
    const answers = await inquirer.prompt({
        name: "student",
        type: "input",
        message: `Enter student name...`,
        default() {
            return "Ameen Ilyas";
        },
    });
    return answers.student;
}
async function showMyCourses() {
    const my_courses = _student?.courses_enroll
        .map((course) => course.course_name)
        .concat(["~main_menu", "~exit"]);
    if (my_courses?.length && my_courses?.length > 2) {
        const course_name = await studentOptionPrompt(my_courses);
        const updated_course = _student?.courses_enroll.find((course) => course.course_name === course_name);
        _course = updated_course ? { ...updated_course } : undefined;
        previous_option = status;
        status = `${course_name}-enrolled`;
    }
    else {
        console.log(`You are not currently enrolled in any course, select enroll option to participate.`);
        previous_option = status;
        status = await studentOptionPrompt(student_options);
    }
}
async function enrollInCourse() {
    const updated_course = courses.find((course) => course.course_name === status);
    _course = updated_course ? { ...updated_course } : undefined;
    _student?.enroll(_course);
    previous_option = status;
    status = await studentOptionPrompt(student_options);
}
async function addStudent() {
    const student_name = (await addStudentPromt()).trim();
    const student = new Student(student_name);
    students.push(student);
    console.log(`Student, '${student_name}' added successfully.`);
    previous_option = status;
    status = "~main_menu";
}
async function viewStudent() {
    students_options = students
        .map((students) => students.name)
        .concat(["~main_menu", "~exit"]);
    if (!students_options.length)
        console.log("No Student Found...");
    previous_option = status;
    status = await studentOptionPrompt(students_options);
}
let _student;
let _course;
let previous_option = "";
while (status !== "~exit") {
    const _student_name = students_options.find((name) => name === status) || "";
    switch (status) {
        case "~main_menu":
            previous_option = status;
            status = await studentOptionPrompt(main_menu);
            break;
        case "view_students":
            await viewStudent();
            break;
        case "add_student":
            await addStudent();
            break;
        case _student_name: // dynamic Check
            _student = students.find((student) => student.name === status);
            previous_option = status;
            status = await studentOptionPrompt(student_options);
            break;
        case "enroll":
            const courses_name = courses
                .map((course) => course.course_name)
                .concat(["~main_menu", "~exit"]);
            previous_option = status;
            status = await studentOptionPrompt(courses_name);
            break;
        // case "view balance":
        // console.log(_student?.balance);
        // previous_option = status
        // status = await studentOption(student_options);
        // break;
        case "my courses":
            await showMyCourses();
            break;
        case "show status":
            _student?.showStatus();
            previous_option = status;
            status = await studentOptionPrompt(student_options);
            break;
        // enrolling in the course.
        case "metaverse":
            await enrollInCourse();
            break;
        case "blockchain":
            await enrollInCourse();
            break;
        case "cnc":
            await enrollInCourse();
            break;
        // course actions.
        case "metaverse-enrolled":
            previous_option = status;
            status = await studentOptionPrompt(course_options);
            break;
        case "blockchain-enrolled":
            previous_option = status;
            status = await studentOptionPrompt(course_options);
            break;
        case "cnc-enrolled":
            previous_option = status;
            status = await studentOptionPrompt(course_options);
            break;
        case "course status":
            console.log({ _course });
            previous_option = status;
            status = await studentOptionPrompt(course_options);
            break;
        case "pay fee":
            _student?.pay_fee(_course);
            if (_course?.is_fee_paid === false)
                _course.is_fee_paid = true;
            previous_option = status;
            status = await studentOptionPrompt(course_options);
            break;
        case "~exit":
            process.exit(0);
        default:
            break;
    }
}
