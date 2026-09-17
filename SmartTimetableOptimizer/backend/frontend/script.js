let groups = [];
let teachers = [];
let subjects = [];
let rooms = [];
let generatedTimetable = [];

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.remove("hidden");
    }
    if (sectionId === "calendar") {
        generateAcademicCalendar();

        if (selectedCalendarDate) {
            const selectedDate = new Date(selectedCalendarDate + "T00:00:00");
            displayDateWiseTimetable(selectedDate);
        }
    }
}

function updateDashboard() {
    const studentCount = document.getElementById("studentCount");
    const teacherCount = document.getElementById("teacherCount");
    const subjectCount = document.getElementById("subjectCount");
    const roomCount = document.getElementById("roomCount");

    if (studentCount) studentCount.textContent = groups.length;
    if (teacherCount) teacherCount.textContent = teachers.length;
    if (subjectCount) subjectCount.textContent = subjects.length;
    if (roomCount) roomCount.textContent = rooms.length;
}

function addGroup() {
    const name = document.getElementById("groupName").value.trim();
    const students = Number(document.getElementById("groupCount").value);

    if (!name || !students) {
        alert("Please enter group name and student count.");
        return;
    }

    groups.push({
        name: name,
        students: students
    });

    document.getElementById("groupName").value = "";
    document.getElementById("groupCount").value = "";

    displayGroups();
    updateDashboard();
}

