import java.sql.Connection;
import java.sql.PreparedStatement;

public class TeacherDAO {

    public static void addTeacher(
            String name,
            String subject,
            String availability) {

        String sql =
                "INSERT INTO teachers(name, subject, availability) " +
                "VALUES (?, ?, ?)";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setString(2, subject);
            ps.setString(3, availability);

            int rows = ps.executeUpdate();

            if (rows > 0) {
                System.out.println(
                        "Teacher added: " + name
                );
            }

            ps.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}