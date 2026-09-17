public class TestConnection {

    public static void main(String[] args) {

        // =========================
        // GROUPS
        // =========================

        GroupDAO.addGroup("ISE-A", 60);
        GroupDAO.addGroup("ISE-B", 55);
        GroupDAO.addGroup("CSE-A", 60);


        // =========================
        // TEACHERS
        // =========================

        TeacherDAO.addTeacher(
                "RAVI",
                "MATHEMATICS",
                "Mon,Tue,Wed"
        );

        TeacherDAO.addTeacher(
                "PRIYA",
                "DBMS",
                "Mon,Wed,Thu"
        );

        TeacherDAO.addTeacher(
                "ANIL",
                "JAVA",
                "Tue,Thu,Fri"
        );


        // =========================
        // SUBJECTS
        // =========================

        SubjectDAO.addSubject(
                "MATHEMATICS",
                "RAVI",
                4,
                "ISE-A",
                "CLASSROOM"
        );

        SubjectDAO.addSubject(
                "DBMS",
                "PRIYA",
                4,
                "ISE-A",
                "LAB"
        );

        SubjectDAO.addSubject(
                "JAVA",
                "ANIL",
                3,
                "ISE-A",
                "LAB"
        );


        // =========================
        // ROOMS
        // =========================

        RoomDAO.addRoom(
                "ROOM101",
                "CLASSROOM",
                60
        );

        RoomDAO.addRoom(
                "LAB1",
                "LAB",
                60
        );

        RoomDAO.addRoom(
                "LAB2",
                "LAB",
                55
        );


        System.out.println();
        System.out.println(
                "All timetable data inserted successfully!"
        );
    }
}