function displayGroups() {
    const container = document.getElementById("groupList");

    if (!container) return;

    container.innerHTML = "";

    groups.forEach((group, index) => {
        const div = document.createElement("div");
        div.className = "data-item";

        div.innerHTML = `
            <strong>${group.name}</strong>
            <span>${group.students} Students</span>
            <button type="button" onclick="deleteGroup(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteGroup(index) {
    groups.splice(index, 1);
    displayGroups();
    updateDashboard();
}

function addTeacher() {
    const name = document.getElementById("teacherName").value.trim();
    const subject = document.getElementById("teacherSubject").value.trim();
    const availability = document.getElementById("teacherAvailability").value.trim();

    if (!name || !subject || !availability) {
        alert("Please enter all teacher details.");
        return;
    }

    teachers.push({
        name: name,
        subject: subject,
        availability: availability
    });

    document.getElementById("teacherName").value = "";
    document.getElementById("teacherSubject").value = "";
    document.getElementById("teacherAvailability").value = "";

    displayTeachers();
    updateDashboard();
}

function displayTeachers() {
    const container = document.getElementById("teacherList");

    if (!container) return;

    container.innerHTML = "";

    teachers.forEach((teacher, index) => {
        const div = document.createElement("div");
        div.className = "data-item";

        div.innerHTML = `
            <strong>${teacher.name}</strong>
            <span>${teacher.subject}</span>
            <span>${teacher.availability}</span>
            <button type="button" onclick="deleteTeacher(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteTeacher(index) {
    teachers.splice(index, 1);
    displayTeachers();
    updateDashboard();
}

function addSubject() {
    const name = document.getElementById("subjectName").value.trim();
    const teacher = document.getElementById("subjectTeacher").value.trim();
    const periods = Number(document.getElementById("subjectPeriods").value);
    const group = document.getElementById("subjectGroup").value.trim();
    const roomType = document.getElementById("subjectRoomType").value.trim();

    if (!name || !teacher || !periods || !group || !roomType) {
        alert("Please enter all subject details.");
        return;
    }

    subjects.push({
        name: name,
        teacher: teacher,
        periods: periods,
        group: group,
        roomType: roomType
    });

    document.getElementById("subjectName").value = "";
    document.getElementById("subjectTeacher").value = "";
    document.getElementById("subjectPeriods").value = "";
    document.getElementById("subjectGroup").value = "";
    document.getElementById("subjectRoomType").value = "";

    displaySubjects();
    updateDashboard();
}

function displaySubjects() {
    const container = document.getElementById("subjectList");

    if (!container) return;

    container.innerHTML = "";

    subjects.forEach((subject, index) => {
        const div = document.createElement("div");
        div.className = "data-item";

        div.innerHTML = `
            <strong>${subject.name}</strong>
            <span>Teacher: ${subject.teacher}</span>
            <span>Periods: ${subject.periods}</span>
            <span>Group: ${subject.group}</span>
            <span>Room: ${subject.roomType}</span>
            <button type="button" onclick="deleteSubject(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    displaySubjects();
    updateDashboard();
}

function addRoom() {
    const name = document.getElementById("roomName").value.trim();
    const capacity = Number(document.getElementById("roomCapacity").value);
    const type = document.getElementById("roomType").value.trim();

    if (!name || !capacity || !type) {
        alert("Please enter all room details.");
        return;
    }

    rooms.push({
        name: name,
        capacity: capacity,
        type: type
    });

    document.getElementById("roomName").value = "";
    document.getElementById("roomCapacity").value = "";
    document.getElementById("roomType").value = "";

    displayRooms();
    updateDashboard();
}

function displayRooms() {
    const container = document.getElementById("roomList");

    if (!container) return;

    container.innerHTML = "";

    rooms.forEach((room, index) => {
        const div = document.createElement("div");
        div.className = "data-item";

        div.innerHTML = `
            <strong>${room.name}</strong>
            <span>Capacity: ${room.capacity}</span>
            <span>Type: ${room.type}</span>
            <button type="button" onclick="deleteRoom(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteRoom(index) {
    rooms.splice(index, 1);
    displayRooms();
    updateDashboard();
}

function validateInput() {
    if (groups.length === 0) {
        alert("Please add at least one student group.");
        return false;
    }

    if (teachers.length === 0) {
        alert("Please add at least one teacher.");
        return false;
    }

    if (subjects.length === 0) {
        alert("Please add at least one subject.");
        return false;
    }

    if (rooms.length === 0) {
        alert("Please add at least one room.");
        return false;
    }

    return true;
}

function generateTimetable() {
    if (!validateInput()) return;

    generatedTimetable = [];

    const workingDays = Number(document.getElementById("workingDays").value);
    const periodsPerDay = Number(document.getElementById("periodsPerDay").value);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ].slice(0, workingDays);

    const teacherBusy = {};
    const groupBusy = {};
    const roomBusy = {};

    days.forEach(day => {
        teacherBusy[day] = {};
        groupBusy[day] = {};
        roomBusy[day] = {};

        for (let p = 1; p <= periodsPerDay; p++) {
            teacherBusy[day][p] = [];
            groupBusy[day][p] = [];
            roomBusy[day][p] = [];
        }
    });

    let assignmentId = 1;

    subjects.forEach(subject => {
        for (let occurrence = 0; occurrence < subject.periods; occurrence++) {
            let placed = false;

            for (const day of days) {
                if (placed) break;

                for (let period = 1; period <= periodsPerDay; period++) {
                    if (placed) break;

                    const teacherConflict = teacherBusy[day][period].includes(subject.teacher);
                    const groupConflict = groupBusy[day][period].includes(subject.group);

                    if (teacherConflict || groupConflict) continue;

                    const room = chooseAvailableRoom(
                        subject,
                        day,
                        period,
                        roomBusy
                    );

                    if (!room) continue;

                    generatedTimetable.push({
                        id: assignmentId++,
                        day: day,
                        period: period,
                        subject: subject.name,
                        teacher: subject.teacher,
                        group: subject.group,
                        room: room.name,
                        roomType: room.type
                    });

                    teacherBusy[day][period].push(subject.teacher);
                    groupBusy[day][period].push(subject.group);
                    roomBusy[day][period].push(room.name);

                    placed = true;
                    break;
                }
            }
        }
    });

    displayTimetable();
    calculateOptimization();
    calculateTeacherWorkload();
    calculateRoomUtilization();

    document.getElementById("searchProcess").textContent =
        `Generated ${generatedTimetable.length} timetable assignments.`;

    showSection("results");
}

function chooseAvailableRoom(subject, day, period, roomBusy) {
    const group = groups.find(g => g.name === subject.group);

    if (!group) return null;

    return rooms.find(room => {
        const capacityValid = room.capacity >= group.students;
        const typeValid =
            room.type.toLowerCase() === subject.roomType.toLowerCase();
        const occupied = roomBusy[day][period].includes(room.name);

        return capacityValid && typeValid && !occupied;
    });
}

function displayTimetable() {
    const container = document.getElementById("timetableOutput");

    if (!container) return;

    if (generatedTimetable.length === 0) {
        container.innerHTML = `
            <div class="result-box">
                No timetable generated.
            </div>
        `;
        return;
    }

    const workingDays = Number(document.getElementById("workingDays").value);
    const periodsPerDay = Number(document.getElementById("periodsPerDay").value);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ].slice(0, workingDays);

    const periodTimes = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:15 AM - 12:15 PM",
        "12:15 PM - 1:15 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM"
    ];

    let html = `
        <div class="timetable-header">
            <div>
                <h2>Generated Timetable</h2>
                <p>Smart optimized academic schedule</p>
            </div>
            <div class="timetable-badges">
                <span>${workingDays} Working Days</span>
                <span>${periodsPerDay} Periods / Day</span>
            </div>
        </div>
    `;

    groups.forEach(group => {
        html += `
            <div class="group-timetable">
                <div class="timetable-header">
                    <div>
                        <h2>${group.name}</h2>
                        <p>Weekly Academic Schedule</p>
                    </div>
                    <div class="timetable-badges">
                        <span>${group.students || group.studentCount || 0} Students</span>
                    </div>
                </div>

                <div class="professional-timetable-wrapper">
                    <table class="professional-timetable">
                        <thead>
                            <tr>
                                <th class="time-header">TIME</th>
        `;

        days.forEach(day => {
            html += `<th>${day}</th>`;
        });

        html += `
                            </tr>
                        </thead>
                        <tbody>
        `;

        for (let period = 1; period <= periodsPerDay; period++) {

            if (period === 3) {
                html += `
                    <tr class="break-row short-break-row">
                        <td class="break-time">
                            11:00 AM - 11:15 AM
                        </td>
                        <td colspan="${days.length}">
                            <div class="break-content">
                                <span class="break-icon">☕</span>
                                <div>
                                    <strong>SHORT BREAK</strong>
                                    <small>Refreshment Break</small>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            }

            if (period === 5) {
                html += `
                    <tr class="break-row lunch-break-row">
                        <td class="break-time">
                            1:15 PM - 2:00 PM
                        </td>
                        <td colspan="${days.length}">
                            <div class="break-content">
                                <span class="break-icon">🍱</span>
                                <div>
                                    <strong>LUNCH BREAK</strong>
                                    <small>Lunch Time</small>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            }

            html += `
                <tr>
                    <td class="period-info">
                        <strong>Period ${period}</strong>
                        <span>${periodTimes[period - 1] || "Time not set"}</span>
                    </td>
            `;

            days.forEach(day => {
                const item = generatedTimetable.find(
                    a =>
                        a.group === group.name &&
                        a.day === day &&
                        Number(a.period) === period
                );

                if (item) {
                    const isLab =
                        String(item.room || "").toLowerCase().includes("lab");

                    html += `
                        <td class="timetable-cell ${isLab ? "lab-cell" : ""}">
                            <div class="subject-card ${isLab ? "lab-card" : ""}">
                                <strong>${item.subject}</strong>
                                <span class="teacher-name">
                                    👨‍🏫 ${item.teacher}
                                </span>
                                <div class="class-details">
                                    <span>🏫 ${item.room}</span>
                                </div>
                            </div>
                        </td>
                    `;
                } else {
                    html += `
                        <td class="timetable-cell free-cell">
                            <div class="subject-card free-card">
                                <strong>FREE</strong>
                                <span>No Class</span>
                            </div>
                        </td>
                    `;
                }
            });

            html += `
                </tr>
            `;
        }

        html += `
                        </tbody>
                    </table>
                </div>

                <div class="timetable-legend">
                    <span>
                        <i class="legend-dot theory-dot"></i>
                        Theory
                    </span>
                    <span>
                        <i class="legend-dot lab-dot"></i>
                        Lab
                    </span>
                    <span>
                        <i class="legend-dot free-dot"></i>
                        Free
                    </span>
                    <span>
                        <i class="legend-dot break-dot"></i>
                        Break
                    </span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
function calculateOptimization() {
    const requiredAssignments = subjects.reduce(
        (total, subject) => total + Number(subject.periods),
        0
    );

    const scheduledAssignments = generatedTimetable.length;

    const completionPercentage =
        requiredAssignments === 0
            ? 0
            : (scheduledAssignments / requiredAssignments) * 100;

    const status =
        scheduledAssignments === requiredAssignments
            ? "Successfully Generated"
            : scheduledAssignments > 0
                ? "Partially Generated"
                : "Generation Failed";

    const summary = document.getElementById("optimizationSummary");

    if (!summary) return;

    summary.innerHTML = `
        <div class="result-box">
            <h3>Optimization Engine Status</h3>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Required Assignments:</strong> ${requiredAssignments}</p>
            <p><strong>Scheduled Assignments:</strong> ${scheduledAssignments}</p>
            <p><strong>Completion:</strong> ${completionPercentage.toFixed(1)}%</p>
        </div>
    `;

    calculateScoreBreakdown();
}

function calculateScoreBreakdown() {
    const roomScore = calculateRoomScore();
    const workloadScore = calculateWorkloadScore();
    const spreadScore = calculateSpreadScore();
    const consecutiveScore = calculateConsecutiveScore();

    const totalScore =
        roomScore +
        workloadScore +
        spreadScore +
        consecutiveScore;

    const container = document.getElementById("scoreBreakdown");

    if (!container) return;

    container.innerHTML = `
        <div class="result-box">
            <h3>Optimization Score</h3>
            <p><strong>Total Score:</strong> ${totalScore.toFixed(2)}</p>
            <p>Room Score: ${roomScore.toFixed(2)}</p>
            <p>Teacher Workload Score: ${workloadScore.toFixed(2)}</p>
            <p>Spread Score: ${spreadScore.toFixed(2)}</p>
            <p>Consecutive Classes Score: ${consecutiveScore.toFixed(2)}</p>
        </div>
    `;
}

function calculateRoomScore() {
    if (generatedTimetable.length === 0) return 0;

    let valid = 0;

    generatedTimetable.forEach(item => {
        const subject = subjects.find(s => s.name === item.subject);
        const group = groups.find(g => g.name === item.group);
        const room = rooms.find(r => r.name === item.room);

        if (!subject || !group || !room) return;

        const capacityValid = room.capacity >= group.students;
        const typeValid =
            room.type.toLowerCase() === subject.roomType.toLowerCase();

        if (capacityValid && typeValid) {
            valid++;
        }
    });

    return (valid / generatedTimetable.length) * 25;
}

function calculateWorkloadScore() {
    if (teachers.length === 0) return 0;

    const workload = {};

    teachers.forEach(teacher => {
        workload[teacher.name] = 0;
    });

    generatedTimetable.forEach(item => {
        if (workload[item.teacher] !== undefined) {
            workload[item.teacher]++;
        }
    });

    const values = Object.values(workload);

    if (values.length === 0) return 0;

    const average =
        values.reduce((a, b) => a + b, 0) / values.length;

    const deviation =
        values.reduce(
            (sum, value) => sum + Math.abs(value - average),
            0
        );

    const maxDeviation =
        values.length * Math.max(average, 1);

    return Math.max(
        0,
        25 - ((deviation / maxDeviation) * 25)
    );
}

function calculateSpreadScore() {
    if (groups.length === 0) return 0;

    const dayCounts = {};

    groups.forEach(group => {
        dayCounts[group.name] = {};

        generatedTimetable.forEach(item => {
            if (item.group !== group.name) return;

            if (!dayCounts[group.name][item.day]) {
                dayCounts[group.name][item.day] = 0;
            }

            dayCounts[group.name][item.day]++;
        });
    });

    let totalDeviation = 0;
    let comparisons = 0;

    Object.values(dayCounts).forEach(days => {
        const values = Object.values(days);

        if (values.length <= 1) return;

        const average =
            values.reduce((a, b) => a + b, 0) / values.length;

        values.forEach(value => {
            totalDeviation += Math.abs(value - average);
            comparisons++;
        });
    });

    if (comparisons === 0) return 25;

    return Math.max(
        0,
        25 - ((totalDeviation / comparisons) * 5)
    );
}

function calculateConsecutiveScore() {
    if (generatedTimetable.length === 0) return 0;

    let consecutivePairs = 0;
    let possiblePairs = 0;

    const workingDays =
        Number(document.getElementById("workingDays").value);

    const periodsPerDay =
        Number(document.getElementById("periodsPerDay").value);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ].slice(0, workingDays);

    groups.forEach(group => {
        days.forEach(day => {
            for (let period = 1; period < periodsPerDay; period++) {
                const current = generatedTimetable.find(
                    item =>
                        item.group === group.name &&
                        item.day === day &&
                        item.period === period
                );

                const next = generatedTimetable.find(
                    item =>
                        item.group === group.name &&
                        item.day === day &&
                        item.period === period + 1
                );

                if (current && next) {
                    consecutivePairs++;
                }

                possiblePairs++;
            }
        });
    });

    if (possiblePairs === 0) return 0;

    return (consecutivePairs / possiblePairs) * 25;
}

function calculateTeacherWorkload() {
    const container = document.getElementById("teacherWorkload");

    if (!container) return;

    const workload = {};

    teachers.forEach(teacher => {
        workload[teacher.name] = 0;
    });

    generatedTimetable.forEach(item => {
        if (workload[item.teacher] !== undefined) {
            workload[item.teacher]++;
        }
    });

    let html = "";

    Object.keys(workload).forEach(teacher => {
        html += `
            <div class="result-box">
                <strong>${teacher}</strong>
                <span>${workload[teacher]} classes</span>
            </div>
        `;
    });

    container.innerHTML =
        html ||
        `<div class="result-box">No workload data available.</div>`;
}

function calculateRoomUtilization() {
    const container = document.getElementById("roomUtilization");

    if (!container) return;

    const utilization = {};

    rooms.forEach(room => {
        utilization[room.name] = 0;
    });

    generatedTimetable.forEach(item => {
        if (utilization[item.room] !== undefined) {
            utilization[item.room]++;
        }
    });

    let html = "";

    Object.keys(utilization).forEach(room => {
        html += `
            <div class="result-box">
                <strong>${room}</strong>
                <span>${utilization[room]} periods used</span>
            </div>
        `;
    });

    container.innerHTML =
        html ||
        `<div class="result-box">No room utilization data available.</div>`;
}

function exportCSV() {
    if (generatedTimetable.length === 0) {
        alert("Generate a timetable first.");
        return;
    }

    let csv = "Day,Period,Subject,Teacher,Group,Room\n";

    generatedTimetable.forEach(item => {
        csv +=
            `"${item.day}","${item.period}","${item.subject}","${item.teacher}","${item.group}","${item.room}"\n`;
    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "smart_timetable.csv";
    link.click();

    URL.revokeObjectURL(url);
}

function printTimetable() {
    const content = document.getElementById("timetableOutput");

    if (!content) return;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <html>
        <head>
            <title>Smart Timetable</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 25px;
                }

                h1, h2, h3 {
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }

                th, td {
                    border: 1px solid #333;
                    padding: 8px;
                    text-align: center;
                }

                th {
                    background: #344b77;
                    color: white;
                }

                .free-cell {
                    color: #999;
                }
            </style>
        </head>
        <body>
            <h1>Smart Timetable Optimizer</h1>
            ${content.innerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

let calendarCurrentDate = new Date();
let selectedCalendarDate = null;

const calendarMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const academicHolidays = {
    "2026-09-03": {
        name: "Ganesh Chaturthi",
        type: "Public Holiday"
    },
    "2026-10-02": {
        name: "Gandhi Jayanti",
        type: "Public Holiday"
    },
    "2026-10-20": {
        name: "College Holiday",
        type: "Institutional Holiday"
    },
    "2026-12-25": {
        name: "Christmas",
        type: "Public Holiday"
    }
};

function formatCalendarDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCalendarDayName(date) {
    return date.toLocaleDateString(
        "en-US",
        { weekday: "long" }
    );
}

function getWorkingDaysCount() {
    const element =
        document.getElementById("workingDays");

    const value =
        element ? Number(element.value) : 5;

    return Math.max(
        1,
        Math.min(7, value || 5)
    );
}

function isConfiguredWorkingDay(date) {
    const dayIndex = date.getDay();
    const workingDays = getWorkingDaysCount();

    if (workingDays >= 7) return true;
    if (dayIndex === 0) return false;

    return dayIndex <= workingDays;
}

function getCalendarStatus(date) {
    const dateString = formatCalendarDate(date);
    const holiday = academicHolidays[dateString];

    if (holiday) {
        return {
            type: "holiday",
            name: holiday.name,
            holidayType: holiday.type
        };
    }

    if (!isConfiguredWorkingDay(date)) {
        return {
            type: "holiday",
            name:
                date.getDay() === 0
                    ? "Sunday"
                    : "Non-Working Day",
            holidayType: "Weekly Holiday"
        };
    }

    return {
        type: "working",
        name: "Working Day",
        holidayType: ""
    };
}

function generateAcademicCalendar() {
    const grid =
        document.getElementById("calendarGrid");

    const title =
        document.getElementById("calendarMonthTitle");

    if (!grid || !title) return;

    const year =
        calendarCurrentDate.getFullYear();

    const month =
        calendarCurrentDate.getMonth();

    title.textContent =
        `${calendarMonthNames[month]} ${year}`;

    const yearInput =
        document.getElementById("calendarYear");

    if (yearInput) {
        yearInput.value = year;
    }

    grid.innerHTML = "";

    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    weekdays.forEach(day => {
        const header =
            document.createElement("div");

        header.className =
            "calendar-weekday";

        header.textContent = day;

        grid.appendChild(header);
    });

    const firstDay =
        new Date(year, month, 1).getDay();

    const totalDays =
        new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell =
            document.createElement("div");

        emptyCell.className =
            "calendar-empty";

        grid.appendChild(emptyCell);
    }

    const todayString =
        formatCalendarDate(new Date());

    for (let day = 1; day <= totalDays; day++) {
        const date =
            new Date(year, month, day);

        const dateString =
            formatCalendarDate(date);

        const status =
            getCalendarStatus(date);

        const cell =
            document.createElement("button");

        cell.type = "button";

        cell.className =
            `calendar-date-cell ${status.type}-date`;

        if (dateString === todayString) {
            cell.classList.add("today-date");
        }

        if (selectedCalendarDate === dateString) {
            cell.classList.add("selected-date");
        }

        cell.innerHTML = `
            <span class="calendar-date-number">
                ${day}
            </span>
            <span class="calendar-day-short">
                ${getCalendarDayName(date).substring(0, 3)}
            </span>
            <span class="calendar-status-label">
                ${status.name}
            </span>
        `;

        cell.onclick = function () {
            selectCalendarDate(date);
        };

        grid.appendChild(cell);
    }
}

function previousCalendarMonth() {
    calendarCurrentDate.setMonth(
        calendarCurrentDate.getMonth() - 1
    );

    selectedCalendarDate = null;

    generateAcademicCalendar();
    showDefaultCalendarMessage();
}

function nextCalendarMonth() {
    calendarCurrentDate.setMonth(
        calendarCurrentDate.getMonth() + 1
    );

    selectedCalendarDate = null;

    generateAcademicCalendar();
    showDefaultCalendarMessage();
}

function changeCalendarYear() {
    const input =
        document.getElementById("calendarYear");

    if (!input) return;

    const year = Number(input.value);

    if (!year || year < 2020 || year > 2100) {
        alert(
            "Please enter a valid year between 2020 and 2100."
        );

        input.value =
            calendarCurrentDate.getFullYear();

        return;
    }

    calendarCurrentDate.setFullYear(year);
    selectedCalendarDate = null;

    generateAcademicCalendar();
    showDefaultCalendarMessage();
}

function showDefaultCalendarMessage() {
    const panel =
        document.getElementById("selectedDatePanel");

    if (!panel) return;

    panel.innerHTML = `
        <div class="result-box">
            <h3>Select a date</h3>
            <p>
                Click a date in the calendar
                to view its status and timetable.
            </p>
        </div>
    `;
}

function selectCalendarDate(date) {
    selectedCalendarDate =
        formatCalendarDate(date);

    generateAcademicCalendar();
    displayDateWiseTimetable(date);
}

function displayDateWiseTimetable(date) {
    const panel =
        document.getElementById("selectedDatePanel");

    if (!panel) return;

    const dateString =
        formatCalendarDate(date);

    const dayName =
        getCalendarDayName(date);

    const status =
        getCalendarStatus(date);

    if (status.type === "holiday") {
        panel.innerHTML = `
            <div class="calendar-date-header holiday-selected">
                <div>
                    <h3>${dateString}</h3>
                    <p>${dayName}</p>
                </div>
                <span class="calendar-status-badge holiday-badge">
                    HOLIDAY
                </span>
            </div>

            <div class="holiday-information">
                <h3>${status.name}</h3>
                <p>${status.holidayType}</p>
                <p>No classes are scheduled for this date.</p>
            </div>
        `;

        return;
    }

    const dayItems =
        generatedTimetable
            .filter(item => item.day === dayName)
            .sort((a, b) => a.period - b.period);

    const periodsElement =
        document.getElementById("periodsPerDay");

    const periodsPerDay =
        periodsElement
            ? Number(periodsElement.value)
            : 6;

    let timetableRows = "";

    for (
        let period = 1;
        period <= periodsPerDay;
        period++
    ) {
        const item =
            dayItems.find(
                timetableItem =>
                    timetableItem.period === period
            );

        const time =
            getCalendarPeriodTime(period);

        if (item) {
            timetableRows += `
                <tr>
                    <td>
                        <strong>Period ${period}</strong>
                        <br>
                        <span class="calendar-time">
                            ${time}
                        </span>
                    </td>
                    <td>${item.subject}</td>
                    <td>${item.teacher}</td>
                    <td>${item.group}</td>
                    <td>${item.room}</td>
                </tr>
            `;
        } else {
            timetableRows += `
                <tr class="calendar-free-row">
                    <td>
                        <strong>Period ${period}</strong>
                        <br>
                        <span class="calendar-time">
                            ${time}
                        </span>
                    </td>
                    <td colspan="4">FREE</td>
                </tr>
            `;
        }
    }

    if (generatedTimetable.length === 0) {
        panel.innerHTML = `
            <div class="calendar-date-header">
                <div>
                    <h3>${dateString}</h3>
                    <p>${dayName}</p>
                </div>
                <span class="calendar-status-badge working-badge">
                    WORKING DAY
                </span>
            </div>

            <div class="result-box">
                <h3>No timetable generated yet</h3>
                <p>
                    Generate the timetable first.
                    The ${dayName} timetable will
                    then appear here automatically.
                </p>
            </div>
        `;

        return;
    }

    panel.innerHTML = `
        <div class="calendar-date-header">
            <div>
                <h3>${dateString}</h3>
                <p>${dayName}</p>
            </div>
            <span class="calendar-status-badge working-badge">
                WORKING DAY
            </span>
        </div>

        <div class="calendar-timetable-wrapper">
            <table class="calendar-timetable">
                <thead>
                    <tr>
                        <th>Period / Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                        <th>Group</th>
                        <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    ${timetableRows}
                </tbody>
            </table>
        </div>
    `;
}

function getCalendarPeriodTime(period) {
    const times = {
        1: "9:00 – 10:00",
        2: "10:00 – 11:00",
        3: "11:15 – 12:15",
        4: "12:15 – 1:15",
        5: "2:00 – 3:00",
        6: "3:00 – 4:00"
    };

    return times[period] || `Period ${period}`;
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        updateDashboard();

        const yearInput =
            document.getElementById("calendarYear");

        if (yearInput) {
            yearInput.value =
                calendarCurrentDate.getFullYear();

            yearInput.addEventListener(
                "change",
                changeCalendarYear
            );
        }

        generateAcademicCalendar();
        showDefaultCalendarMessage();
    }
);
