import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.io.FileWriter;
import java.io.PrintWriter;

public class InputFileGenerator {

    public static void generateInputFile() {

        String fileName = "../backend/input.txt";

        try (
            Connection con = DBConnection.getConnection();
            PrintWriter out = new PrintWriter(
                    new FileWriter(fileName)
            )
        ) {

            // ==========================================
            // GROUPS
            // ==========================================

            out.println("GROUPS");

            String groupSQL =
                    "SELECT name, students FROM student_groups";

            PreparedStatement groupPS =
                    con.prepareStatement(groupSQL);

            ResultSet groupRS =
                    groupPS.executeQuery();

            while (groupRS.next()) {

                String name = groupRS.getString("name");
                int students = groupRS.getInt("students");

                out.println(
                        name + "," + students
                );
            }

            groupRS.close();
            groupPS.close();


            // ==========================================
            // TEACHERS
            // ==========================================

            out.println();
            out.println("TEACHERS");

            String teacherSQL =
                    "SELECT name, subject, availability FROM teachers";

            PreparedStatement teacherPS =
                    con.prepareStatement(teacherSQL);

            ResultSet teacherRS =
                    teacherPS.executeQuery();

            while (teacherRS.next()) {

                String name =
                        teacherRS.getString("name");

                String subject =
                        teacherRS.getString("subject");

                String availability =
                        teacherRS.getString("availability");

                out.println(
                        name + "," +
                        subject + "," +
                        availability
                );
            }

            teacherRS.close();
            teacherPS.close();


            // ==========================================
            // SUBJECTS
            // ==========================================

            out.println();
            out.println("SUBJECTS");

            String subjectSQL =
                    "SELECT name, teacher, periods_per_week, " +
                    "group_name, room_type FROM subjects";

            PreparedStatement subjectPS =
                    con.prepareStatement(subjectSQL);

            ResultSet subjectRS =
                    subjectPS.executeQuery();

            while (subjectRS.next()) {

                String name =
                        subjectRS.getString("name");

                String teacher =
                        subjectRS.getString("teacher");

                int periods =
                        subjectRS.getInt("periods_per_week");

                String group =
                        subjectRS.getString("group_name");

                String roomType =
                        subjectRS.getString("room_type");

                out.println(
                        name + "," +
                        teacher + "," +
                        periods + "," +
                        group + "," +
                        roomType
                );
            }

            subjectRS.close();
            subjectPS.close();


            // ==========================================
            // ROOMS
            // ==========================================

            out.println();
            out.println("ROOMS");

            String roomSQL =
                    "SELECT name, capacity, room_type FROM rooms";

            PreparedStatement roomPS =
                    con.prepareStatement(roomSQL);

            ResultSet roomRS =
                    roomPS.executeQuery();

            while (roomRS.next()) {

                String name =
                        roomRS.getString("name");

                int capacity =
                        roomRS.getInt("capacity");

                String type =
                        roomRS.getString("room_type");

                out.println(
                        name + "," +
                        capacity + "," +
                        type
                );
            }

            roomRS.close();
            roomPS.close();


            // ==========================================
            // SETTINGS
            // ==========================================

            out.println();
            out.println("SETTINGS");

            out.println("5,6");

            System.out.println(
                    "input.txt generated successfully!"
            );

        } catch (Exception e) {

            System.out.println(
                    "Error generating input.txt"
            );

            e.printStackTrace();
        }
    }


    public static void main(String[] args) {

        generateInputFile();
    }
}